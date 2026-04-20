'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// --- Dashboard & General ---

export async function getAdminDashboardData() {
    try {
        const studentCount = await prisma.student.count();
        const activeStudentCount = await prisma.student.count({
            where: { status: 'Active' }
        });
        const teacherCount = await prisma.teacher.count();

        const todayStr = new Intl.DateTimeFormat('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Asia/Tokyo'
        }).format(new Date()).replace(/\//g, '-');

        const todayLessons = await prisma.lessonSchedule.findMany({
            where: {
                date: todayStr
            },
            include: {
                student: true
            }
        });

        const recentStudents = await prisma.student.findMany({
            orderBy: { id: 'desc' },
            take: 5
        });

        return {
            stats: {
                students: studentCount,
                activeStudents: activeStudentCount,
                teachers: teacherCount,
                lessonsToday: todayLessons.length
            },
            todaySchedule: todayLessons,
            students: recentStudents
        };
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return null;
    }
}

// --- Teachers ---

export async function getTeachers() {
    try {
        return await prisma.teacher.findMany({
            orderBy: { name: 'asc' }
        });
    } catch (error) {
        console.error('Error fetching teachers:', error);
        return [];
    }
}

export async function addTeacher(data: {
    name: string;
    email: string;
    loginId: string;
    password?: string;
    role?: string;
    bio?: string;
}) {
    try {
        const teacher = await prisma.teacher.create({
            data: {
                name: data.name,
                email: data.email,
                loginId: data.loginId,
                password: data.password || 'password123',
                role: data.role || 'Teacher',
                bio: data.bio || '',
                joinDate: new Date().toISOString().split('T')[0],
            },
        });
        revalidatePath('/admin/teachers');
        revalidatePath('/admin/settings');
        return { success: true, teacher };
    } catch (error) {
        console.error('Error adding teacher:', error);
        return { success: false, error: '講師の追加に失敗しました' };
    }
}

export async function updateTeacher(id: string, data: any) {
    try {
        const teacher = await prisma.teacher.update({
            where: { id },
            data: {
                name: data.name,
                email: data.email,
                loginId: data.loginId,
                password: data.password,
                role: data.role,
                bio: data.bio,
                status: data.status
            },
        });
        revalidatePath('/admin/teachers');
        revalidatePath('/admin/settings');
        return { success: true, teacher };
    } catch (error) {
        console.error('Error updating teacher:', error);
        return { success: false, error: '講師の更新に失敗しました' };
    }
}

export async function deleteTeacherAdmin(id: string) {
    try {
        await prisma.teacher.delete({
            where: { id },
        });
        revalidatePath('/admin/teachers');
        return { success: true };
    } catch (error) {
        console.error('Error deleting teacher:', error);
        return { success: false, error: '講師の削除に失敗しました' };
    }
}

// --- Students ---

export async function getStudents() {
    try {
        return await prisma.student.findMany({
            orderBy: { name: 'asc' }
        });
    } catch (error) {
        console.error('Error fetching students:', error);
        return [];
    }
}

export async function addStudent(data: {
    name: string;
    email: string;
    course: string;
    loginId: string;
    password?: string;
}) {
    try {
        const student = await prisma.student.create({
            data: {
                name: data.name,
                email: data.email,
                course: data.course,
                loginId: data.loginId,
                password: data.password || 'password123',
                status: 'Active',
                joinDate: new Date().toISOString().split('T')[0],
            },
        });
        revalidatePath('/admin/students');
        return { success: true, student };
    } catch (error: any) {
        console.error('Error adding student:', error);
        if (error.code === 'P2002') {
            const target = error.meta?.target || [];
            if (target.includes('email')) {
                return { success: false, error: 'このメールアドレスは既に登録されています' };
            }
            if (target.includes('loginId')) {
                return { success: false, error: 'このログインIDは既に登録されています' };
            }
        }
        return { success: false, error: error.message || '生徒の登録に失敗しました' };
    }
}

export async function deleteStudent(id: string) {
    try {
        await prisma.student.delete({
            where: { id },
        });
        revalidatePath('/admin/students');
        return { success: true };
    } catch (error) {
        console.error('Error deleting student:', error);
        return { success: false, error: '生徒の削除に失敗しました' };
    }
}

export async function getStudentDetail(id: string) {
    try {
        return await prisma.student.findUnique({
            where: { id },
            include: {
                schedules: {
                    orderBy: [
                        { date: 'desc' },
                        { time: 'desc' }
                    ]
                },
                records: {
                    orderBy: { date: 'desc' }
                }
            }
        });
    } catch (error) {
        console.error('Error fetching student detail:', error);
        return null;
    }
}

export async function updateStudent(id: string, data: any) {
    try {
        const student = await prisma.student.update({
            where: { id },
            data: {
                name: data.name,
                email: data.email,
                course: data.course,
                status: data.status,
                level: data.level,
                target: data.target,
                phone: data.phone,
                internalNote: data.internalNote,
                toeicScore: data.toeicScore,
                cefr: data.cefr,
                vocabScore: data.vocabScore,
                grammarScore: data.grammarScore,
                listeningScore: data.listeningScore,
                speakingScore: data.speakingScore,
                goalTarget: data.goalTarget,
                goalProgress: data.goalProgress,
                biography: data.biography,
                occupation: data.occupation,
                loginId: data.loginId,
                password: data.password
            }
        });
        revalidatePath(`/admin/students/${id}`);
        revalidatePath('/admin/students');
        return { success: true, student };
    } catch (error) {
        console.error('Error updating student:', error);
        return { success: false, error: '生徒情報の更新に失敗しました' };
    }
}

// --- Schedules ---

export async function getAllSchedules() {
    try {
        return await prisma.lessonSchedule.findMany({
            include: {
                student: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: [
                { date: 'asc' },
                { time: 'asc' }
            ]
        });
    } catch (error) {
        console.error('Error fetching all schedules:', error);
        return [];
    }
}

export async function addLessonSchedule(data: {
    studentId: string;
    studentName: string;
    teacherName: string;
    date: string;
    time: string;
    duration: string;
    course: string;
    type: string;
    meetingUrl?: string;
}) {
    try {
        const schedule = await prisma.lessonSchedule.create({
            data: {
                studentId: data.studentId,
                studentName: data.studentName,
                teacherName: data.teacherName,
                date: data.date,
                time: data.time,
                duration: data.duration,
                course: data.course,
                type: data.type,
                status: 'Scheduled',
                meetingUrl: data.meetingUrl
            },
        });
        revalidatePath('/admin/schedule');
        revalidatePath(`/admin/students/${data.studentId}`);
        return { success: true, schedule };
    } catch (error) {
        console.error('Error adding schedule:', error);
        return { success: false, error: 'スケジュールの追加に失敗しました' };
    }
}

export async function deleteLessonSchedule(id: string, studentId?: string) {
    try {
        await prisma.lessonSchedule.delete({
            where: { id },
        });
        revalidatePath('/admin/schedule');
        if (studentId) revalidatePath(`/admin/students/${studentId}`);
        return { success: true };
    } catch (error) {
        console.error('Error deleting schedule:', error);
        return { success: false, error: 'スケジュールの削除に失敗しました' };
    }
}

// --- Lesson Records ---

export async function addLessonRecord(data: {
    studentId: string;
    date: string;
    teacher: string;
    title: string;
    feedback: string;
    homework?: string;
    grammar?: number;
    vocab?: number;
    pronunciation?: number;
    fluency?: number;
    internalNote?: string;
}) {
    try {
        const record = await prisma.lessonRecord.create({
            data: {
                studentId: data.studentId,
                date: data.date,
                teacher: data.teacher,
                title: data.title,
                feedback: data.feedback,
                homework: data.homework || '',
                grammar: data.grammar || 50,
                vocab: data.vocab || 50,
                pronunciation: data.pronunciation || 50,
                fluency: data.fluency || 50,
                internalNote: data.internalNote || ''
            } as any,
        });

        // Update student lesson count
        await prisma.student.update({
            where: { id: data.studentId },
            data: {
                totalLessons: { increment: 1 },
                lastLesson: data.date
            }
        });

        revalidatePath(`/admin/students/${data.studentId}`);
        revalidatePath('/admin/schedule');
        revalidatePath('/(student)/karte', 'page');
        revalidatePath('/(student)/dashboard', 'page');

        return { success: true, record };
    } catch (error) {
        console.error('Error adding lesson record:', error);
        return { success: false, error: 'レッスン記録の作成に失敗しました' };
    }
}

// --- Announcements ---

export async function getAnnouncements() {
    try {
        return await prisma.announcement.findMany({
            orderBy: { date: 'desc' }
        });
    } catch (error) {
        console.error('Error fetching announcements:', error);
        return [];
    }
}

export async function addAnnouncement(data: {
    title: string;
    content: string;
    priority: string;
    target: string;
}) {
    try {
        const announcement = await prisma.announcement.create({
            data: {
                title: data.title,
                content: data.content,
                priority: data.priority,
                target: data.target,
                date: new Date().toISOString().split('T')[0],
            },
        });
        revalidatePath('/admin/announcements');
        revalidatePath('/(student)/dashboard', 'page');
        return { success: true, announcement };
    } catch (error) {
        console.error('Error adding announcement:', error);
        return { success: false, error: 'お知らせの配信に失敗しました' };
    }
}

export async function deleteAnnouncement(id: string) {
    try {
        await prisma.announcement.delete({
            where: { id },
        });
        revalidatePath('/admin/announcements');
        return { success: true };
    } catch (error) {
        console.error('Error deleting announcement:', error);
        return { success: false, error: 'お知らせの削除に失敗しました' };
    }
}

// --- Billing ---

export async function getInvoices() {
    try {
        return await prisma.invoice.findMany({
            include: {
                student: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                dueDate: 'asc'
            }
        });
    } catch (error) {
        console.error('Error fetching invoices:', error);
        return [];
    }
}

export async function addInvoice(data: {
    studentId: string;
    planName: string;
    amount: number;
    dueDate: string;
    status: string;
}) {
    try {
        const invoice = await prisma.invoice.create({
            data: {
                studentId: data.studentId,
                planName: data.planName,
                amount: data.amount,
                dueDate: data.dueDate,
                status: data.status,
            },
        });
        revalidatePath('/admin/billing');
        return { success: true, invoice };
    } catch (error) {
        console.error('Error adding invoice:', error);
        return { success: false, error: '請求書の作成に失敗しました' };
    }
}

export async function updateInvoiceStatus(id: string, newStatus: string) {
    try {
        await prisma.invoice.update({
            where: { id },
            data: { status: newStatus },
        });
        revalidatePath('/admin/billing');
        return { success: true };
    } catch (error) {
        console.error('Error updating invoice status:', error);
        return { success: false, error: '請求書ステータスの更新に失敗しました' };
    }
}

// --- Messages ---

export async function getAdminMessages(teacherId: string) {
    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { teacherId: teacherId },
                    { teacherId: null }
                ]
            },
            include: {
                student: true
            },
            orderBy: {
                time: 'asc'
            }
        });
        return messages;
    } catch (error) {
        console.error('Error fetching admin messages:', error);
        return [];
    }
}

export async function markMessagesAsRead(studentId: string, teacherId: string) {
    try {
        await prisma.message.updateMany({
            where: {
                studentId,
                teacherId,
                sender: 'student',
                read: false,
            },
            data: {
                read: true,
            },
        });
        revalidatePath('/admin/messages');
        revalidatePath('/teacher/messages');
        revalidatePath('/(student)/messages', 'page');
        return { success: true };
    } catch (error) {
        console.error('Error marking messages as read:', error);
        return { success: false };
    }
}

export async function getTeacherChats(teacherId: string) {
    try {
        const students = await prisma.student.findMany();
        const messages = await prisma.message.findMany({
            where: {
                teacherId: teacherId
            },
            orderBy: {
                time: 'asc'
            }
        });

        return students.map(student => {
            const studentMessages = messages.filter(m => m.studentId === student.id);
            const lastMessage = studentMessages[studentMessages.length - 1];
            const unreadCount = studentMessages.filter(m => m.sender === 'student' && !m.read).length;

            return {
                student: student as any,
                lastMessage: lastMessage as any,
                unreadCount
            };
        });
    } catch (error) {
        console.error('Error fetching teacher chats:', error);
        return [];
    }
}

export async function getStudentChats(studentId: string) {
    try {
        const teachers = await prisma.teacher.findMany({
            where: { role: 'Teacher' }
        });
        const messages = await prisma.message.findMany({
            where: {
                studentId: studentId
            },
            orderBy: {
                time: 'asc'
            }
        });

        return teachers.map(teacher => {
            const roomMsgs = messages.filter(m => m.teacherId === teacher.id);
            const lastMessage = roomMsgs[roomMsgs.length - 1];
            const unreadCount = roomMsgs.filter(m => m.sender === 'teacher' && !m.read).length;

            return {
                teacher: teacher as any,
                lastMessage: lastMessage as any,
                unreadCount
            };
        });
    } catch (error) {
        console.error('Error fetching student chats:', error);
        return [];
    }
}

export async function getMessages(studentId: string) {
    try {
        return await prisma.message.findMany({
            where: { studentId },
            orderBy: { time: 'asc' }
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
}

export async function sendMessage(data: {
    studentId: string;
    teacherId: string;
    sender: 'student' | 'teacher';
    text: string;
}) {
    try {
        const message = await prisma.message.create({
            data: {
                studentId: data.studentId,
                teacherId: data.teacherId,
                sender: data.sender,
                text: data.text,
                time: new Date(),
            },
        });
        revalidatePath('/admin/messages');
        revalidatePath('/teacher/messages');
        revalidatePath('/(student)/messages', 'page');
        return { success: true, message };
    } catch (error) {
        console.error('Error sending message:', error);
        return { success: false, error: 'メッセージの送信に失敗しました' };
    }
}

// --- Settings & Reset ---

export async function getSchoolSettings() {
    try {
        return await prisma.schoolSettings.findUnique({
            where: { id: 1 }
        });
    } catch (error) {
        console.error('Error fetching settings:', error);
        return null;
    }
}

export async function updateSchoolSettings(data: any) {
    try {
        const settings = await prisma.schoolSettings.upsert({
            where: { id: 1 },
            update: data,
            create: {
                id: 1,
                ...data
            }
        });
        revalidatePath('/admin/settings');
        return { success: true, settings };
    } catch (error) {
        console.error('Error updating settings:', error);
        return { success: false, error: '設定の更新に失敗しました' };
    }
}

export async function clearLessonRecords() {
    try {
        await prisma.lessonRecord.deleteMany();
        await prisma.lessonSchedule.deleteMany();

        revalidatePath('/admin/students');
        revalidatePath('/teacher');
        revalidatePath('/(student)/dashboard', 'page');
        revalidatePath('/(student)/schedule', 'page');
        revalidatePath('/(student)/karte', 'page');

        return { success: true };
    } catch (error) {
        console.error('Error clearing lesson records:', error);
        return { success: false, error: 'レッスン記録の削除に失敗しました' };
    }
}

export async function resetDatabase() {
    try {
        const admins = await prisma.teacher.findMany({
            where: { role: 'Admin' }
        });

        await prisma.message.deleteMany();
        await prisma.lessonRecord.deleteMany();
        await prisma.lessonSchedule.deleteMany();
        await prisma.invoice.deleteMany();
        await prisma.announcement.deleteMany();
        await prisma.schoolSettings.deleteMany();
        await prisma.student.deleteMany();
        await prisma.vocabProgress.deleteMany();
        await prisma.grammarProgress.deleteMany();

        await prisma.teacher.deleteMany({
            where: { role: { not: 'Admin' } }
        });

        await prisma.schoolSettings.create({
            data: {
                id: 1,
                schoolName: 'English LMS',
                timezone: 'Asia/Tokyo',
                defaultCourseDuration: 80,
                allowStudentCancellation: true,
                cancellationDeadlineHours: 24,
                monthlyGoal: 100
            }
        });

        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Error resetting database:', error);
        return { success: false, error: 'リセットに失敗しました' };
    }
}
