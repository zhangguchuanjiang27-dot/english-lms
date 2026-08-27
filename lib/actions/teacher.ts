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
        const errorMessage = error instanceof Error ? error.message : '';
        const isConnError = errorMessage.includes('Can\'t reach database server') || 
                            errorMessage.includes('PrismaClientInitializationError') ||
                            errorMessage.includes('database server is running');
        
        if (isConnError) {
            console.warn('Database offline, using Mock Dashboard Fallback.');
            const mockTeacher = {
                id: 'sarah',
                name: 'Sarah Wilson',
                email: 'sarah@voca-academy.jp',
                status: 'Active',
                role: 'Teacher',
                joinDate: '2024-02-01'
            };
            
            const todayStr = new Intl.DateTimeFormat('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                timeZone: 'Asia/Tokyo'
            }).format(new Date()).replace(/\//g, '-');

            const mockTodaySchedules = [
                {
                    id: 'mock-dashboard-1',
                    studentId: 'karat',
                    studentName: 'Karat Student',
                    teacherName: 'Sarah Wilson',
                    date: todayStr,
                    time: '10:00 - 10:50',
                    duration: '50分',
                    course: '英語',
                    type: 'General',
                    status: 'Scheduled',
                    tags: '英語',
                    meetingUrl: 'https://meet.google.com/abc-defg-hij',
                    student: { id: 'karat', name: 'Karat Student', target: 'TOEIC 800点' }
                },
                {
                    id: 'mock-dashboard-2',
                    studentId: 'yukukumo',
                    studentName: '游雲 (yukukumo)',
                    teacherName: 'Sarah Wilson',
                    date: todayStr,
                    time: '14:00 - 14:50',
                    duration: '50分',
                    course: '中一英語',
                    type: 'Casual',
                    status: 'Completed',
                    tags: '中一英語',
                    meetingUrl: 'https://meet.google.com/abc-defg-hij',
                    student: { id: 'yukukumo', name: '游雲 (yukukumo)', target: '基礎英会話の習得' }
                }
            ];

            return {
                teacher: mockTeacher as any,
                todaySchedule: mockTodaySchedules as any
            };
        }
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
    todayTestName?: string;
    todayTestScore?: number;
    todayTestTotal?: number;
    nextTest?: string;
    nextScope?: string;
    importantExpressions?: string;
    homework: string;
    internalNote: string;
    grammar?: number;
    vocab?: number;
    pronunciation?: number;
    fluency?: number;
    isDraft?: boolean;
}) {
    try {
        const hasScore = data.todayTestScore !== undefined;
        const hasTotal = data.todayTestTotal !== undefined;
        if (!data.isDraft && hasScore !== hasTotal) {
            return { success: false, error: '本日のテストは得点と満点を両方入力してください' };
        }
        if (!data.isDraft && hasScore && hasTotal && (
            data.todayTestScore! < 0 ||
            data.todayTestTotal! <= 0 ||
            data.todayTestScore! > data.todayTestTotal!
        )) {
            return { success: false, error: '本日のテストの得点は0以上、満点以下で入力してください' };
        }

        // 1. Find if a record already exists
        const existingRecord = await prisma.lessonRecord.findUnique({
            where: { lessonId: data.lessonId }
        });
        const isDraft = data.isDraft ?? false;

        if (isDraft && existingRecord && !existingRecord.isDraft) {
            return { success: false, error: '公開済みのカルテは一時保存に戻せません' };
        }

        const recordValues = {
            lessonId: data.lessonId,
            studentId: data.studentId,
            date: data.date,
            teacher: data.teacherName,
            title: data.title,
            feedback: data.feedback,
            todayTest: null,
            todayTestName: data.todayTestName?.trim() || null,
            todayTestScore: data.todayTestScore ?? null,
            todayTestTotal: data.todayTestTotal ?? null,
            nextTest: data.nextTest?.trim() || null,
            nextScope: data.nextScope || null,
            importantExpressions: data.importantExpressions || null,
            homework: data.homework,
            internalNote: data.internalNote,
            grammar: data.grammar ?? 50,
            vocab: data.vocab ?? 50,
            pronunciation: data.pronunciation ?? 50,
            fluency: data.fluency ?? 50,
            isDraft,
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
        }

        // Count the lesson only when a new draft is published or a record is published directly.
        if (!isDraft && (!existingRecord || existingRecord.isDraft)) {
            await prisma.student.update({
                where: { id: data.studentId },
                data: {
                    totalLessons: { increment: 1 },
                    lastLesson: data.date
                }
            });
        }

        if (!isDraft) {
            await prisma.lessonRecord.deleteMany({
                where: {
                    studentId: data.studentId,
                    date: data.date,
                    lessonId: null
                }
            });

            await prisma.lessonSchedule.update({
                where: { id: data.lessonId },
                data: { status: 'Completed' }
            });
        }

        revalidatePath('/teacher');
        revalidatePath('/teacher/students');
        revalidatePath('/(student)/dashboard', 'page');
        revalidatePath('/(student)/schedule', 'page');
        revalidatePath('/(student)/karte', 'page');

        return { success: true, isDraft };
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

export async function getRecentRecordsByStudent(studentId: string, course?: string) {
    try {
        let whereClause: any = { studentId };

        if (course) {
            const schedules = await prisma.lessonSchedule.findMany({
                where: { studentId, course },
                select: { id: true }
            });
            const scheduleIds = schedules.map(s => s.id);

            whereClause = {
                studentId,
                OR: [
                    { lessonId: { in: scheduleIds } },
                    { title: { contains: course } }
                ]
            };
        }

        const records = await prisma.lessonRecord.findMany({
            where: whereClause,
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

export async function markLessonAbsent(data: {
    lessonId: string;
    reason?: string;
}) {
    try {
        const lesson = await prisma.lessonSchedule.findUnique({
            where: { id: data.lessonId },
            include: { student: true }
        });

        if (!lesson) {
            return { success: false, error: '授業が見つかりませんでした' };
        }

        if (lesson.status === 'Completed') {
            return { success: false, error: '完了済みの授業は欠席にできません' };
        }

        const reason = data.reason?.trim();
        const existingRecord = await prisma.lessonRecord.findUnique({
            where: { lessonId: lesson.id }
        });

        const recordValues = {
            lessonId: lesson.id,
            studentId: lesson.studentId,
            date: lesson.date,
            teacher: lesson.teacherName,
            title: `${lesson.course} 欠席`,
            feedback: reason || '欠席として記録しました。',
            todayTest: null,
            todayTestName: null,
            todayTestScore: null,
            todayTestTotal: null,
            nextTest: null,
            nextScope: null,
            importantExpressions: null,
            homework: '',
            internalNote: reason ? `欠席理由: ${reason}` : '欠席',
            grammar: 50,
            vocab: 50,
            pronunciation: 50,
            fluency: 50,
            isDraft: false
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
        }

        await prisma.lessonSchedule.update({
            where: { id: lesson.id },
            data: { status: 'Absent' }
        });

        revalidatePath('/teacher');
        revalidatePath('/teacher/students');
        revalidatePath('/teacher/shifts');
        revalidatePath('/(student)/schedule', 'page');
        revalidatePath('/(student)/dashboard', 'page');

        return { success: true };
    } catch (error) {
        console.error('Error marking lesson absent:', error);
        return { success: false, error: '欠席・振替の登録に失敗しました' };
    }
}

export async function unmarkLessonAbsent(lessonId: string) {
    try {
        const lesson = await prisma.lessonSchedule.findUnique({
            where: { id: lessonId }
        });

        if (!lesson) {
            return { success: false, error: '授業が見つかりませんでした' };
        }

        if (lesson.status !== 'Absent') {
            return { success: false, error: '欠席登録されている授業だけ解除できます' };
        }

        await prisma.lessonRecord.deleteMany({
            where: { lessonId }
        });

        await prisma.lessonSchedule.update({
            where: { id: lessonId },
            data: { status: 'Scheduled' }
        });

        revalidatePath('/teacher');
        revalidatePath('/teacher/students');
        revalidatePath('/teacher/shifts');
        revalidatePath('/(student)/schedule', 'page');
        revalidatePath('/(student)/dashboard', 'page');
        revalidatePath('/(student)/karte', 'page');

        return { success: true };
    } catch (error) {
        console.error('Error unmarking lesson absent:', error);
        return { success: false, error: '欠席登録の解除に失敗しました' };
    }
}

export async function scheduleMakeupLesson(data: {
    absentLessonId: string;
    makeupDate: string;
    makeupTime: string;
}) {
    try {
        const absentLesson = await prisma.lessonSchedule.findUnique({
            where: { id: data.absentLessonId },
            include: { student: true }
        });

        if (!absentLesson) {
            return { success: false, error: '欠席コマが見つかりませんでした' };
        }

        if (absentLesson.status !== 'Absent') {
            return { success: false, error: '欠席コマだけ振替設定できます' };
        }

        const existingRecord = await prisma.lessonRecord.findUnique({
            where: { lessonId: absentLesson.id }
        });

        if (existingRecord?.internalNote?.includes('[振替済み:')) {
            return { success: false, error: 'この欠席コマはすでに振替設定済みです' };
        }

        const makeupLesson = await prisma.lessonSchedule.create({
            data: {
                studentId: absentLesson.studentId,
                studentName: absentLesson.studentName,
                teacherName: absentLesson.teacherName,
                date: data.makeupDate,
                time: data.makeupTime,
                duration: absentLesson.duration,
                course: absentLesson.course,
                type: absentLesson.type,
                status: 'Scheduled',
                tags: absentLesson.tags,
                meetingUrl: absentLesson.meetingUrl
            }
        });

        const marker = `[振替済み: ${data.makeupDate} ${data.makeupTime} / ${makeupLesson.id}]`;
        if (existingRecord) {
            await prisma.lessonRecord.update({
                where: { id: existingRecord.id },
                data: {
                    internalNote: [existingRecord.internalNote, marker].filter(Boolean).join('\n')
                }
            });
        }

        await prisma.lessonSchedule.update({
            where: { id: absentLesson.id },
            data: { status: 'Cancelled' }
        });

        revalidatePath('/teacher');
        revalidatePath('/teacher/students');
        revalidatePath('/teacher/shifts');
        revalidatePath('/(student)/schedule', 'page');
        revalidatePath('/(student)/dashboard', 'page');

        return { success: true, makeupLesson };
    } catch (error) {
        console.error('Error scheduling makeup lesson:', error);
        return { success: false, error: '振替日の設定に失敗しました' };
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

export async function getStudentTrainingStats(studentId: string) {
    try {
        const student = await prisma.student.findUnique({
            where: { id: studentId },
            select: {
                questXP: true,
                questLevel: true,
                questStreak: true,
            }
        });

        const grammar = await prisma.grammarProgress.findMany({
            where: { studentId }
        });

        const vocab = await prisma.vocabProgress.findMany({
            where: { studentId }
        });

        const drills = await prisma.drillProgress.findMany({
            where: { studentId }
        });

        return {
            student,
            grammar,
            vocab,
            drills
        };
    } catch (error) {
        console.error('Error fetching student training stats:', error);
        return {
            student: { questXP: 0, questLevel: 1, questStreak: 0 },
            grammar: [],
            vocab: [],
            drills: []
        };
    }
}

export async function getTeacherShiftsData(teacherId: string) {
    try {
        const teacher = await prisma.teacher.findUnique({
            where: { id: teacherId },
        });

        if (!teacher) return null;

        const schedules = await prisma.lessonSchedule.findMany({
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

        return {
            teacher,
            schedules
        };
    } catch (error) {
        console.error('Error fetching teacher shifts data:', error);
        const errorMessage = error instanceof Error ? error.message : '';
        const isConnError = errorMessage.includes('Can\'t reach database server') || 
                            errorMessage.includes('PrismaClientInitializationError') ||
                            errorMessage.includes('database server is running');
                            
        if (isConnError) {
            console.warn('Database offline, using Mock Shifts Fallback.');
            const mockTeacher = {
                id: 'sarah',
                name: 'Sarah Wilson',
                email: 'sarah@voca-academy.jp',
                status: 'Active',
                role: 'Teacher',
                joinDate: '2024-02-01'
            };
            
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth();
            
            const schedules = [];
            const student1 = { id: 'karat', name: 'Karat Student', target: 'TOEIC 800点' };
            const student2 = { id: 'yukukumo', name: '游雲 (yukukumo)', target: '基礎英会話の習得' };
            
            for (let day = 1; day <= 28; day += 3) {
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                schedules.push({
                    id: `mock-shift-${day}-1`,
                    studentId: 'karat',
                    studentName: 'Karat Student',
                    teacherName: 'Sarah Wilson',
                    date: dateStr,
                    time: '10:00 - 10:50',
                    duration: '50分',
                    course: '英語',
                    type: 'General',
                    status: day < today.getDate() ? 'Completed' : 'Scheduled',
                    meetingUrl: 'https://meet.google.com/abc-defg-hij',
                    student: student1
                });
                
                schedules.push({
                    id: `mock-shift-${day}-2`,
                    studentId: 'yukukumo',
                    studentName: '游雲 (yukukumo)',
                    teacherName: 'Sarah Wilson',
                    date: dateStr,
                    time: '13:00 - 13:50',
                    duration: '50分',
                    course: '中一英語',
                    type: 'Casual',
                    status: day < today.getDate() ? 'Completed' : 'Cancelled',
                    meetingUrl: 'https://meet.google.com/abc-defg-hij',
                    student: student2
                });
            }
            
            return {
                teacher: mockTeacher as any,
                schedules: schedules as any
            };
        }
        return null;
    }
}

