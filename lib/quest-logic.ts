import { prisma } from '@/lib/prisma';
import { getLevelInfo } from './quest-utils';

export async function processQuestCompletion(studentId: string, earnedXP: number) {
    const student = await prisma.student.findUnique({
        where: { id: studentId }
    });

    if (!student) return null;

    const oldTotalXp = student.questXP;
    const oldLevelInfo = getLevelInfo(oldTotalXp);

    // 1. Streak Logic
    let questStreak = student.questStreak;
    const now = new Date();
    const lastPlayed = student.lastQuestPlayedAt;

    if (!lastPlayed) {
        questStreak = 1;
    } else {
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const lastPlayDay = new Date(lastPlayed.getFullYear(), lastPlayed.getMonth(), lastPlayed.getDate());
        const diffDays = Math.floor((today.getTime() - lastPlayDay.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            questStreak += 1;
        } else if (diffDays > 1) {
            questStreak = 1;
        }
    }

    // 2. XP & Level
    const newTotalXp = oldTotalXp + earnedXP;
    const newLevelInfo = getLevelInfo(newTotalXp);
    const isLevelUp = newLevelInfo.level > oldLevelInfo.level;

    // 3. Update Database
    const updatedStudent = await prisma.student.update({
        where: { id: studentId },
        data: {
            questXP: newTotalXp,
            questLevel: newLevelInfo.level,
            questStreak: questStreak,
            lastQuestPlayedAt: now
        }
    });

    return {
        student: updatedStudent,
        isLevelUp,
        oldLevelInfo,
        newLevelInfo,
        earnedXP
    };
}
