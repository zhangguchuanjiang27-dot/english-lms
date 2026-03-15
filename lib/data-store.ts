'use client';

// This is a simple client-side data store using localStorage to simulate a database.
// In a real app, this would be replaced by API calls to a backend (PostgreSQL, etc.)

export type Student = {
    id: string;
    name: string;
    email: string;
    course: string;
    status: 'Active' | 'Paused' | 'Inactive';
    lastLesson: string;
    progress: number;
    loginId: string;
    password?: string;
    level: number;
    target?: string;
    phone?: string;
    joinDate?: string;
    totalLessons?: number;
    internalNote?: string;
    // -- Extended for Achievements & Profile
    toeicScore?: string;
    cefr?: string;
    vocabScore?: number;
    grammarScore?: number;
    listeningScore?: number;
    speakingScore?: number;
    goalTarget?: string;
    goalProgress?: number;
    biography?: string;
    occupation?: string;
    avatarUrl?: string;
    coverUrl?: string;
};

export type LessonSchedule = {
    id: string;
    studentId: string;
    studentName: string;
    teacherName: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
    duration: string;
    course: string;
    type: 'General' | 'Premium' | 'Exam' | 'Casual';
    status: 'Scheduled' | 'Completed' | 'Cancelled';
    tags?: string[];
    meetingUrl?: string; // Google Meet URL等
};

export type LessonRecord = {
    id: string;
    studentId: string;
    date: string;
    teacher: string;
    title: string;
    feedback: string;
    homework?: string;
    internalNote: string;
    grammar?: number;
    vocab?: number;
    pronunciation?: number;
    fluency?: number;
};

export type Message = {
    id: string;
    studentId: string;
    teacherId?: string; // Support for 2-pane teacher selection
    sender: 'teacher' | 'student';
    text: string;
    time: string;
    read: boolean;
};

export type Teacher = {
    id: string;
    name: string;
    email: string;
    status: 'Active' | 'Inactive';
    role: 'Admin' | 'Teacher';
    type: 'Native' | 'Bilingual';
    bio?: string;
    joinDate: string;
    rating?: number;
    loginId?: string;
    password?: string;
};

export type SchoolSettings = {
    schoolName: string;
    timezone: string;
    defaultCourseDuration: number;
    allowStudentCancellation: boolean;
    cancellationDeadlineHours: number;
    monthlyGoal: number;
};

export type Invoice = {
    id: string;
    studentId: string;
    planName: string;
    amount: number;
    dueDate: string;
    status: 'Paid' | 'Pending' | 'Overdue';
    createdAt: string;
};

export type Announcement = {
    id: string;
    title: string;
    content: string;
    date: string;
    priority: 'High' | 'Normal';
    author: string;
    target: 'All' | 'Business' | 'Beginner' | 'Kids';
};

// --- INITIAL DATA ---
const DEFAULT_STUDENTS: Student[] = [
    { id: 'karat', name: 'Karat Student', email: 'karat@example.com', course: '英語', status: 'Active', lastLesson: '2024-03-01', progress: 65, loginId: 'karat', password: 'password123', level: 3, target: 'TOEIC 800点' },
    { id: 'yukukumo', name: '游雲 (yukukumo)', email: 'yukukumo@example.com', course: '中一英語', status: 'Active', lastLesson: '2024-03-05', progress: 40, loginId: 'yukukumo', password: 'password123', level: 1 }
];
const DEFAULT_RECORDS: LessonRecord[] = [];
const DEFAULT_MESSAGES: Message[] = [];
const DEFAULT_SCHEDULE: LessonSchedule[] = [];
const DEFAULT_TEACHERS: Teacher[] = [
    { id: 'admin', name: '管理者', email: 'admin@luminous.edu', status: 'Active', role: 'Admin', type: 'Bilingual', joinDate: '2024-01-01', rating: 5.0, loginId: 'admin', password: 'password123' },
    { id: 'sarah', name: 'Sarah Wilson', email: 'sarah@luminous.edu', status: 'Active', role: 'Teacher', type: 'Native', joinDate: '2024-02-01', rating: 4.9, loginId: 'sarah', password: 'password123' },
    { id: 'takumi', name: '長谷川匠', email: 'takumi@example.com', status: 'Active', role: 'Teacher', type: 'Bilingual', joinDate: '2024-03-01', rating: 5.0, loginId: 'takumi', password: 'password123' }
];
const DEFAULT_SCHOOL_SETTINGS: SchoolSettings = {
    schoolName: 'Luminous English Academy',
    timezone: 'Asia/Tokyo',
    defaultCourseDuration: 50,
    allowStudentCancellation: true,
    cancellationDeadlineHours: 12,
    monthlyGoal: 3000000
};
const DEFAULT_INVOICES: Invoice[] = [];
const DEFAULT_ANNOUNCEMENTS: Announcement[] = [];

// --- STORE LOGIC ---
function runDemoMigration() {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem('lms_demo_cleared_v1')) return;

    const demoStudentIds = ['kensuke', 'yumi', 'shota'];
    const demoTeacherIds = ['sarah', 'john', 'ken', 'takumi'];

    // remove demo students
    const storedStudents = localStorage.getItem('lms_students');
    if (storedStudents) {
        let items = JSON.parse(storedStudents);
        // Protect any newly added students (those not in the demo list)
        // Only perform the explicit clear of demo data exactly once.
        items = items.filter((i: any) => !demoStudentIds.includes(i.id));
        localStorage.setItem('lms_students', JSON.stringify(items));
    }

    // remove demo teachers
    const storedTeachers = localStorage.getItem('lms_teachers');
    if (storedTeachers) {
        let items = JSON.parse(storedTeachers);
        items = items.filter((i: any) => !demoTeacherIds.includes(i.id));
        // Ensure the admin account exists if no teachers are left or just missing
        if (!items.find((t: any) => t.id === 'admin')) {
            items.push({ id: 'admin', name: '管理者', email: 'admin@luminous.edu', status: 'Active', type: 'Bilingual', role: 'Admin', joinDate: '2024-01-01', rating: 5.0, loginId: 'admin', password: 'password123' });
        }
        localStorage.setItem('lms_teachers', JSON.stringify(items));
    }

    const filterByStudentId = (key: string) => {
        const stored = localStorage.getItem(key);
        if (stored) {
            let items = JSON.parse(stored);
            items = items.filter((i: any) => !demoStudentIds.includes(i.studentId));
            localStorage.setItem(key, JSON.stringify(items));
        }
    };

    filterByStudentId('lms_schedule');
    filterByStudentId('lms_messages');
    filterByStudentId('lms_records');
    filterByStudentId('lms_invoices');

    localStorage.setItem('lms_demo_cleared_v1', 'true');
}

export const DataStore = {
    // --- STUDENTS ---
    getStudents: (): Student[] => {
        runDemoMigration();
        if (typeof window === 'undefined') return DEFAULT_STUDENTS;
        const stored = localStorage.getItem('lms_students');
        // If nothing in storage and migration hasn't run, we'd use default.
        // But once migration runs, 'lms_students' should exist even if empty.
        let students: Student[] = stored ? JSON.parse(stored) : (localStorage.getItem('lms_demo_cleared_v1') ? [] : DEFAULT_STUDENTS);


        // Migration: Map legacy course names to new ones
        const courseMap: Record<string, string> = {
            'General English': '英語',
            'Business English': '英語',
            'Business Premium': '英語',
            'Daily Conversation': '中一英語',
            'Exam Prep (Eiken)': '中三英語',
            'Business': '英語',
            'Casual': '中一英語',
            'Exam': '中三英語',
            'TOEIC Exam': '英語',
            'Kids English': '中一英語'
        };

        return students.map(s => ({
            ...s,
            course: courseMap[s.course] || s.course
        }));
    },
    saveStudent: (student: Student) => {
        const students = DataStore.getStudents();
        const index = students.findIndex(s => s.id === student.id);
        if (index >= 0) {
            students[index] = student;
        } else {
            students.push(student);
        }
        localStorage.setItem('lms_students', JSON.stringify(students));
    },
    deleteStudent: (studentId: string) => {
        const students = DataStore.getStudents();
        const updated = students.filter(s => s.id !== studentId);
        localStorage.setItem('lms_students', JSON.stringify(updated));

        // Optionally clean up related data
        const schedule = DataStore.getSchedule().filter(s => s.studentId !== studentId);
        localStorage.setItem('lms_schedule', JSON.stringify(schedule));

        const records = DataStore.getRecords().filter(r => r.studentId !== studentId);
        localStorage.setItem('lms_records', JSON.stringify(records));

        const messages = DataStore.getAllMessages().filter(m => m.studentId !== studentId);
        localStorage.setItem('lms_messages', JSON.stringify(messages));

        const invoices = DataStore.getInvoices().filter(i => i.studentId !== studentId);
        localStorage.setItem('lms_invoices', JSON.stringify(invoices));
    },

    // --- RECORDS ---
    getRecords: (studentId?: string): LessonRecord[] => {
        runDemoMigration();
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem('lms_records');
        const records: LessonRecord[] = stored ? JSON.parse(stored) : [];
        if (studentId) {
            return records.filter(r => r.studentId === studentId).sort((a, b) => b.date.localeCompare(a.date));
        }
        return records.sort((a, b) => b.date.localeCompare(a.date));
    },
    addRecord: (record: LessonRecord) => {
        const records = DataStore.getRecords();
        records.unshift(record);
        localStorage.setItem('lms_records', JSON.stringify(records));
    },

    // --- SCHEDULE ---
    getSchedule: (date?: string): LessonSchedule[] => {
        runDemoMigration();
        if (typeof window === 'undefined') return DEFAULT_SCHEDULE;
        const stored = localStorage.getItem('lms_schedule');
        let schedule: LessonSchedule[] = stored ? JSON.parse(stored) : DEFAULT_SCHEDULE;

        // Migration: Map legacy course names to new ones
        const courseMap: Record<string, string> = {
            'General English': '英語',
            'Business English': '英語',
            'Business Premium': '英語',
            'Daily Conversation': '中一英語',
            'Exam Prep (Eiken)': '中三英語',
            'Business': '英語',
            'Casual': '中一英語',
            'Exam': '中三英語',
            'TOEIC Exam': '英語',
            'Kids English': '中一英語'
        };

        const migrated = schedule.map(s => {
            const newCourse = courseMap[s.course] || s.course;
            return {
                ...s,
                course: newCourse,
                meetingUrl: s.meetingUrl || ''
            };
        });

        if (date) {
            return migrated.filter(s => s.date === date);
        }
        return migrated;
    },
    saveSchedule: (event: LessonSchedule) => {
        const schedule = DataStore.getSchedule();
        const index = schedule.findIndex(s => s.id === event.id);
        if (index >= 0) {
            schedule[index] = event;
        } else {
            schedule.push(event);
        }
        localStorage.setItem('lms_schedule', JSON.stringify(schedule));
    },
    deleteSchedule: (id: string) => {
        const schedule = DataStore.getSchedule();
        const updated = schedule.filter(s => s.id !== id);
        localStorage.setItem('lms_schedule', JSON.stringify(updated));
    },

    // --- MESSAGES ---
    getAllMessages: (): Message[] => {
        runDemoMigration();
        if (typeof window === 'undefined') return DEFAULT_MESSAGES;
        const stored = localStorage.getItem('lms_messages');
        return stored ? JSON.parse(stored) : DEFAULT_MESSAGES;
    },
    getMessages: (studentId: string): Message[] => {
        const messages = DataStore.getAllMessages();
        return messages.filter(m => m.studentId === studentId);
    },

    addMessage: (msg: Message) => {
        if (typeof window === 'undefined') return;
        const stored = localStorage.getItem('lms_messages');
        const messages: Message[] = stored ? JSON.parse(stored) : DEFAULT_MESSAGES;
        messages.push(msg);
        localStorage.setItem('lms_messages', JSON.stringify(messages));
    },

    // --- TEACHERS ---
    getTeachers: (): Teacher[] => {
        runDemoMigration();
        if (typeof window === 'undefined') return DEFAULT_TEACHERS;
        const stored = localStorage.getItem('lms_teachers');
        return stored ? JSON.parse(stored) : DEFAULT_TEACHERS;
    },
    saveTeacher: (teacher: Teacher) => {
        const teachers = DataStore.getTeachers();
        const index = teachers.findIndex(t => t.id === teacher.id);
        if (index >= 0) {
            teachers[index] = teacher;
        } else {
            teachers.push(teacher);
        }
        localStorage.setItem('lms_teachers', JSON.stringify(teachers));
    },
    deleteTeacher: (id: string) => {
        const teachers = DataStore.getTeachers();
        const updated = teachers.filter(t => t.id !== id);
        localStorage.setItem('lms_teachers', JSON.stringify(updated));
    },

    // --- SCHOOL SETTINGS ---
    getSchoolSettings: (): SchoolSettings => {
        if (typeof window === 'undefined') return DEFAULT_SCHOOL_SETTINGS;
        const stored = localStorage.getItem('lms_school_settings');
        return stored ? JSON.parse(stored) : DEFAULT_SCHOOL_SETTINGS;
    },
    saveSchoolSettings: (settings: SchoolSettings) => {
        localStorage.setItem('lms_school_settings', JSON.stringify(settings));
    },

    // --- INVOICES ---
    getInvoices: (): Invoice[] => {
        runDemoMigration();
        if (typeof window === 'undefined') return DEFAULT_INVOICES;
        const stored = localStorage.getItem('lms_invoices');
        return stored ? JSON.parse(stored) : DEFAULT_INVOICES;
    },
    saveInvoice: (invoice: Invoice) => {
        const invoices = DataStore.getInvoices();
        const index = invoices.findIndex(i => i.id === invoice.id);
        if (index >= 0) {
            invoices[index] = invoice;
        } else {
            invoices.push(invoice);
        }
        localStorage.setItem('lms_invoices', JSON.stringify(invoices));
    },
    updateInvoiceStatus: (id: string, status: Invoice['status']) => {
        const invoices = DataStore.getInvoices();
        const index = invoices.findIndex(i => i.id === id);
        if (index >= 0) {
            invoices[index].status = status;
            localStorage.setItem('lms_invoices', JSON.stringify(invoices));
        }
    },

    // --- ANNOUNCEMENTS ---
    getAnnouncements: (): Announcement[] => {
        runDemoMigration();
        if (typeof window === 'undefined') return DEFAULT_ANNOUNCEMENTS;
        const stored = localStorage.getItem('lms_announcements');
        const list: Announcement[] = stored ? JSON.parse(stored) : DEFAULT_ANNOUNCEMENTS;
        // 最新順にソートして返す
        return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    },
    addAnnouncement: (announcement: Announcement) => {
        const announcements = DataStore.getAnnouncements();
        announcements.unshift(announcement);
        localStorage.setItem('lms_announcements', JSON.stringify(announcements));
    },
    deleteAnnouncement: (id: string) => {
        const announcements = DataStore.getAnnouncements();
        const filtered = announcements.filter(a => a.id !== id);
        localStorage.setItem('lms_announcements', JSON.stringify(filtered));
    }
};
