import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Fetch top 50 students by Streak
        const streakRanking = await prisma.student.findMany({
            where: { status: 'Active' },
            select: {
                id: true,
                name: true,
                nickname: true,
                questStreak: true,
                avatarUrl: true,
            },
            orderBy: {
                questStreak: 'desc',
            },
            take: 50,
        });

        // Fetch top 50 students by Level (XP)
        const levelRanking = await prisma.student.findMany({
            where: { status: 'Active' },
            select: {
                id: true,
                name: true,
                nickname: true,
                questXP: true,
                questLevel: true,
                avatarUrl: true,
            },
            orderBy: {
                questXP: 'desc',
            },
            take: 50,
        });

        return NextResponse.json({
            streakRanking,
            levelRanking
        });
    } catch (error) {
        console.error('Failed to fetch rankings:', error);
        return NextResponse.json({ error: 'Failed to fetch rankings' }, { status: 500 });
    }
}
