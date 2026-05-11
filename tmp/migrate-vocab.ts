import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Starting VocabProgress migration...");
    
    // Get all records
    const allRecords = await prisma.vocabProgress.findMany();
    
    // Group by studentId + level + mode
    const groups: Record<string, typeof allRecords> = {};
    for (const record of allRecords) {
        const key = `${record.studentId}_${record.level}_${record.mode}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(record);
    }

    let totalMigratedGroups = 0;

    for (const key of Object.keys(groups)) {
        const records = groups[key];
        const { studentId, level, mode } = records[0];

        // Find how many stages were completed or perfected in the old 50-question format
        // We count any stage that has completions > 0
        const oldCompletedStages = records.filter(r => r.completions > 0).length;
        
        if (oldCompletedStages === 0) continue;

        const totalOldQuestions = oldCompletedStages * 50;
        const newPerfectStagesCount = Math.floor(totalOldQuestions / 20);

        console.log(`[${key}] Old completed stages: ${oldCompletedStages} (${totalOldQuestions} q) -> New perfect stages: ${newPerfectStagesCount}`);

        // 1. Delete old records for this specific group to prevent index mismatch
        await prisma.vocabProgress.deleteMany({
            where: {
                studentId,
                level,
                mode
            }
        });

        // 2. Create new perfect records for the calculated number of stages
        // 20 questions max score = 3900 (100 base + combo bonus 10 per question)
        for (let i = 0; i < newPerfectStagesCount; i++) {
            await prisma.vocabProgress.create({
                data: {
                    studentId,
                    level,
                    mode,
                    stageIndex: i,
                    completions: 1,
                    perfectClears: 1,
                    highestScore: 3900
                }
            });
        }
        
        totalMigratedGroups++;
    }

    console.log(`Migration complete! Successfully migrated ${totalMigratedGroups} student progress groups.`);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
