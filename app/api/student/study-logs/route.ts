import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
        return NextResponse.json({ error: 'Missing studentId' }, { status: 400 });
    }

    try {
        const logs = await prisma.studyLog.findMany({
            where: { studentId },
            orderBy: { createdAt: 'desc' }
        });

        // Group by day for the heatmap
        const dailyStats: Record<string, { duration: number; count: number; score: number }> = {};

        logs.forEach((log: any) => {
            const date = log.createdAt.toISOString().split('T')[0];
            if (!dailyStats[date]) {
                dailyStats[date] = { duration: 0, count: 0, score: 0 };
            }
            dailyStats[date].duration += log.duration;
            dailyStats[date].count += 1;
            dailyStats[date].score += log.score || 0;
        });

        return NextResponse.json({ logs, dailyStats });
    } catch (error) {
        console.error('Failed to fetch study logs:', error);
        return NextResponse.json({ error: 'Failed to fetch study logs' }, { status: 500 });
    }
}
