-- CreateTable
CREATE TABLE "MakeupLessonCredit" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "originalLessonId" TEXT,
    "usedLessonId" TEXT,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "teacherName" TEXT NOT NULL,
    "reason" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Available',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usedAt" TIMESTAMP(3),

    CONSTRAINT "MakeupLessonCredit_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "LessonSchedule" ADD COLUMN "makeupCreditId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "MakeupLessonCredit_originalLessonId_key" ON "MakeupLessonCredit"("originalLessonId");

-- CreateIndex
CREATE UNIQUE INDEX "MakeupLessonCredit_usedLessonId_key" ON "MakeupLessonCredit"("usedLessonId");

-- AddForeignKey
ALTER TABLE "MakeupLessonCredit" ADD CONSTRAINT "MakeupLessonCredit_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
