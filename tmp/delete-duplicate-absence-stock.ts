import { PrismaClient } from '../prisma/generated-client';

const prisma = new PrismaClient();

const targetIds = [
    'cmswyw3mf0007l1042hn8g65i',
    'cmsg54aqg0007ju047ou6idmy',
];

async function main() {
    const targets = await prisma.lessonSchedule.findMany({
        where: {
            id: { in: targetIds },
            status: 'Absent',
        },
    });

    if (targets.length !== targetIds.length) {
        console.log('Expected targets were not all found. No deletion performed.');
        console.log(JSON.stringify(targets, null, 2));
        return;
    }

    const deletedRecords = await prisma.lessonRecord.deleteMany({
        where: { lessonId: { in: targetIds } },
    });

    const deletedSchedules = await prisma.lessonSchedule.deleteMany({
        where: {
            id: { in: targetIds },
            status: 'Absent',
        },
    });

    console.log(JSON.stringify({ deletedRecords, deletedSchedules }, null, 2));
}

main().finally(() => prisma.$disconnect());
