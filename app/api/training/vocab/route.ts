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
        const progresses = await prisma.vocabProgress.findMany({
            where: { studentId },
            orderBy: { lastPlayedAt: 'desc' }
        });
        return NextResponse.json(progresses);
    } catch (error) {
        console.error('Failed to fetch vocab progress:', error);
        return NextResponse.json({ error: 'Failed to fetch vocab progress' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { studentId, level, stageIndex, score, completed, isPerfectClear, mode } = body;

        const currentMode = mode || 'flash';

        if (!studentId || !level || stageIndex === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Find existing record
        const existing = await prisma.vocabProgress.findUnique({
            where: {
                studentId_level_stageIndex_mode: {
                    studentId,
                    level,
                    stageIndex,
                    mode: currentMode
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

        const progress = await prisma.vocabProgress.upsert({
            where: {
                studentId_level_stageIndex_mode: {
                    studentId,
                    level,
                    stageIndex,
                    mode: currentMode
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
                stageIndex,
                mode: currentMode,
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
        console.error('Failed to update vocab progress:', error);
        return NextResponse.json({ error: 'Failed to update vocab progress' }, { status: 500 });
    }
}
