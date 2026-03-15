
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const schedules = await prisma.lessonSchedule.findMany();
    console.log(JSON.stringify(schedules, null, 2));
}

main().finally(() => prisma.$disconnect());
