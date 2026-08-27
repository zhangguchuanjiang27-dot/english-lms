import { PrismaClient } from '../prisma/generated-client';

const prisma = new PrismaClient();

async function main() {
    const rows = await prisma.lessonSchedule.findMany({
        where: {
            date: '2026-08-25',
            studentName: { in: ['かやのれん', 'おともしいか'] },
        },
        orderBy: [{ studentName: 'asc' }, { time: 'asc' }, { id: 'asc' }],
    });

    console.log(JSON.stringify(rows, null, 2));
}

main().finally(() => prisma.$disconnect());
