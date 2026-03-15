
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const result = await prisma.lessonSchedule.updateMany({
        where: { teacherName: "長谷川 匠" },
        data: { teacherName: "長谷川匠" }
    });
    console.log(`Updated ${result.count} records`);
}

main().finally(() => prisma.$disconnect());
