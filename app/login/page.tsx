'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    User,
    Lock,
    ChevronRight,
    ShieldCheck,
    GraduationCap,
    Presentation
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

import { DataStore } from '@/lib/data-store';
import { login as loginAction } from '@/lib/actions/auth';

export default function LoginPage() {
    const router = useRouter();
    const [role, setRole] = useState<'student' | 'admin' | 'teacher'>('student');
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Call Server Action
        loginAction(role, loginId, password).then((res) => {
            if (res.success && res.user) {
                localStorage.setItem('user_name', res.user.name);
                localStorage.setItem('user_id', res.user.id);
                localStorage.setItem('user_role', res.user.role);

                if (res.user.role === 'admin') {
                    router.push('/admin');
                } else if (res.user.role === 'teacher') {
                    router.push('/teacher');
                } else {
                    router.push('/dashboard');
                }
            } else {
                setError(res.error || 'ログインに失敗しました');
                setIsLoading(false);
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden font-sans">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-10"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-400 rounded-full blur-[120px] opacity-10"></div>

            <div className="w-full max-w-[440px] relative z-10">
                {/* Brand Logo */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-3xl shadow-xl shadow-indigo-200 mb-4 transform hover:rotate-6 transition-transform">
                        V
                    </div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Vocaオンライン英語塾</h1>
                    <p className="text-slate-500 mt-2 text-sm font-medium">語彙力から始める、確かな英語力。</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">

                    {/* Role Switcher */}
                    <div className="flex p-2 bg-slate-50 border-b border-slate-100">
                        <button
                            onClick={() => setRole('student')}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[11px] sm:text-xs md:text-sm font-bold transition-all",
                                role === 'student' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <GraduationCap size={16} />
                            生徒
                        </button>
                        <button
                            onClick={() => setRole('teacher')}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[11px] sm:text-xs md:text-sm font-bold transition-all",
                                role === 'teacher' ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <Presentation size={16} />
                            講師
                        </button>
                        <button
                            onClick={() => setRole('admin')}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[11px] sm:text-xs md:text-sm font-bold transition-all",
                                role === 'admin' ? "bg-white text-rose-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <ShieldCheck size={16} />
                            管理者
                        </button>
                    </div>

                    <form onSubmit={handleLogin} className="p-8 md:p-10 space-y-6">
                        <div className="space-y-4">
                            {error && (
                                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-xs font-bold text-rose-600 animate-in fade-in slide-in-from-top-2">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">ログイン ID</label>
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                        Demo: {role === 'admin' ? 'admin' : role === 'teacher' ? 'sarah' : 'karat'}
                                    </span>
                                </div>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                    <input
                                        type="text"
                                        placeholder="ログインIDを入力"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-medium text-slate-900"
                                        value={loginId}
                                        onChange={(e) => setLoginId(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">パスワード</label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                            {role === 'admin' ? 'Demo: admin' : 'Demo: password123'}
                                        </span>
                                        <button type="button" className="text-[10px] font-bold text-indigo-600 hover:underline px-2">パスワードを忘れた?</button>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-medium text-slate-900"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-2xl font-black shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    ログイン
                                    <ChevronRight size={20} />
                                </>
                            )}
                        </button>

                        <p className="text-center text-[11px] text-slate-400 leading-relaxed px-4">
                            ログインすることで、利用規約およびプライバシーポリシーに同意したものとみなされます。
                        </p>
                    </form>
                </div>

                {/* Support Section */}
                <div className="mt-8 text-center space-y-4">
                    <p className="text-sm text-slate-500">
                        アカウントをお持ちでないですか?
                        <button className="text-indigo-600 font-bold hover:underline ml-2">無料体験に申し込む</button>
                    </p>
                </div>
            </div>
        </div>
    );
}
