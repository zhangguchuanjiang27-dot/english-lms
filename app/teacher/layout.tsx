'use client';

import {
    Calendar,
    Users,
    MessageSquare,
    Settings,
    User,
    LogOut,
    Presentation,
    Search
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import AuthGuard from '@/components/AuthGuard';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function TeacherLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_id');
        router.push('/login');
    };

    return (
        <AuthGuard allowedRoles={['teacher', 'admin']}>
            <div className="flex min-h-screen bg-emerald-50/30 text-slate-900 font-sans">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-emerald-100 hidden md:flex flex-col p-6 sticky top-0 h-screen shadow-sm shadow-emerald-100/50">
                    <div className="flex items-center gap-3 px-2 mb-10">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-200">
                            V
                        </div>
                        <div>
                            <span className="font-bold text-lg tracking-tight leading-tight block">Voca</span>
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block mt-1">Teacher<br />Portal</span>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-2 flex-1">
                        <TeacherNavItem
                            icon={Calendar}
                            label="今日のスケジュール"
                            href="/teacher"
                            active={pathname === '/teacher'}
                        />
                        <TeacherNavItem
                            icon={Users}
                            label="担当生徒一覧"
                            href="/teacher/students"
                            active={pathname.includes('/teacher/students')}
                        />
                        <TeacherNavItem
                            icon={MessageSquare}
                            label="メッセージ"
                            href="/teacher/messages"
                            active={pathname.includes('/teacher/messages')}
                        />
                        <TeacherNavItem
                            icon={Search}
                            label="生徒カルテ検索"
                            href="/teacher/records"
                            active={pathname.includes('/teacher/records')}
                        />
                    </nav>

                    <div className="border-t border-emerald-50 pt-4 mt-auto space-y-2">
                        <TeacherNavItem icon={Settings} label="設定" href="/teacher/settings" active={pathname === '/teacher/settings'} />
                        <TeacherNavItem icon={User} label="プロフィール" href="/teacher/profile" active={pathname === '/teacher/profile'} />
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-sm text-slate-500 hover:bg-rose-50 hover:text-rose-600 w-full text-left"
                        >
                            <LogOut size={20} />
                            <span>ログアウト</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col items-stretch overflow-hidden">
                    {children}
                </div>
            </div>
        </AuthGuard>
    );
}

function TeacherNavItem({ icon: Icon, label, href, active = false }: { icon: any, label: string, href: string, active?: boolean }) {
    return (
        <Link href={href} className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm",
            active
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"
        )}>
            <Icon size={20} className={cn(active ? "text-white" : "text-slate-400")} />
            <span>{label}</span>
            {active && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>}
        </Link>
    );
}
