import { PrismaClient } from './prisma/generated-client'

const prisma = new PrismaClient()

async function main() {
    try {
        console.log('Attempting to connect to database...')
        const student = await prisma.student.findFirst()
        console.log('Connection successful!')
        console.log('Result:', student)
    } catch (error) {
        console.error('Database connection error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
