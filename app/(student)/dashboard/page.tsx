'use client';

import {
    Clock,
    Video,
    ChevronRight,
    Target,
    MessageCircle,
    FileText,
    PencilLine,
    Bell,
    BookOpen
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Student, LessonRecord, LessonSchedule, Announcement } from '@/lib/data-store';
import { getStudentDashboardData } from '@/lib/actions/student';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function StudentDashboard() {
    const [student, setStudent] = useState<Student | null>(null);
    const [records, setRecords] = useState<LessonRecord[]>([]);
    const [upcomingLesson, setUpcomingLesson] = useState<LessonSchedule | null>(null);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (!userId) return;

        getStudentDashboardData(userId).then(data => {
            if (data) {
                setStudent(data.student as unknown as Student);
                setRecords(data.records as unknown as LessonRecord[]);
                setUpcomingLesson(data.upcomingLesson as unknown as LessonSchedule);
                setAnnouncements(data.announcements as unknown as Announcement[]);
            }
            setLoading(false);
        });
    }, []);

    // Countdown logic for the next lesson
    const [timeLeft, setTimeLeft] = useState<string>('');

    useEffect(() => {
        if (!upcomingLesson) return;

        const updateTimer = () => {
            const now = new Date();
            const [year, month, day] = upcomingLesson.date.split('-').map(Number);
            const [hours, minutes] = upcomingLesson.time.split(':').map(Number);
            const lessonDate = new Date(year, month - 1, day, hours, minutes, 0, 0);

            const diff = lessonDate.getTime() - now.getTime();
            if (diff <= 0) {
                setTimeLeft('レッスン開始時間です');
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            if (days > 0) {
                setTimeLeft(`あと ${days}日 ${hrs}時間`);
            } else if (hrs > 0) {
                setTimeLeft(`あと ${hrs}時間 ${mins}分`);
            } else {
                setTimeLeft(`あと ${mins}分`);
            }
        };

        updateTimer();
        const timer = setInterval(updateTimer, 60000);
        return () => clearInterval(timer);
    }, [upcomingLesson]);

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    const displayName = student?.name || 'ゲスト';
    const displayTarget = student?.target || '目標未設定';

    return (
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-50/50">
            {/* Header */}
            <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 gap-4 md:gap-6">
                <div className="animate-in slide-in-from-left duration-500">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest">Student Portal</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">こんにちは、<br className="md:hidden" />{displayName}さん 👋</h1>
                </div>
                <div className="flex items-center gap-4 animate-in slide-in-from-right duration-500">
                    <div className="hidden lg:flex flex-col items-end border-r border-slate-200 pr-4 mr-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Current Target</p>
                        <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <Target size={14} className="text-indigo-500" />
                            {displayTarget}
                        </p>
                    </div>
                    <Link href="/messages" className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all relative shadow-sm hover:shadow-md group">
                        <MessageCircle size={22} className="group-hover:scale-110 transition-transform" />
                        <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-white"></span>
                    </Link>
                    <Link href="/profile" className="flex items-center gap-3 p-1.5 pr-4 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-black shadow-lg shadow-indigo-200 uppercase transform group-hover:scale-105 transition-transform">
                            {displayName[0]}
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-xs font-black text-slate-800 leading-none">{displayName}</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-0.5">Edit Profile</p>
                        </div>
                    </Link>
                </div>
            </header>

            <div className="max-w-7xl mx-auto space-y-10 pb-12">

                {/* Hero Section: Next Class focus */}
                <div className="grid grid-cols-1 gap-8">
                    {/* Hero: Next Class Countdown */}
                    <section className="group">
                        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 text-white p-8 md:p-12 shadow-2xl transition-all duration-500 hover:shadow-indigo-500/10 active:scale-[0.99]">
                            <div className="relative z-10 flex flex-col justify-between h-full min-h-[220px]">
                                {upcomingLesson ? (
                                    <>
                                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                                            <div className="space-y-6">
                                                <div className="inline-flex items-center gap-2 bg-indigo-500/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-indigo-500/30">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                                                    Next Lesson
                                                </div>
                                                <div>
                                                    <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight mb-4">
                                                        {upcomingLesson.course}
                                                    </h2>
                                                    <div className="flex flex-wrap gap-5 text-slate-300">
                                                        <div className="flex items-center gap-2.5 text-sm font-bold bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
                                                            <Clock size={16} className="text-indigo-400" />
                                                            {upcomingLesson.date.replace(/-/g, '/')} {upcomingLesson.time}
                                                        </div>
                                                        <div className="flex items-center gap-2.5 text-sm font-bold bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
                                                            <Video size={16} className="text-indigo-400" />
                                                            {upcomingLesson.teacherName} 先生
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-4 w-full md:w-auto mt-4 md:mt-0">
                                                <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-5 md:p-6 flex flex-col items-center justify-center border border-white/10 text-center min-w-[200px]">
                                                    <p className="text-[10px] text-indigo-300 font-black uppercase tracking-widest mb-2">開始まで</p>
                                                    <p className="text-2xl md:text-3xl font-black text-white tracking-tight">{timeLeft || '確認中'}</p>
                                                    <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                                                        <div className="h-full bg-indigo-50 w-2/3"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-10 flex flex-wrap gap-4">
                                            {upcomingLesson.meetingUrl ? (
                                                <a
                                                    href={upcomingLesson.meetingUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-white text-slate-900 px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl hover:bg-slate-50 transition-all hover:translate-y-[-2px] active:translate-y-0 flex items-center justify-center gap-2 flex-1 md:flex-none"
                                                >
                                                    教室に入室
                                                    <ChevronRight size={18} />
                                                </a>
                                            ) : (
                                                <button
                                                    onClick={() => alert('会議URLが設定されていません。事務局にお問い合わせください。')}
                                                    className="bg-slate-500 text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl opacity-80 cursor-not-allowed flex items-center gap-2"
                                                >
                                                    入室準備中
                                                    <Clock size={18} />
                                                </button>
                                            )}
                                            <Link href="/schedule" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-6 py-3.5 rounded-2xl font-black text-sm transition-all flex items-center gap-2">
                                                詳細を確認
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="inline-flex items-center gap-2 bg-slate-800 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
                                            No Upcoming Lessons
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
                                            次回のレッスンを<br />予約しましょう
                                        </h2>
                                        <p className="text-slate-400 max-w-md font-medium">
                                            学習のリズムを維持するために、定期的な受講をおすすめしています。
                                        </p>
                                        <Link href="/schedule" className="inline-flex bg-white text-slate-900 px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl hover:bg-slate-50 transition-all items-center gap-2">
                                            空き状況を確認
                                            <ChevronRight size={18} />
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Animated Background Gradients */}
                            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-600 rounded-full blur-[100px] opacity-30 group-hover:opacity-40 transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-violet-500 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        </div>
                    </section>

                    {/* Secondary Section Grid: Karte & Announcements */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent Karte */}
                        <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col h-full animate-in slide-in-from-bottom duration-500 delay-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                                    <FileText className="text-indigo-500" size={20} />
                                    直近のカルテ
                                </h3>
                                <Link href="/karte" className="text-[10px] font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
                                    すべて見る <ChevronRight size={12} />
                                </Link>
                            </div>

                            <div className="flex-1">
                                {records.length > 0 ? (
                                    <div className="space-y-4">
                                        {records.slice(0, 2).map((record) => (
                                            <div key={record.id} className="group p-5 bg-slate-50 hover:bg-indigo-50/50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{record.date.replace(/-/g, '/')}</span>
                                                            <span className="text-[10px] font-bold text-slate-500 bg-slate-200/50 px-2 py-0.5 rounded-md">担当: {record.teacher}</span>
                                                        </div>
                                                        <h4 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                                                            <BookOpen size={14} className="text-emerald-500" />
                                                            {record.title}
                                                        </h4>
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">
                                                        {record.feedback}
                                                    </p>
                                                    {record.homework && (
                                                        <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-100/50 shadow-sm">
                                                            <PencilLine size={14} className="text-amber-500 shrink-0 mt-0.5" />
                                                            <div>
                                                                <p className="text-[10px] font-black text-amber-600 uppercase tracking-wider mb-0.5">次回までの宿題</p>
                                                                <p className="text-xs text-slate-700 font-bold leading-relaxed">{record.homework}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center py-10 text-center opacity-60">
                                        <FileText size={40} className="text-slate-300 mb-3" />
                                        <p className="text-sm font-bold text-slate-500">まだカルテの記録がありません</p>
                                        <p className="text-xs text-slate-400 mt-1">レッスンを受講するとここにフィードバックが表示されます</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Announcements */}
                        <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col h-full animate-in slide-in-from-bottom duration-500 delay-200">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                                    <Bell className="text-amber-500" size={20} />
                                    お知らせ
                                </h3>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    {announcements.length} 件
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-3">
                                {announcements.length > 0 ? (
                                    announcements.slice(0, 3).map((announcement) => (
                                        <div key={announcement.id} className="p-4 bg-slate-50 hover:bg-white rounded-2xl border border-slate-100 transition-all cursor-default">
                                            <div className="flex items-center gap-2 mb-2">
                                                {announcement.priority === 'High' && (
                                                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                                                )}
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{announcement.date.replace(/-/g, '/')}</span>
                                            </div>
                                            <h4 className="text-sm font-black text-slate-800 mb-1 leading-snug">{announcement.title}</h4>
                                            <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">{announcement.content}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center py-10 text-center opacity-60">
                                        <Bell size={40} className="text-slate-300 mb-3" />
                                        <p className="text-sm font-bold text-slate-500">現在お知らせはありません</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
