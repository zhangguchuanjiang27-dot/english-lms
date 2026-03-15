-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "lastLesson" TEXT,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "loginId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "target" TEXT,
    "phone" TEXT,
    "joinDate" TEXT,
    "totalLessons" INTEGER NOT NULL DEFAULT 0,
    "internalNote" TEXT,
    "toeicScore" TEXT,
    "cefr" TEXT,
    "vocabScore" INTEGER,
    "grammarScore" INTEGER,
    "listeningScore" INTEGER,
    "speakingScore" INTEGER,
    "goalTarget" TEXT,
    "goalProgress" INTEGER,
    "biography" TEXT,
    "occupation" TEXT
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "type" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Teacher',
    "bio" TEXT,
    "joinDate" TEXT NOT NULL,
    "rating" REAL,
    "loginId" TEXT,
    "password" TEXT
);

-- CreateTable
CREATE TABLE "LessonSchedule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "teacherName" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Scheduled',
    "tags" TEXT,
    CONSTRAINT "LessonSchedule_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LessonRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "homework" TEXT,
    "internalNote" TEXT,
    CONSTRAINT "LessonRecord_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "teacherId" TEXT,
    "sender" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Message_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Message_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Announcement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "target" TEXT NOT NULL DEFAULT 'All',
    "priority" TEXT NOT NULL DEFAULT 'Normal'
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "planName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "dueDate" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Invoice_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SchoolSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "schoolName" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "defaultCourseDuration" INTEGER NOT NULL,
    "allowStudentCancellation" BOOLEAN NOT NULL,
    "cancellationDeadlineHours" INTEGER NOT NULL,
    "monthlyGoal" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_loginId_key" ON "Student"("loginId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_loginId_key" ON "Teacher"("loginId");
