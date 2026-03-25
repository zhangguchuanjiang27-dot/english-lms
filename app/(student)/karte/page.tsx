'use client';

import {
    TrendingUp,
    Calendar,
    Search,
    FileText,
    PencilLine,
    BookOpen,
    Check,
    Zap
} from 'lucide-react';
import { LessonRecord } from '@/lib/data-store';
import { useEffect, useState } from 'react';
import { getStudentSchedule } from '@/lib/actions/student';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    return (
        <button
            onClick={() => {
                if (text) {
                    navigator.clipboard.writeText(text);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                }
            }}
            className="text-[10px] font-black uppercase tracking-widest text-amber-700 bg-white hover:bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 shadow-sm active:scale-95 transition-all flex items-center gap-1"
        >
            {copied ? <Check size={12} className="text-emerald-600" /> : <FileText size={12} />}
            {copied ? 'Copied' : 'Copy'}
        </button>
    );
}

export default function StudentKartePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [records, setRecords] = useState<LessonRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const studentId = localStorage.getItem('user_id');
        if (!studentId) {
            window.location.href = '/login';
            return;
        }

        getStudentSchedule(studentId).then(data => {
            if (data && data.records) {
                setRecords(data.records as any);
            }
            setLoading(false);
        });
    }, []);

    if (loading) return null;

    const filteredRecords = records.filter(record =>
        record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.feedback.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="flex-1 p-4 md:p-10 overflow-x-hidden bg-slate-50 relative pb-24">
            <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">学習カルテ (Karte)</h1>
                    <p className="text-sm text-slate-500 mt-1">日々の成長記録と講師からのフィードバック</p>
                </div>

                {/* Summary View */}
                <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-center mb-6 md:mb-8">
                        <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                            <TrendingUp className="text-indigo-600" size={20} />
                            学習の要約
                        </h2>
                    </div>

                    <div className="grid grid-cols-3 divide-x divide-slate-100 text-center">
                        <StatLarge label="受講回数" value={records.length} unit="回" />
                        <StatLarge label="学習時間" value={records.length * 50 / 60 >= 1 ? (records.length * 50 / 60).toFixed(1) : (records.length * 50)} unit={records.length * 50 / 60 >= 1 ? "時間" : "分"} />
                        <StatLarge label="指導講師" value={Array.from(new Set(records.map(r => r.teacher))).length} unit="名" />
                    </div>
                </div>

                {/* History List */}
                <div className="space-y-4 md:space-y-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                        <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                            <FileText className="text-indigo-600" size={20} />
                            レポート履歴
                        </h2>
                        <div className="relative w-full md:w-auto">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="テーマを検索..."
                                className="w-full pl-9 pr-4 py-3 md:py-2 bg-white border border-slate-200 rounded-xl text-sm md:text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        <AnimatePresence>
                            {filteredRecords.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-200/60 shadow-sm hover:shadow-md transition-all group overflow-hidden"
                                >
                                    <div className="flex flex-col md:flex-row md:divide-x divide-slate-100">
                                        {/* Left Content: feedback & title */}
                                        <div className="flex-1 p-5 md:p-8 space-y-4 md:space-y-5 text-left bg-gradient-to-b from-white to-slate-50/30">
                                            {/* Top Metadata Row (Mobile-friendly) */}
                                            <div className="flex flex-wrap items-center gap-2 md:gap-3">
                                                <div className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl border border-slate-200/50">
                                                    <Calendar size={12} className="text-slate-500" />
                                                    <span className="text-[10px] md:text-xs font-black uppercase tracking-wider">{item.date.replace(/-/g, '/')}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl border border-indigo-100/50">
                                                    <div className="w-4 h-4 rounded-full bg-indigo-200 flex items-center justify-center text-[9px] font-black text-indigo-800">
                                                        {item.teacher[0]}
                                                    </div>
                                                    <span className="text-[10px] md:text-xs font-bold leading-none">{item.teacher} 先生</span>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-base md:text-xl font-black text-slate-900 mb-3 flex items-start gap-2">
                                                    <BookOpen size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                                                    <span className="leading-tight">{item.title}</span>
                                                </h3>
                                                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                                                    <p className="text-sm text-slate-600 leading-relaxed font-medium whitespace-pre-wrap break-words">
                                                        {item.feedback}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Content: homework & next scope */}
                                        <div className="md:w-[320px] bg-amber-50/50 flex flex-col relative overflow-hidden border-t md:border-t-0 border-amber-100/50">
                                            {/* Stylized background ornament */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/30 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-700 pointer-events-none z-0"></div>

                                            <div className="p-5 md:p-8 space-y-4 relative z-10 w-full text-left flex-1 border-b border-amber-100/40">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-blue-700">
                                                        <div className="p-1.5 bg-blue-100 rounded-lg shadow-sm shadow-blue-200/50">
                                                            <Zap size={14} className="text-blue-600" />
                                                        </div>
                                                        <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-800">次回の授業範囲</h4>
                                                    </div>
                                                </div>

                                                <div className="relative bg-[#f8fbff] p-5 rounded-2xl shadow-sm border border-blue-200/40 min-h-[80px] flex">
                                                    <p className="text-sm font-bold text-slate-700 leading-relaxed whitespace-pre-wrap break-words w-full">
                                                        {(item as any).nextScope || '未設定'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="p-5 md:p-8 space-y-4 relative z-10 w-full text-left bg-amber-50/80">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-amber-700">
                                                        <div className="p-1.5 bg-amber-100 rounded-lg shadow-sm shadow-amber-200/50">
                                                            <PencilLine size={14} className="text-amber-600" />
                                                        </div>
                                                        <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-amber-800">次回までの宿題</h4>
                                                    </div>
                                                    {item.homework && <CopyButton text={item.homework} />}
                                                </div>

                                                {/* Post-it Note Style */}
                                                <div className="relative bg-[#fffdf0] p-5 rounded-2xl rounded-tr-none shadow-md border border-amber-200/40 min-h-[100px] flex">
                                                    {/* Dog-ear fold */}
                                                    <div className="absolute top-0 right-0 border-t-[16px] border-r-[16px] border-t-amber-100 border-r-transparent rounded-bl shadow-sm w-0 h-0"></div>

                                                    <p className="text-sm font-bold text-slate-700 leading-relaxed whitespace-pre-wrap break-words w-full">
                                                        {item.homework || '特に指定はありません。復習をしっかり行いましょう！'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {filteredRecords.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="py-16 text-center bg-white border border-dashed border-slate-300 rounded-[2rem]"
                            >
                                <FileText size={40} className="mx-auto text-slate-300 mb-4" />
                                <p className="text-slate-500 font-bold text-sm">履歴が見つかりませんでした。</p>
                            </motion.div>
                        )}
                    </div>
                </div>

            </div>
        </main>
    );
}

function StatLarge({ label, value, unit }: any) {
    return (
        <div className="space-y-1.5 px-2 flex flex-col items-center justify-center">
            <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
            <p className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">
                {value}
                <span className="text-xs md:text-sm font-bold text-slate-400 ml-1 tracking-normal">{unit}</span>
            </p>
        </div>
    )
}
