
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const schedules = await prisma.lessonSchedule.findMany({
        where: { studentId: "cmmd6b0cv0001qet8s80e2e08" }
    });
    console.log(JSON.stringify(schedules, null, 2));
}

main().finally(() => prisma.$disconnect());
