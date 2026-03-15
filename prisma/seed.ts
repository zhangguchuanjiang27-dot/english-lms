import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log('Seeding started...');

    // 生徒データ
    await prisma.student.upsert({
        where: { loginId: 'karat' },
        update: {},
        create: {
            id: 'karat',
            name: 'Karat Student',
            email: 'karat@example.com',
            loginId: 'karat',
            password: 'password123',
            course: '英語',
            level: 3,
            target: 'TOEIC 800点',
            status: 'Active',
            joinDate: '2024-03-01',
        },
    })

    // 管理者データ
    await prisma.teacher.upsert({
        where: { loginId: 'admin' },
        update: {},
        create: {
            id: 'admin',
            name: '管理者',
            email: 'admin@luminous.edu',
            loginId: 'admin',
            password: 'password123',
            role: 'Admin',
            joinDate: '2024-01-01',
        },
    })

    // 講師データ
    await prisma.teacher.upsert({
        where: { loginId: 'sarah' },
        update: {},
        create: {
            id: 'sarah',
            name: 'Sarah Wilson',
            email: 'sarah@luminous.edu',
            loginId: 'sarah',
            password: 'password123',
            role: 'Teacher',
            joinDate: '2024-02-01',
            rating: 4.9,
        },
    })

    console.log('Seed data created!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
