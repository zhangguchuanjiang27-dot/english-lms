'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import {
    ChevronRight,
    ArrowUpRight,
    BookOpen,
    Plus,
    X,
    School,
    Medal,
    Calendar,
    GraduationCap,
    Check,
    TrendingUp,
    Pencil,
    Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
    getStudentProfile,
    getStudentTestScores,
    addStudentTestScore,
    updateStudentTestScore,
    deleteStudentTestScore
} from '@/lib/actions/student';
import { Student } from '@/lib/data-store';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type TabType = 'school' | 'proficiency';

export default function StudentAchievementsPage() {
    const [student, setStudent] = useState<Student | null>(null);
    const [testScores, setTestScores] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<TabType>('school');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [testType, setTestType] = useState<TabType>('school');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editingScoreId, setEditingScoreId] = useState<string | null>(null);

    // Form states
    const [formData, setFormData] = useState({
        testName: '',
        date: new Date().toISOString().split('T')[0],
        grade: '中学3年',
        score: ''
    });

    const fetchAllData = async (userId: string) => {
        const [profile, scores] = await Promise.all([
            getStudentProfile(userId),
            getStudentTestScores(userId)
        ]);

        if (profile) setStudent(profile as any);
        if (scores) setTestScores(scores);
    };

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            window.location.href = '/login';
            return;
        }
        fetchAllData(userId);
    }, []);

    const resetForm = () => {
        setFormData({
            testName: '',
            date: new Date().toISOString().split('T')[0],
            grade: '中学3年',
            score: ''
        });
        setEditingScoreId(null);
    };

    const handleRecord = async () => {
        if (!student || !formData.testName || !formData.score) return;

        setIsSubmitting(true);
        try {
            let res;
            if (editingScoreId) {
                res = await updateStudentTestScore(editingScoreId, {
                    type: testType,
                    ...formData
                });
            } else {
                res = await addStudentTestScore(student.id, {
                    type: testType,
                    ...formData
                });
            }

            if (res.success) {
                setIsModalOpen(false);
                resetForm();
                // Refresh list
                const updatedScores = await getStudentTestScores(student.id);
                setTestScores(updatedScores);
            } else {
                alert(res.error);
            }
        } catch (error) {
            console.error(error);
            alert('保存中にエラーが発生しました');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!editingScoreId || !student) return;
        
        if (!confirm('このテスト結果を削除してもよろしいですか？')) {
            return;
        }

        setIsDeleting(true);
        try {
            const res = await deleteStudentTestScore(editingScoreId);
            if (res.success) {
                setIsModalOpen(false);
                resetForm();
                const updatedScores = await getStudentTestScores(student.id);
                setTestScores(updatedScores);
            } else {
                alert(res.error);
            }
        } catch (error) {
            console.error(error);
            alert('削除中にエラーが発生しました');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleEdit = (score: any) => {
        setEditingScoreId(score.id);
        setTestType(score.type);
        setFormData({
            testName: score.testName,
            date: score.date,
            grade: score.grade,
            score: score.score
        });
        setIsModalOpen(true);
    };

    if (!student) return null;

    const schoolTests = testScores.filter(s => s.type === 'school');
    const proficiencyTests = testScores.filter(s => s.type === 'proficiency');
    const activeScores = activeTab === 'school' ? schoolTests : proficiencyTests;

    return (
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-50 relative w-full max-w-full overflow-x-hidden flex flex-col">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="animate-in slide-in-from-left duration-500">
                        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">学習成績・記録</h1>
                        <p className="text-slate-500 mt-1 text-sm">{student.name}さんの試験・テストの履歴</p>
                    </div>
                    <button
                        onClick={() => {
                            resetForm();
                            setTestType(activeTab);
                            setIsModalOpen(true);
                        }}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 whitespace-nowrap"
                    >
                        <Plus size={20} />
                        テスト結果を記録
                    </button>
                </div>

                {/* Tab Switcher */}
                <div className="flex p-1.5 bg-slate-200/50 rounded-2xl md:rounded-[2rem] w-full md:w-fit overflow-x-auto scrollbar-hide -mx-2 px-2 md:mx-0 md:px-1.5">
                    <div className="flex min-w-max md:min-w-0 w-full md:w-auto">
                        <button
                            onClick={() => setActiveTab('school')}
                            className={cn(
                                "flex items-center gap-2 px-8 py-3.5 rounded-[1.75rem] text-sm font-black transition-all",
                                activeTab === 'school'
                                    ? "bg-white text-indigo-600 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700"
                            )}
                        >
                            <School size={18} />
                            学校のテスト
                        </button>
                        <button
                            onClick={() => setActiveTab('proficiency')}
                            className={cn(
                                "flex items-center gap-2 px-8 py-3.5 rounded-[1.75rem] text-sm font-black transition-all",
                                activeTab === 'proficiency'
                                    ? "bg-white text-indigo-600 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700"
                            )}
                        >
                            <Medal size={18} />
                            資格・検定試験
                        </button>
                    </div>
                </div>

                {/* Hero Section (Replaces Chart) */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                            "rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 text-white relative overflow-hidden shadow-xl",
                            activeTab === 'school' 
                                ? "bg-gradient-to-br from-indigo-600 to-indigo-800 shadow-indigo-100" 
                                : "bg-gradient-to-br from-indigo-600 to-violet-700 shadow-indigo-100"
                        )}
                    >
                        <div className="relative z-10 space-y-4 max-w-md">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest uppercase">
                                Achievement Tracking
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black leading-tight">
                                {activeTab === 'school' ? '学校のテスト成績を' : '資格・検定試験の目標を'}<br />管理しましょう
                            </h3>
                            <p className="text-white/80 text-sm font-medium">
                                {activeTab === 'school' 
                                    ? '日々の学習の成果を記録して、一歩ずつ目標に近づいていく実感を持ちましょう。' 
                                    : '英検やTOEICなどのスコアを記録して、将来の可能性を広げましょう。'}
                            </p>
                        </div>
                        {activeTab === 'school' ? (
                            <School size={200} className="absolute -bottom-10 -right-10 text-white/5 rotate-12 z-0" />
                        ) : (
                            <Medal size={200} className="absolute -bottom-10 -right-10 text-white/5 rotate-12 z-0" />
                        )}
                    </motion.div>
                </div>

                {/* List Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-4">
                        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            {activeTab === 'school' ? <School size={16} /> : <Medal size={16} />}
                            {activeTab === 'school' ? '学校のテスト履歴' : '資格・検定試験履歴'}
                        </h4>
                        {activeScores.length > 0 && <span className="text-xs font-bold text-slate-400">{activeScores.length}件の記録</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeScores.length > 0 ? (
                            activeScores.map((s, idx) => (
                                <ScoreCard
                                    key={s.id || idx}
                                    date={s.date.replace(/-/g, '/')}
                                    title={s.testName}
                                    score={s.score}
                                    total={s.totalScore}
                                    trend={s.trend}
                                    onEdit={() => handleEdit(s)}
                                />
                            ))
                        ) : (
                            <div className="col-span-full bg-white rounded-[2.5rem] p-16 text-center border border-slate-100 shadow-sm">
                                <p className="text-slate-400 text-sm italic">まだ記録がありません</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Score Input Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-center justify-center p-2 pb-20 md:p-4 perspective-[2000px]">
                            <motion.div
                                initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: 10 }}
                                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                                exit={{ opacity: 0, y: 20, scale: 0.95, rotateX: -10 }}
                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                className="bg-white w-full max-w-2xl rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] md:max-h-[95vh]"
                            >
                                {/* Modal Header */}
                                <div className="px-6 py-6 md:px-10 md:py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 relative overflow-hidden flex-shrink-0">
                                    <h2 className="text-xl font-black text-slate-800 tracking-tight">
                                        {editingScoreId ? 'テスト結果を編集' : 'テスト結果を記録'}
                                    </h2>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                                    >
                                        <X size={20} className="text-slate-400" />
                                    </button>
                                </div>

                                {/* Modal Body (Scrollable) */}
                                <div className="p-5 md:p-10 overflow-y-auto flex-1 space-y-6 md:space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                                            テストの種類を選択
                                        </h3>
                                        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 md:gap-4">
                                            {/* Card A: School Test */}
                                            <div
                                                onClick={() => setTestType('school')}
                                                className={cn(
                                                    "p-5 md:p-6 rounded-2xl md:rounded-3xl border-2 cursor-pointer transition-all text-left space-y-3 md:space-y-4 group relative",
                                                    testType === 'school'
                                                        ? "border-indigo-600 bg-indigo-50/30 shadow-inner"
                                                        : "border-slate-50 bg-white hover:border-slate-200 shadow-sm"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-colors shrink-0",
                                                    testType === 'school' ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                                                )}>
                                                    <School size={24} />
                                                </div>
                                                <div>
                                                    <h4 className={cn("font-bold", testType === 'school' ? "text-indigo-900" : "text-slate-800")}>学校のテスト</h4>
                                                    <p className="text-[10px] text-slate-400 leading-tight">中間テスト、期末テスト、小テストなど</p>
                                                </div>
                                                {testType === 'school' && (
                                                    <div className="absolute top-4 right-4 text-indigo-600">
                                                        <Check size={18} />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Card B: Proficiency Test */}
                                            <div
                                                onClick={() => setTestType('proficiency')}
                                                className={cn(
                                                    "p-5 md:p-6 rounded-2xl md:rounded-3xl border-2 cursor-pointer transition-all text-left space-y-3 md:space-y-4 group relative",
                                                    testType === 'proficiency'
                                                        ? "border-indigo-600 bg-indigo-50/30 shadow-inner"
                                                        : "border-slate-50 bg-white hover:border-slate-200 shadow-sm"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-colors shrink-0",
                                                    testType === 'proficiency' ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                                                )}>
                                                    <Medal size={24} />
                                                </div>
                                                <div>
                                                    <h4 className={cn("font-bold", testType === 'proficiency' ? "text-indigo-900" : "text-slate-800")}>資格・検定試験</h4>
                                                    <p className="text-[10px] text-slate-400 leading-tight">英検、TOEIC、TOEFLなど</p>
                                                </div>
                                                {testType === 'proficiency' && (
                                                    <div className="absolute top-4 right-4 text-indigo-600">
                                                        <Check size={18} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <motion.div
                                        initial={false}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        className="space-y-4 md:space-y-6 pt-6 border-t border-slate-50"
                                    >
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                            <div className="col-span-1 sm:col-span-2 space-y-2">
                                                <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                    <BookOpen size={14} /> テスト名
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.testName}
                                                    onChange={(e) => setFormData({ ...formData, testName: e.target.value })}
                                                    placeholder={testType === 'school' ? "例：2学期中間考査" : "例：英検2級 1次試験"}
                                                    className="w-full px-4 py-3 md:px-5 md:py-4 bg-slate-50 rounded-xl md:rounded-2xl border-2 border-transparent focus:border-indigo-200 focus:bg-white outline-none transition-all text-sm font-bold"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                    <Calendar size={14} /> 日付
                                                </label>
                                                <input
                                                    type="date"
                                                    value={formData.date}
                                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                    className="w-full px-4 py-3 md:px-5 md:py-4 bg-slate-50 rounded-xl md:rounded-2xl border-2 border-transparent focus:border-indigo-200 focus:bg-white outline-none transition-all text-sm font-bold appearance-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                    <GraduationCap size={14} /> 学年
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.grade}
                                                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                                        className="w-full px-4 py-3 md:px-5 md:py-4 bg-slate-50 rounded-xl md:rounded-2xl border-2 border-transparent focus:border-indigo-200 focus:bg-white outline-none transition-all text-sm font-bold appearance-none cursor-pointer"
                                                    >
                                                        <option>小学1年</option>
                                                        <option>小学2年</option>
                                                        <option>小学3年</option>
                                                        <option>小学4年</option>
                                                        <option>小学5年</option>
                                                        <option>小学6年</option>
                                                        <option>中学1年</option>
                                                        <option>中学2年</option>
                                                        <option>中学3年</option>
                                                        <option>高校1年</option>
                                                        <option>高校2年</option>
                                                        <option>高校3年</option>
                                                    </select>
                                                    <div className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                        <ChevronRight size={16} className="rotate-90" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-1 sm:col-span-2 space-y-2">
                                                <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                    <TrendingUp size={14} /> 点数
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        value={formData.score}
                                                        onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                                                        placeholder={testType === 'school' ? "例：85 / 100点" : "例：合格"}
                                                        className="w-full px-4 py-3 md:px-5 md:py-4 bg-slate-50 rounded-xl md:rounded-2xl border-2 border-transparent focus:border-indigo-200 focus:bg-white outline-none transition-all text-sm font-bold"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Modal Footer */}
                                    <div className="flex flex-col-reverse sm:flex-row items-center justify-between pt-4 gap-4">
                                        {/* Optional Delete Button */}
                                        {editingScoreId ? (
                                            <button
                                                onClick={handleDelete}
                                                disabled={isDeleting}
                                                className="w-full sm:w-auto px-4 py-3.5 text-sm font-bold text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all flex items-center justify-center gap-2"
                                            >
                                                <Trash2 size={16} />
                                                {isDeleting ? "削除中..." : "削除する"}
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setIsModalOpen(false)}
                                                className="w-full sm:w-auto px-4 py-3.5 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                                            >
                                                キャンセル
                                            </button>
                                        )}

                                        <button
                                            onClick={handleRecord}
                                            disabled={isSubmitting || !formData.testName || !formData.score}
                                            className="w-full sm:w-auto px-8 py-3.5 md:py-4 bg-indigo-600 text-white text-sm font-black rounded-[1rem] md:rounded-[1.25rem] shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none text-center"
                                        >
                                            {isSubmitting ? "保存中..." : editingScoreId ? "更新する" : "記録する"}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}


function ScoreCard({ date, title, score, total, trend, color, onEdit }: any) {
    return (
        <div
            onClick={onEdit}
            className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex justify-between items-center group cursor-pointer border-l-4 border-l-transparent hover:border-l-indigo-600"
        >
            <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{date}</p>
                <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{title}</h4>
                    <Pencil size={12} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="text-right">
                    <div className={cn("text-2xl font-black px-3 py-1 rounded-xl", color || "text-slate-900")}>
                        {score}
                        {total && <span className="text-sm font-bold text-slate-300 ml-1">/ {total}</span>}
                    </div>
                </div>
                {trend !== 'same' && (
                    <div className={cn(
                        "p-2.5 rounded-xl transition-colors",
                        trend === 'up' ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500"
                    )}>
                        {trend === 'up' ? <ArrowUpRight size={20} /> : <ArrowUpRight size={20} className="rotate-90" />}
                    </div>
                )}
            </div>
        </div>
    )
}
