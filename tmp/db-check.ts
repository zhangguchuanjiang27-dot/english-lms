import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('--- Database Diagnostic ---');
    const schedules = await prisma.lessonSchedule.findMany({
      include: { student: true }
    });
    console.log(`Found ${schedules.length} schedules.`);
    
    const missingStudents = schedules.filter(s => !s.student);
    if (missingStudents.length > 0) {
      console.log(`WARNING: ${missingStudents.length} schedules have missing students!`);
      missingStudents.forEach(s => console.log(`- Schedule ID: ${s.id}, studentId: ${s.studentId}`));
    } else {
      console.log('All schedules have valid students.');
    }

    const records = await prisma.lessonRecord.findMany();
    console.log(`Found ${records.length} lesson records.`);
    
    // Check for duplicate lessonId transitions
    const lessonIds = records.map(r => r.lessonId).filter(id => id !== null);
    const uniqueLessonIds = new Set(lessonIds);
    if (lessonIds.length !== uniqueLessonIds.size) {
      console.log(`WARNING: Duplicate lessonIds found in lesson records!`);
    }

    console.log('--- End Diagnostic ---');
  } catch (err) {
    console.error('Diagnostic failed:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
