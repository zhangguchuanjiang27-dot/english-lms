'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Lock,
    ChevronRight,
    ShieldCheck,
    GraduationCap,
    Presentation,
    CheckCircle2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

import { login as loginAction } from '@/lib/actions/auth';

export default function LoginPage() {
    const router = useRouter();
    const [role, setRole] = useState<'student' | 'admin' | 'teacher'>('student');
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

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

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-indigo-500/20">
            
            {/* Animated Background Elements (Lighter) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[120px]" 
                />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, -45, 0],
                        x: [0, -40, 0],
                        y: [0, 60, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[20%] -left-[10%] w-[70%] h-[70%] bg-blue-400/10 rounded-full blur-[140px]" 
                />
                <div className="absolute top-[20%] left-[5%] w-32 h-32 bg-purple-400/5 rounded-full blur-[80px]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-[460px] relative z-10"
            >
                {/* Brand Header */}
                <div className="flex flex-col items-center mb-12">
                    <motion.div 
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        className="w-20 h-20 rounded-[2rem] bg-indigo-600 flex items-center justify-center text-white font-black text-4xl shadow-[0_20px_50px_rgba(79,70,229,0.2)] mb-6 cursor-default border border-white/40"
                    >
                        V
                    </motion.div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight text-center">
                        Voca <span className="text-indigo-600">Online</span>
                    </h1>
                    <p className="text-slate-500 mt-3 text-sm font-semibold tracking-wide bg-white/60 px-5 py-2 rounded-full border border-slate-200/50 backdrop-blur-md shadow-sm">
                        語彙力から、世界が変わる。
                    </p>
                </div>

                {/* Main Auth Card (Light Glassmorphism) */}
                <div className="bg-white/80 backdrop-blur-2xl relative rounded-[2.5rem] border border-white overflow-hidden shadow-[0_32px_64px_-16px_rgba(15,23,42,0.1)]">
                    
                    {/* Integrated Role Switcher (Light) */}
                    <div className="flex p-1.5 bg-slate-50/50 border-b border-slate-100">
                        <RoleTab 
                            active={role === 'student'} 
                            onClick={() => setRole('student')} 
                            icon={<GraduationCap className="w-4 h-4" />}
                            label="生徒"
                            color="indigo"
                        />
                        <RoleTab 
                            active={role === 'teacher'} 
                            onClick={() => setRole('teacher')} 
                            icon={<Presentation className="w-4 h-4" />}
                            label="講師"
                            color="emerald"
                        />
                        <RoleTab 
                            active={role === 'admin'} 
                            onClick={() => setRole('admin')} 
                            icon={<ShieldCheck className="w-4 h-4" />}
                            label="管理者"
                            color="rose"
                        />
                    </div>

                    <form onSubmit={handleLogin} className="p-10 space-y-8">
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-xs font-bold text-rose-600 flex items-center gap-3"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-6">
                            <InputField 
                                label="ログイン ID"
                                icon={<User className="w-5 h-5" />}
                                type="text"
                                placeholder="IDを入力してください"
                                value={loginId}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginId(e.target.value)}
                                required
                            />

                            <InputField 
                                label="パスワード"
                                icon={<Lock className="w-5 h-5" />}
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4.5 relative group overflow-hidden bg-indigo-600 text-white rounded-2xl font-black shadow-[0_12px_24px_-8px_rgba(79,70,229,0.4)] hover:shadow-[0_20px_40px_-12px_rgba(79,70,229,0.5)] transition-all flex items-center justify-center gap-2"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            {isLoading ? (
                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>ログインする</span>
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </form>
                </div>

                <div className="mt-8 flex justify-center items-center gap-6">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500/40" />
                        Secure Session
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-200" />
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500/40" />
                        SSL Protected
                    </span>
                </div>
            </motion.div>
        </div>
    );
}

function RoleTab({ active, onClick, icon, label, color }: { 
    active: boolean, 
    onClick: () => void, 
    icon: React.ReactNode, 
    label: string,
    color: 'indigo' | 'emerald' | 'rose'
}) {
    const activeColors = {
        indigo: "text-indigo-600",
        emerald: "text-emerald-600",
        rose: "text-rose-600"
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                "flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-[13px] font-extrabold transition-all relative",
                active ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
            )}
        >
            {active && (
                <motion.div 
                    layoutId="active-tab"
                    className="absolute inset-0 bg-white shadow-sm border border-slate-200/50 rounded-2xl shadow-slate-200/50"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            <span className={cn("relative z-10 transition-colors", active ? activeColors[color] : "text-slate-300")}>
                {icon}
            </span>
            <span className="relative z-10">{label}</span>
        </button>
    );
}

function InputField({ label, icon, ...props }: any) {
    return (
        <div className="space-y-2.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 flex items-center gap-2">
                {label}
            </label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors duration-300">
                    {icon}
                </div>
                <input
                    {...props}
                    className="w-full pl-13 pr-5 py-4.5 rounded-2xl bg-slate-50/50 border border-slate-200 focus:border-indigo-500/50 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all text-[15px] font-semibold text-slate-900 placeholder:text-slate-300"
                />
            </div>
        </div>
    );
}
