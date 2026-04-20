'use client';

import { useState, useEffect } from 'react';
import { Search as SearchIcon, User, Calendar, BookOpen, Clock, ChevronDown, ChevronUp, History, TrendingUp, AlertCircle, FileText, MessageSquare, Star, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { searchAllStudents, getAllStudentRecords } from '@/lib/actions/teacher';
import { getStudentGrammarMastery } from '@/lib/actions/grammar';
import { Student, LessonRecord } from '@/prisma/generated-client';
import GrammarMasteryGrid from '@/components/GrammarMasteryGrid';
import StudentTrainingProgress from '@/components/StudentTrainingProgress';

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

export default function StudentRecordsSearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [studentRecords, setStudentRecords] = useState<LessonRecord[]>([]);
    const [isLoadingRecords, setIsLoadingRecords] = useState(false);
    const [expandedRecordId, setExpandedRecordId] = useState<string | null>(null);

    // Progress Modal States
    const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
    const [progressTab, setProgressTab] = useState<'mastery' | 'training'>('mastery');
    const [isLoadingMastery, setIsLoadingMastery] = useState(false);
    const [grammarMastery, setGrammarMastery] = useState<any[]>([]);

    useEffect(() => {
        // Load initial students when component mounts
        searchAllStudents('').then((results) => {
            setSearchResults(results as any);
        });
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setIsSearching(true);
        setSelectedStudent(null);
        setStudentRecords([]);
        
        const results = await searchAllStudents(searchQuery);
        setSearchResults(results as any);
        setIsSearching(false);
    };

    const handleSelectStudent = async (student: Student) => {
        setSelectedStudent(student);
        setIsLoadingRecords(true);
        const records = await getAllStudentRecords(student.id);
        setStudentRecords(records as any);
        setIsLoadingRecords(false);
        // Expand the most recent record by default
        if (records.length > 0) {
            setExpandedRecordId((records as any)[0].id);
        }
    };

    const toggleRecord = (id: string) => {
        setExpandedRecordId(prev => prev === id ? null : id);
    };

    const openProgressModal = async (tab: 'mastery' | 'training' = 'mastery') => {
        if (!selectedStudent) return;
        setIsProgressModalOpen(true);
        setProgressTab(tab);
        setIsLoadingMastery(true);
        try {
            const mastery = await getStudentGrammarMastery(selectedStudent.id);
            setGrammarMastery(mastery);
        } catch (error) {
            console.error('Error fetching grammar mastery:', error);
            setGrammarMastery([]);
        } finally {
            setIsLoadingMastery(false);
        }
    };

    return (
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-8">
                
                <header className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-8">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                            <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl shadow-sm">
                                <SearchIcon size={24} />
                            </div>
                            生徒カルテ検索
                        </h1>
                        <p className="text-sm font-medium text-slate-500 mt-2">
                            生徒名やメールアドレスで検索し、過去のすべてのカルテ履歴を確認できます。
                        </p>
                    </div>
                </header>

                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm overflow-hidden">
                    <form onSubmit={handleSearch} className="relative flex items-center gap-3">
                        <div className="relative flex-1">
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="生徒名、メールアドレス、コースで検索..."
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-base transition-all text-slate-900 font-bold"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSearching}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed hidden sm:block"
                        >
                            {isSearching ? '検索中...' : '検索する'}
                        </button>
                    </form>

                    {!selectedStudent && searchResults.length > 0 && (
                        <div className="mt-8 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest pl-2 mb-4">
                                {searchQuery.trim() ? `検索結果 (${searchResults.length}件)` : `登録生徒一覧 (${searchResults.length}件)`}
                            </h3>
                            {searchResults.map((student) => (
                                <button
                                    key={student.id}
                                    onClick={() => handleSelectStudent(student)}
                                    className="w-full text-left bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-5 transition-all hover:shadow-md flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg font-black shadow-sm group-hover:scale-105 transition-transform">
                                            {student.name[0]?.[0]}
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-800 text-lg group-hover:text-indigo-700 transition-colors">{student.name}</p>
                                            <p className="text-xs font-bold text-slate-500 flex items-center gap-2 mt-1">
                                                <BookOpen size={12} /> {student.course}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right hidden sm:block">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">最終受講日</p>
                                        <p className="text-sm font-bold text-slate-700">{student.lastLesson || '未受講'}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {!selectedStudent && searchResults.length === 0 && searchQuery && !isSearching && (
                        <div className="mt-8 py-16 text-center border-2 border-dashed border-slate-100 rounded-2xl">
                            <User size={48} className="mx-auto text-slate-200 mb-4" />
                            <p className="text-slate-500 font-bold">「{searchQuery}」に一致する生徒は見つかりませんでした。</p>
                        </div>
                    )}
                </div>

                {selectedStudent && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setSelectedStudent(null)}
                                    className="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors"
                                >
                                    ← 検索結果に戻る
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white flex items-center justify-center text-3xl font-black shadow-lg shadow-indigo-500/20 shrink-0">
                                {selectedStudent.name[0]?.[0]}
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-black text-slate-800">{selectedStudent.name}</h2>
                                <div className="flex flex-wrap gap-3 mt-3">
                                    <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-slate-200">
                                        <BookOpen size={14} /> {selectedStudent.course}
                                    </span>
                                    <span className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-emerald-100/50">
                                        <TrendingUp size={14} /> レベル {selectedStudent.level}
                                    </span>
                                    <span className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-blue-100/50">
                                        <History size={14} /> 総受講回数: {selectedStudent.totalLessons}回
                                    </span>
                                    <button
                                        onClick={() => openProgressModal('mastery')}
                                        className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-indigo-100 hover:bg-indigo-100 transition-colors ml-auto sm:ml-0 md:ml-auto"
                                    >
                                        <BookOpen size={14} /> 学習進捗・カルテを表示
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 px-2">
                                <FileText className="text-indigo-500" size={20} />
                                カルテ履歴
                            </h3>
                            
                            {isLoadingRecords ? (
                                <div className="py-12 text-center text-slate-400 font-bold animate-pulse">
                                    履歴を読み込み中...
                                </div>
                            ) : studentRecords.length > 0 ? (
                                <div className="space-y-4">
                                    {studentRecords.map((record) => {
                                        const isExpanded = expandedRecordId === record.id;
                                        
                                        return (
                                            <div key={record.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-sm">
                                                <button 
                                                    onClick={() => toggleRecord(record.id)}
                                                    className={cn(
                                                        "w-full px-6 py-5 flex items-center justify-between text-left transition-colors",
                                                        isExpanded ? "bg-slate-50 border-b border-slate-100" : "hover:bg-slate-50"
                                                    )}
                                                >
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                                                        <div className="flex items-center gap-3 w-40 shrink-0">
                                                            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex flex-col items-center justify-center">
                                                                <span className="text-[10px] font-black uppercase leading-none mb-0.5">{new Date(record.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                                                                <span className="text-sm font-black leading-none">{new Date(record.date).getDate()}</span>
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(record.date).getFullYear()}</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-base font-black text-slate-800">{record.title}</h4>
                                                            <p className="text-xs font-bold text-slate-500 mt-1 flex items-center gap-2">
                                                                <User size={12} /> 担当: {record.teacher}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-indigo-400 bg-indigo-50 p-2 rounded-full hidden sm:block">
                                                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                                    </div>
                                                </button>
                                                
                                                {isExpanded && (
                                                    <div className="p-6 md:p-8 space-y-6 animate-in slide-in-from-top-2 duration-300">
                                                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative pt-7">
                                                            <div className="absolute -top-3 left-6 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                                                <MessageSquare size={12} /> Feedback
                                                            </div>
                                                            <p className="text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">{record.feedback}</p>
                                                        </div>

                                                        {(record as any).nextScope && (
                                                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 relative pt-7">
                                                                <div className="absolute -top-3 left-6 bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                                                    <BookOpen size={12} /> Next Scope
                                                                </div>
                                                                <p className="text-sm text-blue-900 leading-relaxed font-bold whitespace-pre-wrap">{(record as any).nextScope}</p>
                                                            </div>
                                                        )}

                                                        {(record as any).importantExpressions && (
                                                            <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200 relative pt-7">
                                                                <div className="absolute -top-3 left-6 bg-yellow-200 text-yellow-800 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                                                    <Star size={12} /> 本日の重要表現・単語
                                                                </div>
                                                                <div className="mt-4 space-y-2">
                                                                    {(() => {
                                                                        const exps = parseExpressions((record as any).importantExpressions);
                                                                        return exps.map((exp: any, i: number) => (
                                                                            exp.expression ? (
                                                                                <div key={i} className="text-sm flex flex-col gap-0.5 border-b border-yellow-200/50 pb-2 last:border-0 last:pb-0">
                                                                                    <span className="font-bold text-yellow-900">{exp.expression}</span>
                                                                                    {exp.meaning && <span className="opacity-80 text-yellow-800 leading-relaxed text-xs">{exp.meaning}</span>}
                                                                                </div>
                                                                            ) : null
                                                                        ));
                                                                    })()}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {record.homework && (
                                                            <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 relative pt-7">
                                                                <div className="absolute -top-3 left-6 bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                                                    <BookOpen size={12} /> Homework
                                                                </div>
                                                                <p className="text-sm text-amber-900 leading-relaxed font-bold whitespace-pre-wrap">{record.homework}</p>
                                                            </div>
                                                        )}

                                                        {record.internalNote && (
                                                            <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 relative pt-7">
                                                                <div className="absolute -top-3 left-6 bg-slate-200 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                                                    <AlertCircle size={12} /> 講師間引き継ぎ事項 (非公開)
                                                                </div>
                                                                <p className="text-sm text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">{record.internalNote}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
                                    <History size={48} className="mx-auto text-slate-300 mb-4" />
                                    <p className="text-slate-500 font-bold">この生徒の過去の受講記録はありません。</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>

            {/* Student Progress Modal */}
            {isProgressModalOpen && selectedStudent && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsProgressModalOpen(false)}></div>
                    <div className="relative bg-white rounded-[2.5rem] w-full max-w-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                        <div className="px-8 py-6 border-b border-slate-100 bg-emerald-50 text-emerald-900 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-xl font-black text-emerald-600 border border-emerald-100">
                                    {selectedStudent.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-black mb-0.5 text-left">{selectedStudent.name}</h3>
                                    <p className="text-xs font-bold text-emerald-700 tracking-wide flex items-center gap-2">
                                        <span className="opacity-60">COURSE:</span> {selectedStudent.course}
                                        <span className="w-1 h-1 bg-emerald-300 rounded-full"></span>
                                        <span className="opacity-60">TARGET:</span> {selectedStudent.target || '未設定'}
                                    </p>
                                </div>
                            </div>
                            <button type="button" onClick={() => setIsProgressModalOpen(false)} className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/30">
                            <div className="flex justify-center mb-8">
                                <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-2 w-full max-w-sm relative z-10">
                                    <button
                                        type="button"
                                        onClick={() => setProgressTab('mastery')}
                                        className={cn(
                                            "flex-1 py-2.5 rounded-xl text-sm font-black transition-all",
                                            progressTab === 'mastery' ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                        )}
                                    >
                                        文法カルテ
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setProgressTab('training')}
                                        className={cn(
                                            "flex-1 py-2.5 rounded-xl text-sm font-black transition-all",
                                            progressTab === 'training' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                        )}
                                    >
                                        自己学習・進捗
                                    </button>
                                </div>
                            </div>
                            
                            {progressTab === 'mastery' ? (
                                <div className="space-y-8 animate-in fade-in duration-500">
                                    <div className="space-y-4 text-center">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest leading-none">
                                            <BookOpen size={14} /> Grammar Mastery
                                        </div>
                                        <h4 className="text-2xl font-black text-slate-800 tracking-tight text-center">文法習得状況の一覧</h4>
                                        <p className="text-sm text-slate-500 font-medium max-w-lg mx-auto text-center">
                                            各文法項目の理解度を ◎（習得済）、◯（概ねOK）、△（要復習）の3段階で記録・確認できます。
                                        </p>
                                    </div>

                                    <div className="bg-white rounded-[2rem] p-6 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 right-0 h-2 bg-emerald-500"></div>
                                        {isLoadingMastery ? (
                                            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                                                <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                                                <p className="text-sm font-bold text-slate-400">習得状況を読み込み中...</p>
                                            </div>
                                        ) : (
                                            <GrammarMasteryGrid 
                                                studentId={selectedStudent.id} 
                                                initialPoints={grammarMastery} 
                                                isAdmin={true} 
                                            />
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="max-w-3xl mx-auto">
                                    <StudentTrainingProgress studentId={selectedStudent.id} />
                                </div>
                            )}
                        </div>

                        <div className="px-8 py-6 border-t border-slate-100 bg-white flex justify-center shrink-0">
                            <button
                                type="button"
                                onClick={() => setIsProgressModalOpen(false)}
                                className="px-10 py-3 text-sm font-black text-white bg-slate-800 hover:bg-slate-900 rounded-2xl shadow-lg shadow-slate-900/20 transition-all active:scale-95 flex items-center gap-2"
                            >
                                閉じる
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
