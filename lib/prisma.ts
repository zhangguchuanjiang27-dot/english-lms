import { PrismaClient } from '@/prisma/generated-client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

let isDbOffline = false;

const createPrismaClient = () => {
    const client = new PrismaClient();
    if (process.env.NODE_ENV === 'production') return client;
    
    return client.$extends({
        query: {
            $allModels: {
                async $allOperations({ query, args }) {
                    if (isDbOffline) {
                        throw new Error('Local Prisma DB Offline Bypass');
                    }
                    const timeoutPromise = new Promise((_, reject) => 
                        setTimeout(() => reject(new Error('Local Prisma DB Timeout Bypass')), 800)
                    );
                    try {
                        return await Promise.race([query(args), timeoutPromise]);
                    } catch (e: any) {
                        isDbOffline = true;
                        setTimeout(() => { isDbOffline = false }, 60000); // Retry after 1 min
                        throw e;
                    }
                }
            }
        }
    }) as unknown as PrismaClient;
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
