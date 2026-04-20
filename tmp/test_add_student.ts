import { PrismaClient } from '../prisma/generated-client';

const prisma = new PrismaClient();

async function main() {
    try {
        const student = await prisma.student.create({
            data: {
                name: "Test Student",
                email: "test@example.com",
                course: "英語",
                loginId: "teststudent",
                password: "password123",
                status: 'Active',
                joinDate: new Date().toISOString().split('T')[0],
            },
        });
        console.log('Success:', student);
    } catch (error) {
        console.error('Error adding student:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
