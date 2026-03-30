'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getGrammarPoints() {
    return await prisma.grammarPoint.findMany({
        orderBy: { order: 'asc' }
    });
}

export async function getStudentGrammarMastery(studentId: string) {
    const points = await prisma.grammarPoint.findMany({
        orderBy: [{ category: 'asc' }, { order: 'asc' }]
    });

    const masteries = await prisma.grammarMastery.findMany({
        where: { studentId }
    });

    // Create a map for quick lookup
    const masteryMap = new Map(masteries.map(m => [m.grammarPointId, m.status]));

    return points.map(p => ({
        ...p,
        status: masteryMap.get(p.id) || 'NONE'
    }));
}

export async function updateGrammarMastery(studentId: string, pointId: string, status: string) {
    try {
        await prisma.grammarMastery.upsert({
            where: {
                studentId_grammarPointId: {
                    studentId,
                    grammarPointId: pointId
                }
            },
            update: { status },
            create: {
                studentId,
                grammarPointId: pointId,
                status
            }
        });
        
        revalidatePath(`/admin/students/${studentId}`);
        revalidatePath('/achievements');
        
        return { success: true };
    } catch (e: any) {
        console.error('Error updating mastery:', e);
        return { success: false, error: e.message };
    }
}

export async function seedGrammarPoints() {
    const SEED_DATA = [
        {
            category: 'jhs1',
            items: [
                'be動詞', '一般動詞(現在形)', '疑問詞', '命令文', '代名詞', 
                '三人称単数現在', '現在進行形', '助動詞can', 
                '一般動詞の過去形(規則)', '一般動詞の過去形(不規則)', 
                'be動詞の過去形', '過去進行形'
            ]
        },
        {
            category: 'jhs2',
            items: [
                '未来の文 (will, be going to)', '助動詞 (must, may, have to)', 
                '接続詞 (when, if, because)', '不定詞 (目的・原因・形容詞的)', 
                '動名詞 (〜すること)', '特別な働きをする動詞 (SVOO等)', 
                '比較 (比較級・最上級)', '受動態 (〜される)'
            ]
        },
        {
            category: 'jhs3',
            items: [
                '現在完了形', '現在完了進行形', '関係代名詞 (who, which, that)', 
                '間接疑問文', '分詞の形容詞的用法', '仮定法 (If I were...)'
            ]
        }
    ];

    let order = 0;
    for (const group of SEED_DATA) {
        for (const label of group.items) {
            await prisma.grammarPoint.upsert({
                where: { id: `point-${group.category}-${order}` }, // Consistent IDs for idempotency if possible, but schema doesn't have unique string id other than cuid
                // Since I don't have a unique constraint on label/category other than auto-id, I'll just check if exists
            });
            
            // Actually, let's just create if not exists by label and category
            const existing = await prisma.grammarPoint.findFirst({
                where: { label, category: group.category }
            });

            if (!existing) {
                await prisma.grammarPoint.create({
                    data: {
                        label,
                        category: group.category,
                        order: order++
                    }
                });
            } else {
                order++;
            }
        }
    }
    return { success: true };
}
