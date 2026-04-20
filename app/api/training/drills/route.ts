import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { processQuestCompletion } from '@/lib/quest-logic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
        return NextResponse.json({ error: 'Missing studentId' }, { status: 400 });
    }

    try {
        const progresses = await prisma.drillProgress.findMany({
            where: { studentId },
        });
        return NextResponse.json(progresses);
    } catch (error) {
        console.error('Failed to fetch drill progress:', error);
        return NextResponse.json({ error: 'Failed to fetch drill progress' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { studentId, level, categoryId, score, completed, isPerfectClear } = body;

        if (!studentId || !level || !categoryId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const existing = await prisma.drillProgress.findUnique({
            where: {
                studentId_level_categoryId: {
                    studentId,
                    level,
                    categoryId
                }
            }
        });

        const newCompletions = existing
            ? (completed ? existing.completions + 1 : existing.completions)
            : (completed ? 1 : 0);

        const newPerfectClears = existing
            ? (isPerfectClear ? (existing.perfectClears || 0) + 1 : (existing.perfectClears || 0))
            : (isPerfectClear ? 1 : 0);

        const newHighScore = existing
            ? Math.max(existing.highestScore, score || 0)
            : (score || 0);

        const progress = await prisma.drillProgress.upsert({
            where: {
                studentId_level_categoryId: {
                    studentId,
                    level,
                    categoryId
                }
            },
            update: {
                completions: newCompletions,
                perfectClears: newPerfectClears,
                highestScore: newHighScore,
                lastPlayedAt: new Date()
            },
            create: {
                studentId,
                level,
                categoryId,
                completions: newCompletions,
                perfectClears: newPerfectClears,
                highestScore: newHighScore
            }
        });

        // Update Global Quest Progress
        let studentProgress = null;
        if (score && score > 0) {
            studentProgress = await processQuestCompletion(studentId, score);
        }

        return NextResponse.json({ progress, studentProgress });
    } catch (error) {
        console.error('Failed to update drill progress:', error);
        return NextResponse.json({ error: 'Failed to update drill progress' }, { status: 500 });
    }
}
