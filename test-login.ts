import { prisma } from './lib/prisma';
import { addTeacher } from './lib/actions/admin';
import { login } from './lib/actions/auth';

async function test() {
    console.log("Adding teacher...");
    const newT = await addTeacher({
        name: 'Test Teacher',
        email: 'test@example.com',
        loginId: 'tester',
        password: 'password123',
        role: 'Teacher',
        bio: 'Just a test'
    });
    console.log("Added:", newT);

    console.log("Trying login...");
    const res = await login('teacher', 'tester', 'password123');
    console.log("Login result:", res);
}

test();
