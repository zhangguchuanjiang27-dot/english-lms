'use client';

import { useState } from 'react';
import {
    Library,
    FileText,
    BookOpen,
    ArrowUpRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const GRADES_DATA = [
    {
        id: 'jhs1',
        label: '中1 英語',
        description: '英語の基礎となる重要な文法事項',
        topics: [
            { title: 'be動詞', pdfName: '1be動詞.pdf', status: 'ready' },
            { title: '一般動詞(現在形)', pdfName: '2一般動詞.pdf', status: 'ready' },
            { title: '疑問詞', pdfName: '3疑問詞.pdf', status: 'ready' },
            { title: '命令文', pdfName: '4命令文.pdf', status: 'ready' },
            { title: '代名詞', pdfName: '5代名詞.pdf', status: 'ready' },
            { title: '三人称単数現在', pdfName: '6三人称単数現在.pdf', status: 'ready' },
            { title: '現在進行形', pdfName: '7現在進行形.pdf', status: 'ready' },
            { title: '助動詞can', pdfName: '8助動詞can.pdf', status: 'ready' },
            { title: '一般動詞の過去形(規則)', pdfName: '9一般動詞の過去形(規則).pdf', status: 'ready' },
            { title: '一般動詞の過去形(不規則)', pdfName: '10一般動詞の過去系(不規則).pdf', status: 'ready' },
            { title: 'be動詞の過去形', pdfName: '11be動詞の過去形.pdf', status: 'ready' },
            { title: '過去進行形', pdfName: '12過去進行形.pdf', status: 'ready' },
        ]
    },
    {
        id: 'jhs2',
        label: '中2 英語',
        description: '表現の幅を広げる応用的な文法',
        topics: [
            { title: '未来の文 (will, be going to)', pdfName: '1未来形.pdf', status: 'ready' },
            { title: '助動詞 (must, may, have to)', pdfName: '2助動詞.pdf', status: 'ready' },
            { title: '接続詞 (when, if, because)', pdfName: '3接続詞.pdf', status: 'ready' },
            { title: '不定詞 (目的・原因・形容詞的)', pdfName: '4不定詞.pdf', status: 'ready' },
            { title: '動名詞 (〜すること)', pdfName: '5動名詞.pdf', status: 'ready' },
            { title: '特別な働きをする動詞 (SVOO等)', pdfName: '6特別な働きをする動詞.pdf', status: 'ready' },
            { title: '比較 (比較級・最上級)', pdfName: '7比較.pdf', status: 'ready' },
            { title: '受動態 (〜される)', pdfName: '8受動態.pdf', status: 'ready' },
        ]
    },
    {
        id: 'jhs3',
        label: '中3 英語',
        description: '高校入試にも直結する高度な文法',
        topics: [
            { title: '現在完了形', pdfName: 'jhs3_present_perfect.pdf', status: 'ready' },
            { title: '現在完了進行形', pdfName: 'jhs3_present_perfect_progressive.pdf', status: 'ready' },
            { title: '関係代名詞 (who, which, that)', pdfName: 'jhs3_relative_pronouns.pdf', status: 'ready' },
            { title: '間接疑問文', pdfName: 'jhs3_indirect_questions.pdf', status: 'ready' },
            { title: '分詞の形容詞的用法', pdfName: 'jhs3_participles.pdf', status: 'ready' },
            { title: '仮定法 (If I were...)', pdfName: 'jhs3_subjunctive.pdf', status: 'ready' },
        ]
    }
];

export default function StudentCoursesPage() {
    const [activeGrade, setActiveGrade] = useState('jhs1');

    const currentData = GRADES_DATA.find(g => g.id === activeGrade) || GRADES_DATA[0];

    return (
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-50 font-sans">
            <div className="max-w-5xl mx-auto space-y-10">

                {/* Header Section */}
                <div className="animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest">Digital Library</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <Library className="text-indigo-600" size={36} />
                        教材アーカイブ
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg font-medium">これまでの授業で使用したPDF資料をいつでも復習できます。</p>
                </div>

                {/* Grade Tabs */}
                <div className="flex p-1.5 bg-slate-200/50 rounded-2xl w-fit backdrop-blur-sm border border-slate-200/50 animate-in fade-in duration-1000">
                    {GRADES_DATA.map((grade) => (
                        <button
                            key={grade.id}
                            onClick={() => setActiveGrade(grade.id)}
                            className={cn(
                                "px-8 py-3 rounded-xl font-black text-sm transition-all duration-300 flex items-center gap-2",
                                activeGrade === grade.id
                                    ? "bg-white text-indigo-600 shadow-md transform scale-[1.02]"
                                    : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                            )}
                        >
                            <span className="whitespace-nowrap">{grade.label}</span>
                        </button>
                    ))}
                </div>

                {/* Grade Overview */}
                <div className="bg-indigo-600 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-200 animate-in zoom-in-95 duration-500">
                    <div className="relative z-10 space-y-4">
                        <h2 className="text-3xl font-black whitespace-nowrap break-keep">{currentData.label} の資料一覧</h2>
                        <p className="text-indigo-100 max-w-xl text-lg font-medium leading-relaxed">
                            {currentData.description}
                        </p>
                        <div className="pt-4 flex items-center gap-4 text-sm font-bold opacity-80">
                            <div className="flex items-center gap-2">
                                <FileText size={18} />
                                <span>{currentData.topics.length} 件の資料ファイル</span>
                            </div>
                        </div>
                    </div>
                    {/* Abstract Decor */}
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[80px]"></div>
                    <div className="absolute -bottom-20 -left-10 w-60 h-60 bg-indigo-400/20 rounded-full blur-[60px]"></div>
                </div>

                {/* PDF Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-8 duration-700">
                    {currentData.topics.map((topic, idx) => (
                        <button
                            key={idx}
                            onClick={() => window.open(`/materials/${topic.pdfName}`, '_blank')}
                            className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 text-left flex flex-col justify-between min-h-[160px] relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <div className="p-3 bg-slate-50 rounded-2xl w-fit text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 mb-4">
                                    <FileText size={24} />
                                </div>
                                <h4 className="text-lg font-bold text-slate-800 transition-colors duration-300 group-hover:text-indigo-600 leading-snug">
                                    {topic.title}
                                </h4>
                            </div>

                            <div className="relative z-10 flex items-center justify-between mt-4">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{topic.pdfName}</span>
                                <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                                    <span className="text-xs font-black">VIEW</span>
                                    <ArrowUpRight size={14} />
                                </div>
                            </div>

                            {/* Hover accent */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        </button>
                    ))}
                </div>


            </div>
        </main>
    );
}
