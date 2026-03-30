'use server';

import { prisma } from '@/lib/prisma';

export async function getStudentDashboardData(studentId: string) {
    try {
        const student = await prisma.student.findUnique({
            where: { id: studentId },
        });

        if (!student) return null;

        const todayStr = new Intl.DateTimeFormat('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Asia/Tokyo'
        }).format(new Date()).replace(/\//g, '-');

        const schedules = await prisma.lessonSchedule.findMany({
            where: {
                studentId,
                status: 'Scheduled',
                date: {
                    gte: todayStr
                }
            },
            orderBy: [
                { date: 'asc' },
                { time: 'asc' }
            ],
            take: 5
        });

        const records = await prisma.lessonRecord.findMany({
            where: { studentId },
            orderBy: {
                date: 'desc'
            },
            take: 5
        });

        const announcements = await prisma.announcement.findMany({
            orderBy: { date: 'desc' },
            take: 3
        });

        const testScores = await (prisma as any).testScore.findMany({
            where: { studentId },
            orderBy: { date: 'desc' },
            take: 3
        });

        return {
            student,
            upcomingLesson: schedules[0] || null,
            records,
            announcements,
            testScores
        };
    } catch (error) {
        console.error('Error fetching student dashboard data:', error);
        return null;
    }
}

export async function getStudentSchedule(studentId: string) {
    try {
        const schedules = await prisma.lessonSchedule.findMany({
            where: {
                studentId,
                status: {
                    in: ['Scheduled', 'Completed']
                }
            },
            orderBy: [
                { date: 'desc' },
                { time: 'desc' }
            ]
        });

        const records = await prisma.lessonRecord.findMany({
            where: { studentId },
            orderBy: {
                date: 'desc'
            }
        });

        // Fetch school settings to get the default lesson duration
        const settings = await prisma.schoolSettings.findUnique({
            where: { id: 1 }
        });

        return {
            schedules,
            records,
            settings
        };
    } catch (error) {
        console.error('Error fetching student schedule:', error);
        return null;
    }
}
export async function getStudentProfile(studentId: string) {
    try {
        const student = await prisma.student.findUnique({
            where: { id: studentId },
        });
        return student;
    } catch (error) {
        console.error('Error fetching student profile:', error);
        return null;
    }
}

export async function updateStudentProfile(studentId: string, data: any) {
    try {
        const student = await prisma.student.update({
            where: { id: studentId },
            data: {
                email: data.email,
                course: data.course,
                target: data.target,
                phone: data.phone,
                biography: data.biography,
                occupation: data.occupation,
                avatarUrl: data.avatarUrl,
                coverUrl: data.coverUrl,
                // Add other editable fields here
            }
        });
        return { success: true, student };
    } catch (error) {
        console.error('Error updating student profile:', error);
        return { success: false, error: 'プロフィールの更新に失敗しました' };
    }
}

export async function getStudentTestScores(studentId: string) {
    try {
        const scores = await (prisma as any).testScore.findMany({
            where: { studentId },
            orderBy: { date: 'desc' }
        });
        return scores;
    } catch (error) {
        console.error('Error fetching test scores:', error);
        return [];
    }
}

export async function addStudentTestScore(studentId: string, data: any) {
    try {
        const score = await (prisma as any).testScore.create({
            data: {
                studentId,
                type: data.type,
                testName: data.testName,
                date: data.date,
                grade: data.grade,
                score: data.score,
                totalScore: data.totalScore,
                trend: data.trend || 'same'
            }
        });
        return { success: true, score };
    } catch (error: any) {
        console.error('Error adding test score:', error);
        return { success: false, error: 'テスト結果の記録に失敗しました: ' + (error.message || '不明なエラー') };
    }
}

export async function updateStudentTestScore(scoreId: string, data: any) {
    try {
        const score = await (prisma as any).testScore.update({
            where: { id: scoreId },
            data: {
                type: data.type,
                testName: data.testName,
                date: data.date,
                grade: data.grade,
                score: data.score,
                totalScore: data.totalScore,
                trend: data.trend
            }
        });
        return { success: true, score };
    } catch (error: any) {
        console.error('Error updating test score:', error);
        return { success: false, error: 'テスト結果の更新に失敗しました: ' + (error.message || '不明なエラー') };
    }
}

export async function deleteStudentTestScore(scoreId: string) {
    try {
        await (prisma as any).testScore.delete({
            where: { id: scoreId }
        });
        return { success: true };
    } catch (error: any) {
        console.error('Error deleting test score:', error);
        return { success: false, error: 'テスト結果の削除に失敗しました: ' + (error.message || '不明なエラー') };
    }
}
