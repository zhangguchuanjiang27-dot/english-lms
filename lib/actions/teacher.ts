'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getTeacherDashboardData(teacherId: string) {
    try {
        const teacher = await prisma.teacher.findUnique({
            where: { id: teacherId },
        });

        if (!teacher) return null;

        const todayStr = new Intl.DateTimeFormat('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Asia/Tokyo'
        }).format(new Date()).replace(/\//g, '-');

        const todaySchedule = await prisma.lessonSchedule.findMany({
            where: {
                teacherName: teacher.name, // Prisma handles filtering by teacherName. Alternatively, we should link student/teacher IDs. For now matching original Logic.
                date: todayStr
            },
            include: {
                student: true
            },
            orderBy: {
                time: 'asc'
            }
        });

        // Also get Students related to those schedules to match original `type` logic.
        // However, data-store might not link properly in db yet without changing schema.
        // It's fine to return student names directly as strings inside LessonSchedule.

        return {
            teacher,
            todaySchedule
        };
    } catch (error) {
        console.error('Error fetching teacher dashboard data:', error);
        return null;
    }
}

export async function getTeacherStudentsData(teacherId: string) {
    try {
        const teacher = await prisma.teacher.findUnique({
            where: { id: teacherId },
        });

        if (!teacher) return null;

        const mySchedules = await prisma.lessonSchedule.findMany({
            where: {
                teacherName: teacher.name,
            },
            include: {
                student: true
            },
            orderBy: [
                { date: 'asc' },
                { time: 'asc' }
            ]
        });

        // We could join with students here but currently matching logic
        return {
            teacher,
            mySchedules
        };
    } catch (error) {
        console.error('Error fetching teacher students data:', error);
        return null;
    }
}

export async function updateLessonMeetingUrl(lessonId: string, meetingUrl: string) {
    try {
        await prisma.lessonSchedule.update({
            where: { id: lessonId },
            data: { meetingUrl }
        });
        revalidatePath('/teacher');
        revalidatePath('/teacher/students');
        return { success: true };
    } catch (error) {
        console.error('Error updating meeting URL:', error);
        return { success: false, error: 'URLの更新に失敗しました' };
    }
}
export async function submitLessonKarte(data: {
    lessonId: string;
    studentId: string;
    date: string;
    teacherName: string;
    title: string;
    feedback: string;
    nextScope?: string;
    homework: string;
    internalNote: string;
    grammar?: number;
    vocab?: number;
    pronunciation?: number;
    fluency?: number;
}) {
    try {
        // 1. Find if a record already exists
        let existingRecord = await prisma.lessonRecord.findUnique({
            where: { lessonId: data.lessonId }
        });

        const recordValues = {
            lessonId: data.lessonId,
            studentId: data.studentId,
            date: data.date,
            teacher: data.teacherName,
            title: data.title,
            feedback: data.feedback,
            nextScope: data.nextScope || null,
            homework: data.homework,
            internalNote: data.internalNote,
            grammar: data.grammar ?? 50,
            vocab: data.vocab ?? 50,
            pronunciation: data.pronunciation ?? 50,
            fluency: data.fluency ?? 50,
        };

        if (existingRecord) {
            await prisma.lessonRecord.update({
                where: { id: existingRecord.id },
                data: recordValues
            });
        } else {
            await prisma.lessonRecord.create({
                data: recordValues
            });

            // If it's a new record, update student stats
            await prisma.student.update({
                where: { id: data.studentId },
                data: {
                    totalLessons: { increment: 1 },
                    lastLesson: data.date
                }
            });
        }

        // 3. CLEANUP: Delete legacy orphans
        await prisma.lessonRecord.deleteMany({
            where: {
                studentId: data.studentId,
                date: data.date,
                lessonId: null
            }
        });

        // 4. Mark the lesson as completed
        await prisma.lessonSchedule.update({
            where: { id: data.lessonId },
            data: { status: 'Completed' }
        });

        revalidatePath('/teacher');
        revalidatePath('/teacher/students');
        revalidatePath('/(student)/dashboard', 'page');
        revalidatePath('/(student)/schedule', 'page');
        revalidatePath('/(student)/karte', 'page');

        return { success: true };
    } catch (error) {
        console.error('Error submitting lesson karte:', error);
        return { success: false, error: 'カルテの送信に失敗しました' };
    }
}
export async function getRecordByLessonId(lessonId: string) {
    try {
        // Try exact match by lessonId
        let record = await prisma.lessonRecord.findUnique({
            where: { lessonId }
        });

        // If not found, try fallback via lesson data (needed for legacy data migration in UI)
        if (!record) {
            const lesson = await prisma.lessonSchedule.findUnique({
                where: { id: lessonId }
            });

            if (lesson) {
                record = await prisma.lessonRecord.findFirst({
                    where: {
                        studentId: lesson.studentId,
                        date: lesson.date,
                        lessonId: null
                    }
                });
            }
        }

        return record;
    } catch (error) {
        console.error('Error fetching record by lessonId:', error);
        return null;
    }
}

export async function getRecentRecordsByStudent(studentId: string) {
    try {
        const records = await prisma.lessonRecord.findMany({
            where: { studentId },
            orderBy: { date: 'desc' },
            take: 1
        });
        return records[0] || null;
    } catch (error) {
        console.error('Error fetching student records:', error);
        return null;
    }
}

export async function revokeLessonKarte(lessonId: string) {
    try {
        // 1. Delete the record associated with this lesson
        await prisma.lessonRecord.deleteMany({
            where: { lessonId: lessonId }
        });

        // 2. Reset the lesson status to 'Scheduled'
        await prisma.lessonSchedule.update({
            where: { id: lessonId },
            data: { status: 'Scheduled' }
        });

        revalidatePath('/teacher');
        revalidatePath('/teacher/students');
        revalidatePath('/(student)/dashboard', 'page');
        revalidatePath('/(student)/schedule', 'page');
        revalidatePath('/(student)/karte', 'page');

        return { success: true };
    } catch (error) {
        console.error('Error revoking lesson karte:', error);
        return { success: false, error: 'カルテの取り消しに失敗しました' };
    }
}

export async function searchAllStudents(query: string = '') {
    try {
        const whereClause = query.trim() ? {
            OR: [
                { name: { contains: query, mode: 'insensitive' as const } },
                { email: { contains: query, mode: 'insensitive' as const } },
                { course: { contains: query, mode: 'insensitive' as const } }
            ]
        } : {};
        
        const students = await prisma.student.findMany({
            where: whereClause,
            take: 50,
            orderBy: {
                name: 'asc'
            }
        });
        return students;
    } catch (error) {
        console.error('Error searching students:', error);
        return [];
    }
}

export async function getAllStudentRecords(studentId: string) {
    try {
        const records = await prisma.lessonRecord.findMany({
            where: { studentId },
            orderBy: { date: 'desc' }
        });
        return records;
    } catch (error) {
        console.error('Error fetching student records:', error);
        return [];
    }
}

