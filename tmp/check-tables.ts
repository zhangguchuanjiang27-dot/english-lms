import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const points = await (prisma as any).grammarPoint.findMany();
    console.log('GrammarPoint table exists, count:', points.length);
  } catch (e: any) {
    console.log('GrammarPoint table does NOT exist or error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
