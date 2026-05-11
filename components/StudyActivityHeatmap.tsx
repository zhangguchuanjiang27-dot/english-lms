'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, Zap, Calendar } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface DailyStats {
    duration: number;
    count: number;
    score: number;
}

interface StudyActivityHeatmapProps {
    studentId: string;
    theme?: 'light' | 'dark';
    limitDays?: number;
}

export default function StudyActivityHeatmap({ studentId, theme = 'light', limitDays = 84 }: StudyActivityHeatmapProps) {
    const isDark = theme === 'dark';
    const [data, setData] = useState<Record<string, DailyStats>>({});
    const [loading, setLoading] = useState(true);
    const [hoveredDay, setHoveredDay] = useState<{ date: string; stats: DailyStats } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/student/study-logs?studentId=${studentId}`);
                if (res.ok) {
                    const result = await res.json();
                    setData(result.dailyStats || {});
                }
            } catch (err) {
                console.error("Failed to fetch study logs", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [studentId]);

    // Generate last X days
    const generateDays = () => {
        const days = [];
        const today = new Date();
        for (let i = limitDays - 1; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            days.push(d.toISOString().split('T')[0]);
        }
        return days;
    };

    const days = generateDays();

    const getIntensity = (stats?: DailyStats) => {
        if (!stats) return 0;
        const totalMin = stats.duration / 60;
        if (totalMin > 60) return 4;
        if (totalMin > 30) return 3;
        if (totalMin > 10) return 2;
        if (totalMin > 0) return 1;
        return 0;
    };

    const getColorClass = (intensity: number) => {
        switch (intensity) {
            case 4: return isDark ? 'bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.4)]' : 'bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.4)]';
            case 3: return isDark ? 'bg-indigo-500' : 'bg-indigo-400';
            case 2: return isDark ? 'bg-indigo-600/60' : 'bg-indigo-300';
            case 1: return isDark ? 'bg-indigo-800' : 'bg-indigo-200';
            default: return isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200';
        }
    };

    if (loading) return (
        <div className={cn("w-full h-48 animate-pulse rounded-3xl flex items-center justify-center", isDark ? "bg-slate-800/50" : "bg-slate-50")}>
            <Activity className={isDark ? "text-slate-700" : "text-slate-200"} size={32} />
        </div>
    );

    const totalDuration = Object.values(data).reduce((acc, curr) => acc + curr.duration, 0);
    const totalSessions = Object.values(data).reduce((acc, curr) => acc + curr.count, 0);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={cn("rounded-2xl p-4 flex items-center gap-4 border", isDark ? "bg-slate-800/40 border-slate-700/50" : "bg-indigo-50/50 border-indigo-100/50")}>
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-900/20">
                        <Clock size={20} />
                    </div>
                    <div>
                        <p className={cn("text-[10px] font-black uppercase tracking-widest", isDark ? "text-indigo-400" : "text-indigo-400")}>Total Study Time</p>
                        <p className={cn("text-xl font-black", isDark ? "text-slate-100" : "text-slate-800")}>
                            {Math.floor(totalDuration / 60)} <span className="text-xs font-bold opacity-50">min</span>
                        </p>
                    </div>
                </div>
                <div className={cn("rounded-2xl p-4 flex items-center gap-4 border", isDark ? "bg-slate-800/40 border-slate-700/50" : "bg-emerald-50/50 border-emerald-100/50")}>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-900/20">
                        <Zap size={20} />
                    </div>
                    <div>
                        <p className={cn("text-[10px] font-black uppercase tracking-widest", isDark ? "text-emerald-400" : "text-emerald-400")}>Total Sessions</p>
                        <p className={cn("text-xl font-black", isDark ? "text-slate-100" : "text-slate-800")}>
                            {totalSessions} <span className="text-xs font-bold opacity-50">times</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className={cn("relative rounded-[2rem] p-6 md:p-8 border shadow-sm overflow-hidden", isDark ? "bg-slate-900/50 border-slate-700/50" : "bg-white border-slate-100")}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className={cn("text-sm font-black flex items-center gap-2", isDark ? "text-slate-200" : "text-slate-800")}>
                        <Calendar size={16} className="text-indigo-500" />
                        学習アクティビティ (Last {Math.floor(limitDays / 7)} Weeks)
                    </h3>
                    <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-500">Less</span>
                        <div className="flex gap-1">
                            <div className={cn("w-2.5 h-2.5 rounded-sm", isDark ? "bg-slate-800" : "bg-slate-100")}></div>
                            <div className={cn("w-2.5 h-2.5 rounded-sm", isDark ? "bg-indigo-900" : "bg-indigo-200")}></div>
                            <div className={cn("w-2.5 h-2.5 rounded-sm", isDark ? "bg-indigo-700" : "bg-indigo-300")}></div>
                            <div className={cn("w-2.5 h-2.5 rounded-sm", isDark ? "bg-indigo-500" : "bg-indigo-400")}></div>
                            <div className={cn("w-2.5 h-2.5 rounded-sm", isDark ? "bg-indigo-400" : "bg-indigo-600")}></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500">More</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                    {days.map((date) => {
                        const stats = data[date];
                        const intensity = getIntensity(stats);
                        return (
                            <motion.div
                                key={date}
                                whileHover={{ scale: 1.2, zIndex: 10 }}
                                onMouseEnter={() => stats && setHoveredDay({ date, stats })}
                                onMouseLeave={() => setHoveredDay(null)}
                                className={cn("w-3.5 h-3.5 md:w-4 md:h-4 rounded-sm transition-colors cursor-pointer", getColorClass(intensity))}
                            />
                        );
                    })}
                </div>

                {/* Tooltip */}
                <div className="mt-6 min-h-[40px] flex items-center justify-center md:justify-start">
                    {hoveredDay ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn("text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 border", isDark ? "text-slate-300 bg-slate-800 border-slate-700" : "text-slate-600 bg-slate-50 border-slate-100")}
                        >
                            <span className="text-indigo-400">{hoveredDay.date}</span>
                            <span className="opacity-30">•</span>
                            <span>{Math.round(hoveredDay.stats.duration / 60)} min study</span>
                            <span className="opacity-30">•</span>
                            <span>{hoveredDay.stats.count} sessions</span>
                        </motion.div>
                    ) : (
                        <p className="text-[10px] font-bold text-slate-500 italic">ブロックをホバーすると詳細が表示されます</p>
                    )}
                </div>
            </div>
            
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">
                ※ このデータは研究用データ収集に使用されます。毎日の学習時間を可視化することで、継続的な学習をサポートします。
            </p>
        </div>
    );
}
