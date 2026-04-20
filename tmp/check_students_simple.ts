import { PrismaClient } from '../prisma/generated-client';

const prisma = new PrismaClient();

async function main() {
    try {
        const students = await prisma.student.findMany();
        console.log('Students:', JSON.stringify(students.map(s => ({ id: s.id, name: s.name, email: s.email, loginId: s.loginId })), null, 2));
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
