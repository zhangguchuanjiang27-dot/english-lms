'use client';

import {
    TrendingUp,
    Calendar,
    Search,
    FileText,
    Download,
    Filter,
    MessageCircle,
    Star,
    ChevronRight,
    PencilLine,
    BookOpen
} from 'lucide-react';
import { LessonRecord } from '@/lib/data-store';
import { useEffect, useState } from 'react';
import { getStudentSchedule } from '@/lib/actions/student';

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
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-50">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">学習カルテ (Karte)</h1>
                        <p className="text-slate-500 mt-1">日々の成長記録と講師からのフィードバック</p>
                    </div>
                </div>

                {/* Summary View */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <TrendingUp className="text-indigo-600" size={24} />
                            学習の要約
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StatLarge label="受講レッスン数" value={records.length} unit="回" />
                        <StatLarge label="合計学習時間" value={records.length * 50 / 60 >= 1 ? (records.length * 50 / 60).toFixed(1) : (records.length * 50)} unit={records.length * 50 / 60 >= 1 ? "時間" : "分"} />
                        <StatLarge label="評価担当講師" value={Array.from(new Set(records.map(r => r.teacher))).length} unit="名" />
                    </div>
                </div>

                {/* History List */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <FileText className="text-indigo-600" size={24} />
                            レポート履歴
                        </h2>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="テーマを検索..."
                                    className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {filteredRecords.map((item: LessonRecord) => (
                            <div key={item.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden">
                                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-50">
                                    {/* Left Content: feedback & title */}
                                    <div className="flex-1 p-8 space-y-6 text-left">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full uppercase tracking-widest">{item.date}</span>
                                            <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full uppercase tracking-widest">Teacher: {item.teacher}</span>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2">
                                                <BookOpen size={20} className="text-emerald-500" />
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                                {item.feedback}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Content: homework */}
                                    <div className="md:w-80 bg-slate-50/50 p-8 flex flex-col justify-center">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-amber-600">
                                                <div className="p-1.5 bg-amber-100 rounded-lg">
                                                    <PencilLine size={16} />
                                                </div>
                                                <h4 className="text-xs font-black uppercase tracking-widest">次回までの宿題</h4>
                                            </div>
                                            <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-sm shadow-amber-600/5 min-h-[100px] flex items-center">
                                                <p className="text-sm font-bold text-slate-800 leading-relaxed text-left">
                                                    {item.homework || '特にありません。復習をしっかり行いましょう！'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {filteredRecords.length === 0 && (
                            <div className="py-20 text-center bg-white border border-dashed border-slate-200 rounded-[2rem]">
                                <FileText size={48} className="mx-auto text-slate-200 mb-4" />
                                <p className="text-slate-500 font-medium">履歴が見つかりませんでした。</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </main>
    );
}

function StatLarge({ label, value, unit }: any) {
    return (
        <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
            <p className="text-3xl font-black text-slate-900">
                {value}
                <span className="text-sm font-bold text-slate-400 ml-1">{unit}</span>
            </p>
        </div>
    )
}
