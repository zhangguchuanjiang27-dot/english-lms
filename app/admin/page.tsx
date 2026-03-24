'use client';

import {
    Users,
    TrendingUp,
    Calendar,
    CreditCard,
    Search,
    Plus,
    MoreHorizontal,
    CheckCircle2,
    Clock,
    LayoutGrid,
    Settings,
    Bell,
    LogOut,
    FileText,
    GraduationCap
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DataStore, Student, LessonSchedule } from '@/lib/data-store';
import { getAdminDashboardData } from '@/lib/actions/admin';

export default function AdminDashboard() {
    const [adminName, setAdminName] = useState('管理者');
    const [stats, setStats] = useState({ students: 0, activeStudents: 0, teachers: 0, lessonsToday: 0 });
    const [students, setStudents] = useState<Student[]>([]);
    const [todaySchedule, setTodaySchedule] = useState<LessonSchedule[]>([]);

    useEffect(() => {
        const storedName = localStorage.getItem('user_name');
        if (storedName) {
            setAdminName(storedName);
        }

        getAdminDashboardData().then(data => {
            if (data) {
                setStats(data.stats);
                setStudents(data.students as Student[]);
                setTodaySchedule(data.todaySchedule as unknown as LessonSchedule[]);
            }
        });
    }, []);

    // Calculate dynamic stats from lesson schedules
    const completedLessons = todaySchedule.filter(l => l.status === 'Completed').length;

    // For demo purposes, we'll keep some static text for Revenue and Alerts
    // but the core student/lesson data is now dynamic

    return (
        <main className="flex-1 flex flex-col overflow-hidden">
            {/* Top Header */}
            <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-8">
                <div className="flex items-center gap-4 w-1/3">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="生徒名、IDなどで検索..."
                            className="w-full pl-10 pr-4 py-2 rounded-full bg-secondary border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 text-muted-foreground hover:text-foreground relative">
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-background"></span>
                    </button>
                    <div className="h-8 w-px bg-border mx-2"></div>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold leading-none">{adminName}</p>
                            <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">Super Admin</p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm border-2 border-border uppercase">
                            {adminName[0]}
                        </div>
                    </div>
                </div>
            </header>

            {/* Dashboard Content */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">経営ダッシュボード</h1>
                        <p className="text-muted-foreground mt-1">本日の塾の稼働状況と主要KPI</p>
                    </div>
                    <Link href="/admin/students" className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2.5 rounded-lg font-medium shadow-sm flex items-center gap-2 text-sm transition-all transform active:scale-95">
                        <Plus size={18} />
                        生徒管理へ
                    </Link>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        label="総生徒数"
                        value={stats.students.toString()}
                        subValue={`アクティブ: ${stats.activeStudents}人`}
                        icon={Users}
                        trend="up"
                        color="text-blue-500"
                    />
                    <StatCard
                        label="総講師数"
                        value={stats.teachers.toString()}
                        subValue="稼働中"
                        icon={GraduationCap}
                        trend="neutral"
                        color="text-emerald-500"
                    />
                    <StatCard
                        label="本日のレッスン"
                        value={stats.lessonsToday.toString()}
                        subValue={`完了: ${completedLessons} / 予定: ${stats.lessonsToday - completedLessons}`}
                        icon={Calendar}
                        trend="neutral"
                        color="text-violet-500"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Lesson Schedule */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-border flex justify-between items-center">
                                <h3 className="font-bold text-lg">本日の授業状況</h3>
                                <span className="text-xs font-mono bg-secondary px-2 py-1 rounded">
                                    {new Date().toISOString().split('T')[0]}
                                </span>
                            </div>
                            <div className="divide-y divide-border">
                                {todaySchedule.length > 0 ? (
                                    todaySchedule.map(lesson => (
                                        <LessonRow
                                            key={lesson.id}
                                            time={lesson.time}
                                            student={lesson.studentName}
                                            course={lesson.course}
                                            teacher={lesson.teacherName}
                                            status={lesson.status === 'Scheduled' && lesson.time <= new Date().toTimeString().split(' ')[0].substring(0, 5) ? 'active' : 'pending'}
                                            id={lesson.id}
                                        />
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-muted-foreground text-sm">
                                        本日のスケジュールはありません
                                    </div>
                                )}
                            </div>
                            <div className="p-4 bg-secondary/30 text-center">
                                <Link href="/admin/schedule" className="text-sm text-primary hover:underline font-medium">全てのスケジュールを見る</Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Recent Students */}
                    <div className="space-y-6">
                        <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <Users size={20} className="text-primary" />
                                新規登録生徒
                            </h3>
                            <div className="space-y-4">
                                {students.length > 0 ? (
                                    students.map((student, i) => (
                                        <div key={i} className="flex items-center gap-3 p-2 hover:bg-secondary/50 rounded-lg transition-colors">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                                                {student.name[0]}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-foreground truncate">{student.name}</p>
                                                <p className="text-[10px] text-muted-foreground truncate">{student.course} • {student.joinDate || '登録日不明'}</p>
                                            </div>
                                            <Link href={`/admin/students/${student.id}`} className="text-xs text-primary font-medium hover:underline">
                                                詳細
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">登録生徒はいません</p>
                                )}
                            </div>
                            <Link href="/admin/students" className="block w-full text-center mt-6 text-xs text-muted-foreground hover:text-primary transition-colors">
                                全ての生徒を表示
                            </Link>
                        </div>

                        <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg overflow-hidden relative group">
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                            <h3 className="font-bold mb-2 relative z-10 font-sans tracking-tight">システム管理</h3>
                            <p className="text-indigo-100 text-sm mb-4 relative z-10 leading-relaxed">
                                スクール設定や講師の管理を行うことができます。
                            </p>
                            <Link href="/admin/settings" className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-2 rounded-lg transition-colors w-full inline-block text-center relative z-10 font-bold">
                                設定へ移動
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function StatCard({ label, value, subValue, icon: Icon, trend, color }: { label: string, value: string, subValue: string, icon: React.ElementType, trend: string, color: string }) {
    return (
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{label}</p>
                    <h3 className="text-2xl font-bold mt-1">{value}</h3>
                </div>
                <div className={`p-2.5 rounded-lg bg-secondary ${color}`}>
                    <Icon size={20} />
                </div>
            </div>
            <p className={`text-xs font-medium ${trend === 'up' ? 'text-emerald-500' :
                trend === 'alert' ? 'text-red-500' : 'text-muted-foreground'
                }`}>
                {subValue}
            </p>
        </div>
    )
}

function LessonRow({ time, student, course, teacher, status, id }: { time: string, student: string, course: string, teacher: string, status: string, id: string }) {
    return (
        <div className="p-4 flex flex-col sm:flex-row items-center gap-4 hover:bg-muted/50 transition-colors group">
            <div className="flex items-center gap-3 w-full sm:w-32">
                <div className="bg-secondary text-secondary-foreground font-mono px-2 py-1 rounded text-sm font-bold">
                    {time}
                </div>
                {status === 'active' && (
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                )}
            </div>

            <div className="flex-1 w-full text-center sm:text-left">
                <h4 className="font-bold text-foreground">{student}</h4>
                <p className="text-xs text-muted-foreground">{course}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground w-full sm:w-auto justify-center sm:justify-start">
                <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold">
                    {teacher[0]}
                </div>
                <span>{teacher}</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-indigo-100 text-indigo-600 rounded-md" title="カルテ入力">
                    <FileText size={16} />
                </button>
                <button className="p-2 hover:bg-secondary text-foreground rounded-md" title="詳細">
                    <MoreHorizontal size={16} />
                </button>
            </div>
        </div>
    )
}

function AlertItem({ label, time, type }: { label: string, time: string, type: string }) {
    const bg = type === 'urgent' ? 'bg-red-50 text-red-700 border-red-100' :
        type === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-100' :
            'bg-blue-50 text-blue-700 border-blue-100';

    return (
        <div className={`text-sm p-3 rounded-lg border ${bg} flex justify-between items-center`}>
            <span className="font-medium">{label}</span>
            <span className="text-xs opacity-80">{time}</span>
        </div>
    )
}
