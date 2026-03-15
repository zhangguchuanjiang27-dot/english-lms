'use client';

import {
    ArrowLeft,
    Save,
    Send,
    MessageSquare,
    Star,
    BookOpen,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { LessonRecord } from '@/lib/data-store';
import { getStudentDetail, addLessonRecord } from '@/lib/actions/admin';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

export default function NewLessonRecord({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const router = useRouter();
    const [studentName, setStudentName] = useState('生徒');
    const [formData, setFormData] = useState({
        title: '',
        teacher: 'Sarah J.',
        date: new Date().toISOString().split('T')[0],
        grammar: 50,
        vocab: 50,
        pronunciation: 50,
        fluency: 50,
        feedback: '',
        internalNote: ''
    });

    useEffect(() => {
        getStudentDetail(id).then((student: any) => {
            if (student) setStudentName(student.name);
        });
    }, [id]);

    const handleSave = async () => {
        const res = await addLessonRecord({
            studentId: id,
            date: formData.date,
            teacher: formData.teacher,
            title: formData.title,
            feedback: formData.feedback,
            grammar: formData.grammar,
            vocab: formData.vocab,
            pronunciation: formData.pronunciation,
            fluency: formData.fluency,
            internalNote: formData.internalNote
        });

        if (res.success) {
            alert('カルテを保存・公開しました！');
            router.push(`/admin/students/${id}`);
        } else {
            alert(res.error || '保存に失敗しました');
        }
    };

    return (
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href={`/admin/students/${id}`} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold">授業カルテ作成</h1>
                        <p className="text-xs text-muted-foreground">{studentName} さんの最新レッスン記録</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
                    >
                        <Save size={16} />
                        下書き保存
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-shadow shadow-md shadow-indigo-600/20 flex items-center gap-2"
                    >
                        <Send size={16} />
                        確定・生徒へ送信
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Form (2/3) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-border p-6 space-y-6">
                            <section>
                                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <BookOpen size={16} />
                                    基本情報
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium">授業タイトル / テーマ</label>
                                        <input
                                            type="text"
                                            placeholder="例: Business Presentation Skills"
                                            className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium">実施日</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </section>

                            <hr className="border-slate-100" />

                            <section>
                                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Star size={16} />
                                    評価・分析 (5段階評価)
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <SkillSlider label="文法 (Grammar)" value={formData.grammar} onChange={(v: number) => setFormData({ ...formData, grammar: v })} />
                                    <SkillSlider label="語彙 (Vocab)" value={formData.vocab} onChange={(v: number) => setFormData({ ...formData, vocab: v })} />
                                    <SkillSlider label="発音 (Pronunciation)" value={formData.pronunciation} onChange={(v: number) => setFormData({ ...formData, pronunciation: v })} />
                                    <SkillSlider label="流暢さ (Fluency)" value={formData.fluency} onChange={(v: number) => setFormData({ ...formData, fluency: v })} />
                                </div>
                            </section>

                            <hr className="border-slate-100" />

                            <section>
                                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <MessageSquare size={16} />
                                    生徒へのフォードバック
                                </h2>
                                <textarea
                                    rows={6}
                                    placeholder="本日の授業内容、良かった点、改善点、次回の宿題などを記入してください..."
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none text-sm resize-none"
                                    value={formData.feedback}
                                    onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                                ></textarea>
                                <div className="mt-2 flex items-start gap-2 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                                    <AlertCircle size={16} className="text-indigo-500 mt-0.5" />
                                    <p className="text-[11px] text-indigo-700">
                                        このフィールドの内容は、保存後に生徒のダッシュボードに自動的に反映されます。
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Sidebar (1/3) */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <CheckCircle2 size={16} />
                                講師間共有ノート
                            </h2>
                            <textarea
                                rows={8}
                                placeholder="他の講師向けの連絡事項。生徒には公開されません..."
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none text-sm resize-none"
                                value={formData.internalNote}
                                onChange={(e) => setFormData({ ...formData, internalNote: e.target.value })}
                            ></textarea>
                            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
                                <p className="text-xs text-amber-800 font-bold mb-1">直前の引継ぎ事項:</p>
                                <p className="text-[11px] text-amber-700">
                                    「L/Rの発音に重点を置きたいとのこと。比較級はまだ混乱している様子。」
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

interface SkillSliderProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

function SkillSlider({ label, value, onChange }: SkillSliderProps) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700">{label}</label>
                <span className="text-xs font-mono bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-bold">
                    {(value / 20).toFixed(1)} / 5.0
                </span>
            </div>
            <input
                type="range"
                min="0"
                max="100"
                step="20"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 px-0.5">
                <span>Low</span>
                <span>Avg</span>
                <span>High</span>
            </div>
        </div>
    );
}
