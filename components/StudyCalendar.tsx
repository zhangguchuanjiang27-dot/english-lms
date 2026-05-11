'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Zap, Calendar as CalendarIcon } from 'lucide-react';
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

interface StudyCalendarProps {
    studentId: string;
}

export default function StudyCalendar({ studentId }: StudyCalendarProps) {
    const [data, setData] = useState<Record<string, DailyStats>>({});
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!studentId) return;
                const res = await fetch(`/api/student/study-logs?studentId=${studentId}`);
                if (res.ok) {
                    const text = await res.text();
                    if (!text) {
                        console.warn("Study logs API returned empty response");
                        setData({});
                        return;
                    }
                    const result = JSON.parse(text);
                    setData(result.dailyStats || {});
                } else {
                    console.error("Study logs API failed:", res.status, res.statusText);
                }
            } catch (err) {
                console.error("Failed to fetch study logs:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [studentId]);

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

    const getIntensityClass = (duration: number) => {
        if (duration === 0) return "bg-slate-900/40";
        if (duration < 300) return "bg-indigo-900/40 border-indigo-500/20"; // < 5min
        if (duration < 900) return "bg-indigo-700/50 border-indigo-400/40"; // < 15min
        if (duration < 1800) return "bg-indigo-500/60 border-indigo-300/60"; // < 30min
        return "bg-indigo-400 border-white/40"; // > 30min
    };

    const renderDays = () => {
        const cells = [];
        // Empty cells for previous month
        for (let i = 0; i < firstDay; i++) {
            cells.push(<div key={`empty-${i}`} className="aspect-square border border-slate-800/30 bg-slate-900/10" />);
        }

        // Days of current month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const stats = data[dateStr];
            const hasStudy = stats && stats.duration > 0;
            const isSelected = selectedDate === dateStr;
            
            cells.push(
                <button 
                    key={day} 
                    onClick={() => setSelectedDate(dateStr)}
                    className={cn(
                        "aspect-square border p-1 md:p-2 transition-all outline-none flex items-center justify-center relative",
                        isSelected ? "ring-2 ring-indigo-400 z-10 border-transparent shadow-[0_0_20px_rgba(129,140,248,0.4)]" : "border-slate-800/50",
                        getIntensityClass(stats?.duration || 0)
                    )}
                >
                    <span className={cn(
                        "text-xs md:text-base font-black transition-colors", 
                        hasStudy ? (stats.duration > 1800 ? "text-slate-900" : "text-white") : "text-slate-600"
                    )}>
                        {day}
                    </span>

                    {/* Simple activity indicator dot for mobile/desktop alike if not very intense */}
                    {hasStudy && stats.duration < 300 && !isSelected && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-400" />
                    )}
                </button>
            );
        }

        return cells;
    };

    if (loading) return <div className="h-96 flex items-center justify-center text-slate-500">読み込み中...</div>;

    const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    const selectedStats = data[selectedDate];

    return (
        <div className="w-full bg-slate-900 rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
            {/* Calendar Header */}
            <div className="p-6 md:p-8 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-900/40">
                        <CalendarIcon size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">STUDY CALENDAR</p>
                        <h3 className="text-xl md:text-2xl font-black text-white">
                            {year}年 {monthNames[month]}
                        </h3>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={prevMonth} className="p-3 hover:bg-slate-700 rounded-xl text-slate-400 transition-all active:scale-90">
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={nextMonth} className="p-3 hover:bg-slate-700 rounded-xl text-slate-400 transition-all active:scale-90">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row">
                {/* Left Side: Calendar Grid */}
                <div className="flex-1 border-r border-slate-800">
                    <div className="grid grid-cols-7 bg-slate-800/20 border-b border-slate-800">
                        {["日", "月", "火", "水", "木", "金", "土"].map(d => (
                            <div key={d} className="py-3 text-center text-[10px] md:text-xs font-black text-slate-500 tracking-widest">
                                {d}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7">
                        {renderDays()}
                    </div>
                </div>

                {/* Right Side: Selected Day Summary */}
                <div className="lg:w-72 bg-slate-800/20 p-8 flex flex-col gap-8">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest">Selected Date</div>
                        <h4 className="text-3xl font-black text-white">
                            {selectedDate.split('-')[1]}<span className="text-sm text-slate-500 mx-1">月</span>{selectedDate.split('-')[2]}<span className="text-sm text-slate-500 mx-1">日</span>
                        </h4>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                        <div className="bg-slate-800/40 rounded-3xl p-5 border border-slate-700/50 shadow-inner">
                            <div className="flex items-center gap-3 text-indigo-400 mb-3">
                                <div className="p-2 bg-indigo-500/20 rounded-lg">
                                    <Clock size={16} />
                                </div>
                                <span className="text-xs font-black uppercase tracking-wider">学習時間</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <p className="text-4xl font-black text-white">
                                    {selectedStats ? Math.floor(selectedStats.duration / 60) : 0}
                                </p>
                                <span className="text-sm font-bold text-slate-500">分</span>
                            </div>
                        </div>

                        <div className="bg-slate-800/40 rounded-3xl p-5 border border-slate-700/50 shadow-inner">
                            <div className="flex items-center gap-3 text-emerald-400 mb-3">
                                <div className="p-2 bg-emerald-500/20 rounded-lg">
                                    <Zap size={16} />
                                </div>
                                <span className="text-xs font-black uppercase tracking-wider">セッション</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <p className="text-4xl font-black text-white">
                                    {selectedStats ? selectedStats.count : 0}
                                </p>
                                <span className="text-sm font-bold text-slate-500">回</span>
                            </div>
                        </div>
                    </div>

                    {/* Monthly Summary in the same sidebar for desktop */}
                    <div className="mt-auto pt-8 border-t border-slate-800 hidden lg:block">
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Monthly Total</p>
                                <p className="text-2xl font-black text-indigo-400">
                                    {Math.floor(Object.entries(data).filter(([date]) => date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)).reduce((acc, [_, curr]) => acc + curr.duration, 0) / 60)} <span className="text-xs font-bold text-slate-600">min</span>
                                </p>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-emerald-400">
                                    {Object.entries(data).filter(([date]) => date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)).reduce((acc, [_, curr]) => acc + curr.count, 0)} <span className="text-xs font-bold text-slate-600">sessions</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Monthly Stats Footer */}
            <div className="lg:hidden p-6 bg-indigo-600/10 border-t border-slate-800 grid grid-cols-2 gap-4">
                <div className="text-center border-r border-slate-800/50">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">今月の合計</p>
                    <p className="text-xl font-black text-indigo-400">
                        {Math.floor(Object.entries(data).filter(([date]) => date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)).reduce((acc, [_, curr]) => acc + curr.duration, 0) / 60)} 分
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">総セッション</p>
                    <p className="text-xl font-black text-emerald-400">
                        {Object.entries(data).filter(([date]) => date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)).reduce((acc, [_, curr]) => acc + curr.count, 0)} 回
                    </p>
                </div>
            </div>
        </div>
    );
}
