import { PrismaClient } from '../prisma/generated-client';

const prisma = new PrismaClient();

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
            '未来の文 (will, be going to)', '助動詞 (must, may, have to, should)', 
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

async function seed() {
    let order_count = 0;
    for (const group of SEED_DATA) {
        for (const label of group.items) {
            // Using casting to bypass old client types if needed
            const existing = await (prisma as any).grammarPoint.findFirst({
                where: { label, category: group.category }
            });

            if (!existing) {
                await (prisma as any).grammarPoint.create({
                    data: {
                        label,
                        category: group.category,
                        order: order_count++
                    }
                });
                console.log(`Created: ${label} (${group.category})`);
            } else {
                console.log(`Exists: ${label} (${group.category})`);
                order_count++;
            }
        }
    }
}

seed()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
