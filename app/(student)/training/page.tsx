'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Swords,
    Zap,
    Trophy,
    Flame,
    BookOpen,
    BrainCircuit,
    ArrowRight,
    Star
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { getLevelInfo } from '@/lib/quest-utils';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const getRankTitle = (level: number) => {
    if (level >= 50) return { title: 'Grand Master', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' };
    if (level >= 40) return { title: 'Legend', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' };
    if (level >= 30) return { title: 'Expert', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' };
    if (level >= 20) return { title: 'Veteran', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' };
    if (level >= 10) return { title: 'Apprentice', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };
    return { title: 'Novice', color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/30' };
};

export default function TrainingDashboardPage() {
    const router = useRouter();
    const [streak, setStreak] = useState(0);
    const [levelInfo, setLevelInfo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStudentInfo = async () => {
            const studentId = localStorage.getItem('user_id');
            if (studentId) {
                try {
                    const res = await fetch(`/api/student/profile?id=${studentId}`);
                    if (res.ok) {
                        const data = await res.json();
                        setStreak(data.questStreak || 0);
                        setLevelInfo(getLevelInfo(data.questXP || 0));
                    }
                } catch (error) {
                    console.error('Failed to load player stats', error);
                }
            }
            setIsLoading(false);
        };
        fetchStudentInfo();
    }, []);

    if (isLoading) {
        return (
            <main className="flex-1 p-6 md:p-10 bg-slate-900 font-sans min-h-screen text-slate-50 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin"></div>
            </main>
        );
    }

    return (
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-900 font-sans min-h-screen text-slate-50">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header Profile & Stats */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            <Swords className="text-amber-400" size={32} />
                            Language Quest
                        </h1>
                        <p className="text-slate-400 mt-2 text-sm font-medium">英語の世界を冒険し、経験値を稼いでレベルアップしよう！</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full md:w-auto">
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 flex items-center gap-4 shadow-lg shrink-0">
                            <div className="p-3 bg-rose-500/20 text-rose-400 rounded-xl">
                                <Flame size={24} className="animate-pulse" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">連続学習</p>
                                <p className="text-xl font-black text-rose-100">{streak} Days</p>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 flex items-center gap-5 shadow-lg flex-1 md:min-w-[340px]">
                            <div className="relative flex-shrink-0">
                                {/* Premium Level Badge */}
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl rotate-3 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)] relative group-hover:rotate-6 transition-transform">
                                    <div className="absolute inset-0.5 bg-slate-900 rounded-[14px]"></div>
                                    <div className="relative z-10 flex flex-col items-center">
                                        <span className="text-[9px] md:text-[10px] font-black text-indigo-300 leading-none">LV.</span>
                                        <span className="text-xl md:text-2xl font-black text-white leading-none">{levelInfo?.level || 1}</span>
                                    </div>
                                    {/* Decorative glow */}
                                    <div className="absolute -inset-1 bg-indigo-500/20 blur-md rounded-2xl -z-10"></div>
                                </div>
                                <Star size={14} className="absolute -bottom-1 -right-1 text-amber-400 fill-amber-400 drop-shadow-md md:size-4" />
                            </div>

                            <div className="flex-1 space-y-1.5 md:space-y-2">
                                <div className="flex justify-between items-center">
                                    {/* Rank Title */}
                                    {levelInfo && (
                                        <div className={cn("px-2 py-0.5 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest border", getRankTitle(levelInfo.level).bg, getRankTitle(levelInfo.level).color, getRankTitle(levelInfo.level).border)}>
                                            {getRankTitle(levelInfo.level).title}
                                        </div>
                                    )}
                                    <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest ml-auto">XP Progress</p>
                                </div>

                                <div className="h-2 md:h-2.5 w-full bg-slate-750/50 rounded-full overflow-hidden border border-slate-700/30 p-[1px]">
                                    <div
                                        className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${levelInfo?.progress || 0}%` }}
                                    ></div>
                                </div>

                                <div className="flex justify-between text-[9px] md:text-[10px] font-bold">
                                    <span className="text-emerald-400">{levelInfo?.xpInLevel || 0} <span className="text-slate-500">XP</span></span>
                                    <span className="text-slate-500">{levelInfo?.xpRequired || 1000} <span className="opacity-50 text-[8px] md:text-[9px]">to next</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quests */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {/* Vocab Quest */}
                    <Link href="/training/vocab" className="group relative block overflow-hidden rounded-[2.5rem] bg-indigo-600 p-8 shadow-2xl transition-transform hover:-translate-y-2">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/20 to-indigo-900/80 mix-blend-overlay"></div>
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-400/30 rounded-full blur-[80px] group-hover:bg-indigo-300/40 transition-all duration-500"></div>

                        <div className="relative z-10 flex flex-col h-full justify-between min-h-[250px]">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 bg-indigo-900/50 border border-indigo-400/30 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-indigo-200 backdrop-blur-md">
                                    <Zap size={14} className="text-indigo-300" />
                                    Vocab Quest
                                </div>
                                <h2 className="text-3xl font-black text-white">Flash Dash</h2>
                                <p className="text-indigo-200 text-sm font-medium max-w-[80%]">
                                    次々と現れるモンスター（英単語）を4択魔法で撃破せよ。連続コンボでスコアが跳ね上がるサバイバルモード！
                                </p>
                            </div>

                            <div className="mt-8 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-black text-indigo-50">中1</span>
                                    <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-black text-indigo-50">中2</span>
                                    <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-black text-indigo-50">中3</span>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                                    <ArrowRight size={24} />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Grammar Quest */}
                    <Link href="/training/grammar" className="group relative block overflow-hidden rounded-[2.5rem] bg-amber-500 p-8 shadow-2xl transition-transform hover:-translate-y-2">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-400/20 to-amber-700/80 mix-blend-overlay"></div>
                        <div className="absolute -bottom-24 -right-10 w-56 h-56 bg-amber-300/40 rounded-full blur-[60px] group-hover:bg-amber-200/50 transition-all duration-500"></div>

                        <div className="relative z-10 flex flex-col h-full justify-between min-h-[250px]">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 bg-amber-900/40 border border-amber-300/30 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-amber-100 backdrop-blur-md">
                                    <BrainCircuit size={14} className="text-amber-200" />
                                    Grammar Quest
                                </div>
                                <h2 className="text-3xl font-black text-white">Sentence Builder</h2>
                                <p className="text-amber-100 text-sm font-medium max-w-[80%]">
                                    散らばった単語ブロックを正しい順番に組み上げて、文法の呪文を完成させよう。直感的なドラッグ＆ドロップ！
                                </p>
                            </div>

                            <div className="mt-8 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-black text-amber-50">中1</span>
                                    <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-black text-amber-50">中2</span>
                                    <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-black text-amber-50">中3</span>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-amber-600 transition-colors">
                                    <ArrowRight size={24} />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Reading Quest (Coming Soon) */}
                    <div className="group relative block overflow-hidden rounded-[2.5rem] bg-slate-800 p-8 shadow-inner border border-slate-700 opacity-60">
                        <div className="relative z-10 flex flex-col h-full justify-between min-h-[150px]">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 bg-slate-700/50 border border-slate-600 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-slate-400">
                                    <BookOpen size={14} />
                                    Reading Quest
                                </div>
                                <h2 className="text-2xl font-black text-slate-500">Context Detective</h2>
                                <p className="text-slate-500 text-sm font-medium">
                                    長文の謎を解き明かす探偵モード。アップデートで追加予定！
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
