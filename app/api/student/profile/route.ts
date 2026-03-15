import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Student ID IS required' }, { status: 400 });
    }

    try {
        const student = await prisma.student.findUnique({
            where: { id },
            select: {
                id: true,
                questLevel: true,
                questXP: true,
                questStreak: true,
                lastQuestPlayedAt: true
            }
        });

        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        return NextResponse.json(student);
    } catch (error) {
        console.error('Failed to fetch student profile:', error);
        return NextResponse.json({ error: 'Failed to fetch student profile' }, { status: 500 });
    }
}
