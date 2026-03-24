'use client';

import {
    Users,
    Calendar,
    LayoutGrid,
    LogOut,
    MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';

export default function AdminLayout({
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
        <AuthGuard allowedRoles={['admin']}>
            <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
                {/* Shared Admin Sidebar */}
                <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex shrink-0">
                    <div className="h-16 flex items-center px-6 border-b border-slate-800">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold mr-3">
                            V
                        </div>
                        <span className="font-bold text-white tracking-wide">Admin Portal</span>
                    </div>

                    <nav className="flex-1 py-6 px-3 space-y-1">
                        <AdminNavItem
                            icon={LayoutGrid}
                            label="概要 (Overview)"
                            href="/admin"
                            active={pathname === '/admin'}
                        />
                        <AdminNavItem
                            icon={Users}
                            label="生徒管理"
                            href="/admin/students"
                            active={pathname.startsWith('/admin/students')}
                        />
                        <AdminNavItem
                            icon={Users}
                            label="講師管理"
                            href="/admin/teachers"
                            active={pathname.startsWith('/admin/teachers')}
                        />
                        <AdminNavItem
                            icon={Calendar}
                            label="授業スケジュール"
                            href="/admin/schedule"
                            active={pathname === '/admin/schedule'}
                        />
                        <AdminNavItem
                            icon={MessageSquare}
                            label="メッセージ"
                            href="/admin/messages"
                            active={pathname === '/admin/messages'}
                        />
                    </nav>

                    <div className="p-4 border-t border-slate-800">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm"
                        >
                            <LogOut size={18} />
                            <span>ログアウト</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {children}
                </div>
            </div>
        </AuthGuard>
    );
}

function AdminNavItem({ icon: Icon, label, href, active }: { icon: any, label: string, href: string, active: boolean }) {
    return (
        <Link
            href={href}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
        >
            <Icon size={18} />
            <span>{label}</span>
            {active && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>}
        </Link>
    );
}
