'use client';

import {
    BookOpen,
    Calendar,
    LayoutDashboard,
    MessageCircle,
    User,
    Award,
    LogOut,
    Library,
    Swords
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import AuthGuard from '@/components/AuthGuard';
import MobileNav from '@/components/MobileNav';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const isTrainingMode = pathname.startsWith('/training/') && pathname !== '/training';

    const handleLogout = () => {
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_id');
        router.push('/login');
    };

    return (
        <AuthGuard allowedRoles={['student']}>
            <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
                {/* Sidebar - Desktop only */}
                <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col p-6 sticky top-0 h-screen">
                    <div className="flex items-center gap-3 px-2 mb-10">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
                            V
                        </div>
                        <span className="font-bold text-xl tracking-tight">Voca</span>
                    </div>

                    <nav className="flex flex-col gap-2 flex-1">
                        <StudentNavItem
                            icon={LayoutDashboard}
                            label="ダッシュボード"
                            href="/dashboard"
                            active={pathname === '/dashboard'}
                        />
                        <StudentNavItem
                            icon={Calendar}
                            label="スケジュール"
                            href="/schedule"
                            active={pathname === '/schedule'}
                        />
                        <StudentNavItem
                            icon={BookOpen}
                            label="学習カルテ"
                            href="/karte"
                            active={pathname === '/karte'}
                        />
                        <StudentNavItem
                            icon={MessageCircle}
                            label="メッセージ"
                            href="/messages"
                            active={pathname === '/messages'}
                        />
                        <StudentNavItem
                            icon={Award}
                            label="学習成績・記録"
                            href="/achievements"
                            active={pathname === '/achievements'}
                        />
                        <StudentNavItem
                            icon={Library}
                            label="教材・コース"
                            href="/courses"
                            active={pathname === '/courses'}
                        />
                        <StudentNavItem
                            icon={Swords}
                            label="クエスト"
                            href="/training"
                            active={pathname.startsWith('/training')}
                        />
                    </nav>

                    <div className="border-t border-slate-100 pt-4 mt-auto space-y-2">
                        <StudentNavItem icon={User} label="プロフィール" href="/profile" active={pathname === '/profile'} />
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
                <div className="flex-1 flex flex-col min-h-screen pb-20 md:pb-0 max-w-[100vw] overflow-x-hidden">
                    {/* Mobile Header */}
                    {!isTrainingMode && (
                        <header className="md:hidden bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center sticky top-0 z-40">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-100">
                                    V
                                </div>
                                <span className="font-bold text-lg tracking-tight text-slate-900">Voca</span>
                            </div>
                        </header>
                    )}

                    <main className="flex-1 overflow-x-hidden max-w-full">
                        {children}
                    </main>

                    {/* Bottom Nav for Mobile */}
                    {!isTrainingMode && <MobileNav />}
                </div>
            </div>
        </AuthGuard>
    );
}

function StudentNavItem({ icon: Icon, label, href, active = false }: { icon: React.ElementType, label: string, href: string, active?: boolean }) {
    return (
        <Link href={href} className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-sm",
            active
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        )}>
            <Icon size={20} />
            <span>{label}</span>
            {active && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>}
        </Link>
    );
}
