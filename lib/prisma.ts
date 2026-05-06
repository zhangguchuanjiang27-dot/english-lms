import { PrismaClient } from '@/prisma/generated-client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

let isDbOffline = false;

const createPrismaClient = () => {
    return new PrismaClient();
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
