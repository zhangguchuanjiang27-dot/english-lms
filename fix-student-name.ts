
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // Student record fix
    const student = await prisma.student.update({
        where: { loginId: 'yukumo' },
        data: { name: 'yukumo' }
    });
    console.log(`Updated student name to ${student.name}`);

    // Schedule records fix
    const result = await prisma.lessonSchedule.updateMany({
        where: { studentId: student.id },
        data: { studentName: 'yukumo' }
    });
    console.log(`Updated ${result.count} schedule records`);
}

main().finally(() => prisma.$disconnect());
