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
        const progresses = await prisma.fillInProgress.findMany({
            where: { studentId },
        });
        return NextResponse.json(progresses);
    } catch (error) {
        console.error('Failed to fetch fill-in progress:', error);
        return NextResponse.json({ error: 'Failed to fetch fill-in progress' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { studentId, level, stageIndex, score, completed, isPerfectClear, duration } = body;

        if (!studentId || !level || stageIndex === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const existing = await prisma.fillInProgress.findUnique({
            where: {
                studentId_level_stageIndex: {
                    studentId,
                    level,
                    stageIndex
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

        const progress = await prisma.fillInProgress.upsert({
            where: {
                studentId_level_stageIndex: {
                    studentId,
                    level,
                    stageIndex
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
                completions: newCompletions,
                perfectClears: newPerfectClears,
                highestScore: newHighScore
            }
        });

        // Create Study Log (we can log it as GRAMMAR or a new type. Let's use GRAMMAR or FILL_IN. We'll use GRAMMAR so it shows up in heatmap)
        await prisma.studyLog.create({
            data: {
                studentId,
                type: 'GRAMMAR', // Reusing GRAMMAR so it contributes to existing stats
                duration: duration || 0,
                score: score || 0,
            }
        });

        // Update Global Quest Progress
        let studentProgress = null;
        if (score && score > 0) {
            studentProgress = await processQuestCompletion(studentId, score);
        }

        return NextResponse.json({ progress, studentProgress });
    } catch (error) {
        console.error('Failed to update fill-in progress:', error);
        return NextResponse.json({ error: 'Failed to update fill-in progress' }, { status: 500 });
    }
}
