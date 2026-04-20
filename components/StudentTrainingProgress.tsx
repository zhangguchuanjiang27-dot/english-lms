'use client';

import { useState, useEffect } from 'react';
import { getStudentTrainingStats } from '@/lib/actions/teacher';
import { Trophy, CheckCircle2, Zap, Flame, Brain, BookOpen, Star, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import { GRAMMAR_CATEGORIES } from '@/lib/data/grammar';
import { VOCAB_QUESTIONS } from '@/lib/data/vocab';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Props {
    studentId: string;
}

export default function StudentTrainingProgress({ studentId }: Props) {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [expandedVocabLevel, setExpandedVocabLevel] = useState<string | null>(null);
    const [expandedGrammarLevel, setExpandedGrammarLevel] = useState<string | null>(null);
    const [expandedGrammarCategories, setExpandedGrammarCategories] = useState<Record<string, boolean>>({});

    const toggleGrammarCategory = (categoryId: string) => {
        setExpandedGrammarCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    useEffect(() => {
        getStudentTrainingStats(studentId).then(data => {
            setStats(data);
            setLoading(false);
        });
    }, [studentId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                <p className="text-xs font-bold text-slate-400">進捗データを読み込み中...</p>
            </div>
        );
    }

    if (!stats || !stats.student) return null;

    // Aggregating Vocab
    const vocabJHS1 = stats.vocab.filter((v: any) => v.level === 'jhs1').length;
    const vocabJHS2 = stats.vocab.filter((v: any) => v.level === 'jhs2').length;
    const vocabJHS3 = stats.vocab.filter((v: any) => v.level === 'jhs3').length;

    // Aggregating Grammar
    const grammarJHS1 = stats.grammar?.filter((g: any) => g.level?.startsWith('jhs1')).length || 0;
    const grammarJHS2 = stats.grammar?.filter((g: any) => g.level?.startsWith('jhs2')).length || 0;
    const grammarJHS3 = stats.grammar?.filter((g: any) => g.level?.startsWith('jhs3')).length || 0;

    // Aggregating Drills
    const drillProgress = stats.drills.length;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Engagement Stats Form */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-amber-50 rounded-2xl p-4 flex flex-col items-center justify-center border border-amber-100 shadow-sm relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 text-amber-500/10"><Trophy size={80} /></div>
                    <Trophy className="text-amber-500 mb-2 relative z-10" size={24} />
                    <p className="text-2xl font-black text-amber-700 relative z-10">Lv.{stats.student.questLevel}</p>
                    <p className="text-[10px] font-bold text-amber-600/70 uppercase tracking-widest relative z-10 mt-1">Current Level</p>
                </div>
                
                <div className="bg-indigo-50 rounded-2xl p-4 flex flex-col items-center justify-center border border-indigo-100 shadow-sm relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 text-indigo-500/10"><Zap size={80} /></div>
                    <Zap className="text-indigo-500 mb-2 relative z-10" size={24} />
                    <p className="text-2xl font-black text-indigo-700 relative z-10">{stats.student.questXP} <span className="text-xs font-bold opacity-70">XP</span></p>
                    <p className="text-[10px] font-bold text-indigo-600/70 uppercase tracking-widest relative z-10 mt-1">Total XP</p>
                </div>
                
                <div className="bg-rose-50 rounded-2xl p-4 flex flex-col items-center justify-center border border-rose-100 shadow-sm relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 text-rose-500/10"><Flame size={80} /></div>
                    <Flame className="text-rose-500 mb-2 relative z-10" size={24} />
                    <p className="text-2xl font-black text-rose-700 relative z-10">{stats.student.questStreak} <span className="text-xs font-bold opacity-70">日</span></p>
                    <p className="text-[10px] font-bold text-rose-600/70 uppercase tracking-widest relative z-10 mt-1">Login Streak</p>
                </div>
            </div>

            {/* Modules Grid */}
            <div className="space-y-6">
                {/* Vocab Section */}
                <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Brain className="text-indigo-500" size={18} />
                        <h4 className="font-black text-slate-800 text-sm">Flash Dash (単語学習) 完了数</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {['jhs1', 'jhs2', 'jhs3'].map((level) => {
                            const count = stats.vocab.filter((v: any) => v.level === level).length;
                            const isExpanded = expandedVocabLevel === level;
                            const title = level === 'jhs1' ? '【中1】' : level === 'jhs2' ? '【中2】' : '【中3】';

                            return (
                                <button
                                    key={level}
                                    onClick={() => setExpandedVocabLevel(isExpanded ? null : level)}
                                    className={cn(
                                        "p-3 rounded-xl text-center transition-all border",
                                        isExpanded ? "bg-indigo-50 border-indigo-200 shadow-sm" : "bg-slate-50 border-transparent hover:bg-slate-100"
                                    )}
                                >
                                    <p className="text-xs font-bold text-slate-500 mb-1">{title} セット</p>
                                    <p className="text-xl font-black text-indigo-600 mb-1">{count}</p>
                                    <div className="flex justify-center text-indigo-400">
                                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Expandable Vocab Details */}
                    {expandedVocabLevel && (
                        <div className="mt-4 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 animate-in slide-in-from-top-2 duration-300">
                            <h5 className="text-xs font-black text-indigo-700 uppercase tracking-widest leading-none mb-3">
                                {expandedVocabLevel === 'jhs1' ? '【中1】' : expandedVocabLevel === 'jhs2' ? '【中2】' : '【中3】'} の詳細な進捗
                            </h5>
                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {(() => {
                                    const QUESTIONS_PER_STAGE = 50;
                                    const list = (VOCAB_QUESTIONS as any)[expandedVocabLevel] || [];
                                    const totalStages = Math.ceil(list.length / QUESTIONS_PER_STAGE);
                                    
                                    return Array.from({ length: totalStages }).map((_, stageIndex) => {
                                        const playedData = stats.vocab.find((v: any) => v.level === expandedVocabLevel && v.stageIndex === stageIndex);
                                        const isPlayed = !!playedData;
                                        
                                        return (
                                            <div key={stageIndex} className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-2.5 rounded-lg border shadow-sm transition-all", isPlayed ? "bg-white border-indigo-100/50" : "bg-slate-50 border-dashed border-slate-200 opacity-70")}>
                                                <p className={cn("text-sm font-bold flex items-center gap-2", isPlayed ? "text-slate-700" : "text-slate-400")}>
                                                    STAGE {stageIndex + 1}
                                                    {!isPlayed && <span className="text-[10px] font-black bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded">未挑戦</span>}
                                                </p>
                                                {isPlayed ? (
                                                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                                                        <p className="text-xs font-medium text-slate-500">クリア {playedData.completions}回</p>
                                                        {playedData.perfectClears > 0 ? (
                                                            <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2.5 py-1 rounded-md text-xs font-bold border border-amber-100">
                                                                <Star size={12} className="fill-amber-500" />
                                                                Perfect {playedData.perfectClears}回
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-1 bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md text-xs font-bold border border-slate-200">
                                                                <Star size={12} />
                                                                Perfect 0回
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="text-xs font-medium text-slate-400 text-left sm:text-right">未プレイ</div>
                                                )}
                                            </div>
                                        );
                                    });
                                })()}
                            </div>
                        </div>
                    )}
                </div>

                {/* Grammar Section */}
                <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="text-emerald-500" size={18} />
                        <h4 className="font-black text-slate-800 text-sm">Sentence Builder (文法学習) 完了数</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {['jhs1', 'jhs2', 'jhs3'].map((level) => {
                            const count = stats.grammar.filter((g: any) => g.level?.startsWith(level)).length;
                            const isExpanded = expandedGrammarLevel === level;
                            const title = level === 'jhs1' ? '【中1】' : level === 'jhs2' ? '【中2】' : '【中3】';

                            return (
                                <button
                                    key={level}
                                    onClick={() => setExpandedGrammarLevel(isExpanded ? null : level)}
                                    className={cn(
                                        "p-3 rounded-xl text-center transition-all border",
                                        isExpanded ? "bg-emerald-50 border-emerald-200 shadow-sm" : "bg-slate-50 border-transparent hover:bg-slate-100"
                                    )}
                                >
                                    <p className="text-xs font-bold text-slate-500 mb-1">{title} 項目</p>
                                    <p className="text-xl font-black text-emerald-600 mb-1">{count}</p>
                                    <div className="flex justify-center text-emerald-400">
                                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Expandable Grammar Details */}
                    {expandedGrammarLevel && (
                        <div className="mt-4 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 animate-in slide-in-from-top-2 duration-300">
                            <h5 className="text-xs font-black text-emerald-700 uppercase tracking-widest leading-none mb-3">
                                {expandedGrammarLevel === 'jhs1' ? '【中1】' : expandedGrammarLevel === 'jhs2' ? '【中2】' : '【中3】'} の詳細なカテゴリ進捗
                            </h5>
                            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                                {(() => {
                                    const QUESTIONS_PER_STAGE = 10;
                                    const categories = GRAMMAR_CATEGORIES[expandedGrammarLevel] || [];
                                    
                                    return categories.map((category) => {
                                        const isCatExpanded = !!expandedGrammarCategories[category.id];
                                        const totalStagesForCategory = Math.ceil(category.questions.length / QUESTIONS_PER_STAGE);
                                        const categoryLevelKey = `${expandedGrammarLevel}_${category.id}`;
                                        
                                        // Calculate completions for the category header
                                        const categoryPlayedStats = stats.grammar.filter((g: any) => g.level === categoryLevelKey);
                                        const totalCompletionsCat = categoryPlayedStats.reduce((sum: number, part: any) => sum + part.completions, 0);
                                        
                                        return (
                                            <div key={category.id} className="bg-white rounded-xl border border-emerald-100/60 shadow-sm overflow-hidden transition-all">
                                                <button
                                                    onClick={() => toggleGrammarCategory(category.id)}
                                                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-emerald-50/50 transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={cn("p-1.5 rounded-lg transition-colors", isCatExpanded ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400")}>
                                                            {isCatExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-800">{category.title}</p>
                                                            <p className="text-[10px] font-bold text-slate-400">{totalStagesForCategory} Stages</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                                                        クリア全体 {totalCompletionsCat}回
                                                    </div>
                                                </button>
                                                
                                                {isCatExpanded && (
                                                    <div className="px-4 pb-4 pt-1 space-y-2 border-t border-emerald-50/50">
                                                        {Array.from({ length: totalStagesForCategory }).map((_, stageIndex) => {
                                                            const playedData = categoryPlayedStats.find((g: any) => g.stageIndex === stageIndex);
                                                            const isPlayed = !!playedData;
                                                            
                                                            return (
                                                                <div key={stageIndex} className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3 py-2 rounded-lg border", isPlayed ? "bg-white border-emerald-100/50 shadow-sm" : "bg-slate-50 border-dashed border-slate-200 opacity-70")}>
                                                                    <p className={cn("text-xs font-bold flex items-center gap-2", isPlayed ? "text-slate-700" : "text-slate-400")}>
                                                                        STAGE {stageIndex + 1}
                                                                        {!isPlayed && <span className="text-[9px] font-black bg-slate-200 text-slate-500 px-1 py-0.5 rounded">未挑戦</span>}
                                                                    </p>
                                                                    
                                                                    {isPlayed ? (
                                                                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                                                                            <p className="text-[11px] font-medium text-slate-500">クリア {playedData.completions}回</p>
                                                                            {playedData.perfectClears > 0 ? (
                                                                                <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-[11px] font-bold border border-amber-100">
                                                                                    <Star size={10} className="fill-amber-500" />
                                                                                    Perfect {playedData.perfectClears}回
                                                                                </div>
                                                                            ) : (
                                                                                <div className="flex items-center gap-1 bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[11px] font-bold border border-slate-200">
                                                                                    <Star size={10} /> Perfect 0回
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ) : (
                                                                        <div className="text-[11px] font-medium text-slate-400 text-left sm:text-right">未プレイ</div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    });
                                })()}
                            </div>
                        </div>
                    )}
                </div>

                {/* Drills Section */}
                <div className="bg-white border rounded-2xl p-5 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-sky-100 text-sky-600 rounded-xl">
                            <Zap size={20} />
                        </div>
                        <div>
                            <h4 className="font-black text-slate-800 text-sm">Skill Drills (動詞特訓) 完了数</h4>
                            <p className="text-xs text-slate-500 mt-1">不規則動詞の過去形・過去分詞形の特訓</p>
                        </div>
                    </div>
                    <div className="text-2xl font-black text-sky-600 pr-4">
                        {drillProgress} <span className="text-xs font-bold text-slate-400">項目</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
