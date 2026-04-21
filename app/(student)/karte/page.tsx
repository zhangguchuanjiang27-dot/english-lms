'use client';

import {
    TrendingUp,
    Calendar,
    Search,
    FileText,
    PencilLine,
    BookOpen,
    Check,
    Zap,
    Star,
    BookMarked,
    Award,
    Activity,
    ChevronDown
} from 'lucide-react';
import { Student, LessonRecord, SchoolSettings } from '@/lib/data-store';
import { useEffect, useState } from 'react';
import { getStudentSchedule } from '@/lib/actions/student';
import { getStudentGrammarMastery } from '@/lib/actions/grammar';
import GrammarMasteryGrid from '@/components/GrammarMasteryGrid';
import StudentTrainingProgress from '@/components/StudentTrainingProgress';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const parseExpressions = (data: any) => {
    if (!data || (typeof data === 'string' && !data.trim())) {
        return [];
    }
    if (Array.isArray(data)) return data;
    try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed;
    } catch (e) {
        return [{ expression: String(data), meaning: '' }];
    }
    return [];
};

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
    const [settings, setSettings] = useState<SchoolSettings | null>(null);
    const [grammarMastery, setGrammarMastery] = useState<any[]>([]);
    const [isGrammarOpen, setIsGrammarOpen] = useState(false);
    const [isTrainingOpen, setIsTrainingOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const studentId = localStorage.getItem('user_id');
        if (!studentId) {
            window.location.href = '/login';
            return;
        }

        Promise.all([
            getStudentSchedule(studentId),
            getStudentGrammarMastery(studentId)
        ]).then(([scheduleData, masteryData]) => {
            if (scheduleData) {
                if (scheduleData.records) setRecords(scheduleData.records as any);
                if (scheduleData.settings) setSettings(scheduleData.settings as any);
            }
            if (masteryData) {
                setGrammarMastery(masteryData);
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
                        <StatLarge
                            label="学習時間"
                            value={(() => {
                                const duration = settings?.defaultCourseDuration || 80;
                                return records.length * duration;
                            })()}
                            unit="分"
                        />
                        <StatLarge label="指導講師" value={Array.from(new Set(records.map(r => r.teacher))).length} unit="名" />
                    </div>
                </div>

                {/* Grammar Mastery Toggle */}
                <div className="space-y-4">
                    <button
                        onClick={() => setIsGrammarOpen(!isGrammarOpen)}
                        className={cn(
                            "w-full bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all group flex items-center justify-between",
                            isGrammarOpen && "border-indigo-100 bg-indigo-50/20 shadow-indigo-100/20"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-sm",
                                isGrammarOpen ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-600"
                            )}>
                                <BookMarked size={24} />
                            </div>
                            <div className="text-left">
                                <h2 className="text-base md:text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                                    文法習得状況を確認する
                                    {!isGrammarOpen && (
                                        <span className="text-[10px] font-black bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full uppercase tracking-widest hidden sm:inline-block">Mastery Check</span>
                                    )}
                                </h2>
                                <p className="text-xs text-slate-500 font-medium mt-0.5">現在の中1〜中3レベルの文法項目と習得度を表示します</p>
                            </div>
                        </div>
                        <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-slate-50 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600",
                            isGrammarOpen && "rotate-180 bg-indigo-100 text-indigo-600"
                        )}>
                            <ChevronDown size={20} />
                        </div>
                    </button>

                    <AnimatePresence>
                        {isGrammarOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, y: -20 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="overflow-hidden"
                            >
                                <div className="space-y-6 pt-2 pb-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {['jhs1', 'jhs2', 'jhs3'].map((cat) => {
                                            const catPoints = grammarMastery.filter(p => p.category === cat);
                                            const masteryCount = catPoints.filter(p => p.status === 'DOUBLE_CIRCLE').length;
                                            const goodCount = catPoints.filter(p => p.status === 'CIRCLE').length;
                                            const total = catPoints.length;
                                            const percent = total > 0 ? Math.round(((masteryCount + goodCount * 0.5) / total) * 100) : 0;

                                            return (
                                                <div key={cat} className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <h5 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                                            <Award size={14} className="text-indigo-500" />
                                                            {cat === 'jhs1' ? '中学1年' : cat === 'jhs2' ? '中学2年' : '中学3年'}
                                                        </h5>
                                                        <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">{percent}%</span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-indigo-500 transition-all duration-1000"
                                                            style={{ width: `${percent}%` }}
                                                        />
                                                    </div>
                                                    <div className="flex justify-between text-[9px] font-bold text-slate-400">
                                                        <span className="flex items-center gap-1">
                                                            <Activity size={10} />
                                                            習得: {masteryCount + goodCount} / {total}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-slate-100 shadow-xl shadow-indigo-100/20 ring-1 ring-slate-200/50">
                                        <GrammarMasteryGrid
                                            studentId={localStorage.getItem('user_id') || ''}
                                            initialPoints={grammarMastery}
                                            isAdmin={false}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Training Progress Toggle */}
                <div className="space-y-4">
                    <button
                        onClick={() => setIsTrainingOpen(!isTrainingOpen)}
                        className={cn(
                            "w-full bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all group flex items-center justify-between",
                            isTrainingOpen && "border-amber-100 bg-amber-50/20 shadow-amber-100/20"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-sm",
                                isTrainingOpen ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-600"
                            )}>
                                <Zap size={24} />
                            </div>
                            <div className="text-left">
                                <h2 className="text-base md:text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                                    トレーニング記録を確認する
                                    {!isTrainingOpen && (
                                        <span className="text-[10px] font-black bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full uppercase tracking-widest hidden sm:inline-block">Training Records</span>
                                    )}
                                </h2>
                                <p className="text-xs text-slate-500 font-medium mt-0.5">Flash DashやSkill Drillsの進捗状況を表示します</p>
                            </div>
                        </div>
                        <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-slate-50 text-slate-400 group-hover:bg-amber-100 group-hover:text-amber-600",
                            isTrainingOpen && "rotate-180 bg-amber-100 text-amber-600"
                        )}>
                            <ChevronDown size={20} />
                        </div>
                    </button>

                    <AnimatePresence>
                        {isTrainingOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, y: -20 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="overflow-hidden"
                            >
                                <div className="pt-2 pb-6">
                                    <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-slate-100 shadow-xl shadow-amber-100/20 ring-1 ring-slate-200/50">
                                        <StudentTrainingProgress studentId={localStorage.getItem('user_id') || ''} />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
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

                                            <div className="space-y-4">
                                                <h3 className="text-base md:text-xl font-black text-slate-900 flex items-start gap-2">
                                                    <span className="leading-tight">{item.title}</span>
                                                </h3>

                                                <div className="space-y-3 mt-2">
                                                    <div className="flex items-center gap-2 text-emerald-700">
                                                        <div className="p-1.5 bg-emerald-100 rounded-lg shadow-sm shadow-emerald-200/50">
                                                            <BookOpen size={14} className="text-emerald-600" />
                                                        </div>
                                                        <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-emerald-800">本日の授業内容</h4>
                                                    </div>
                                                    <div className="p-5 rounded-2xl bg-white border border-emerald-100/60 shadow-sm relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 opacity-50 pointer-events-none"></div>
                                                        <p className="text-sm text-slate-700 leading-relaxed font-bold whitespace-pre-wrap break-words relative z-10">
                                                            {item.feedback}
                                                        </p>
                                                    </div>
                                                </div>

                                                {(item as any).importantExpressions && (
                                                    <div className="space-y-3 mt-4">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2 text-yellow-700">
                                                                <div className="p-1.5 bg-yellow-100 rounded-lg shadow-sm shadow-yellow-200/50">
                                                                    <Star size={14} className="text-yellow-600" />
                                                                </div>
                                                                <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-yellow-800">💡 本日の重要表現・単語</h4>
                                                            </div>
                                                            {(() => {
                                                                const expressions = parseExpressions((item as any).importantExpressions);
                                                                if (expressions.length === 0) return null;
                                                                const copyText = expressions
                                                                    .filter((e: any) => e.expression)
                                                                    .map((e: any) => e.expression)
                                                                    .join('\n');
                                                                return <CopyButton text={copyText} />;
                                                            })()}
                                                        </div>
                                                        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#fffbeb] to-[#fef3c7] border border-yellow-200 shadow-sm relative overflow-hidden group-hover:border-yellow-300 transition-colors">
                                                            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-200/30 rounded-bl-full -mr-8 -mt-8 opacity-50 pointer-events-none"></div>
                                                            <div className="space-y-3 relative z-10">
                                                                {parseExpressions((item as any).importantExpressions).map((exp: any, i: number) => (
                                                                    exp.expression ? (
                                                                        <div key={i} className="flex flex-col gap-1 border-b border-yellow-300/30 pb-3 last:border-0 last:pb-0">
                                                                            <span className="text-sm md:text-base font-black text-yellow-950 tracking-wide font-mono">
                                                                                {exp.expression}
                                                                            </span>
                                                                            {exp.meaning && (
                                                                                <span className="text-xs md:text-sm font-bold text-yellow-800/80 leading-relaxed">
                                                                                    {exp.meaning}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    ) : null
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
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
