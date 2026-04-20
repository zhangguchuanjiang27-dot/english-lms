import { PrismaClient } from '../prisma/generated-client';

const prisma = new PrismaClient();

async function main() {
    try {
        const data = {
            name: "Error Test",
            email: "error-test@example.com",
            course: "英語",
            loginId: "errortest",
            password: "password123",
        };
        
        console.log('Attempting to create student with:', data);
        
        const student = await prisma.student.create({
            data: {
                name: data.name,
                email: data.email,
                course: data.course,
                loginId: data.loginId,
                password: data.password || 'password123',
                status: 'Active',
                joinDate: new Date().toISOString().split('T')[0],
            },
        });
        console.log('Success:', student);
    } catch (error: any) {
        console.error('Detailed Error:', error);
        if (error.code) console.error('Error Code:', error.code);
        if (error.meta) console.error('Error Meta:', error.meta);
    } finally {
        await prisma.$disconnect();
    }
}

main();
