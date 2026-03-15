'use client';

import { useState, useEffect } from 'react';
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
    Pencil
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
    getStudentProfile, 
    getStudentTestScores, 
    addStudentTestScore, 
    updateStudentTestScore 
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
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-50">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">学習成績・記録</h1>
                        <p className="text-slate-500 mt-1">{student.name}さんの試験・テストの履歴</p>
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
                <div className="flex p-1.5 bg-slate-200/50 rounded-[2rem] w-fit">
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

                {/* Hero Chart Section */}
                <div className="space-y-6">
                    {activeTab === 'school' && schoolTests.length >= 2 ? (
                        <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                                    <TrendingUp size={24} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight">学校のテスト点数推移</h3>
                            </div>
                            <div className="h-[240px] w-full">
                                <SchoolScoreChart scores={schoolTests} />
                            </div>
                        </div>
                    ) : activeTab === 'school' ? (
                        <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm text-center space-y-4">
                            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                <TrendingUp size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">推移グラフを表示するには<br/>あと2件以上の記録が必要です</h3>
                            <p className="text-slate-400 text-sm max-w-xs mx-auto">定期試験などの点数を記録して、学習の成果を可視化しましょう。</p>
                        </div>
                    ) : null}

                    {/* Proficiency Test Info Card */}
                    {activeTab === 'proficiency' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-xl shadow-indigo-100"
                        >
                            <div className="relative z-10 space-y-4 max-w-md">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase">
                                    Achievement Tracking
                                </div>
                                <h3 className="text-3xl font-black leading-tight">資格・検定試験の目標を<br/>達成しましょう</h3>
                                <p className="text-indigo-100/80 text-sm">英検やTOEICなどのスコアを記録して、一歩ずつ目標に近づいていく実感を持ちましょう。</p>
                            </div>
                            <Medal size={200} className="absolute -bottom-10 -right-10 text-white/5 rotate-12 z-0" />
                        </motion.div>
                    )}
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

                {/* Score Recording Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsModalOpen(false)}
                                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                            />

                            {/* Modal Content */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
                            >
                                {/* Modal Header */}
                                <div className="px-8 pt-8 pb-4 flex justify-between items-center border-b border-slate-50">
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

                                <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                                    <div className="space-y-6">
                                        <p className="font-bold text-slate-600 text-center">どんなテストを受けましたか？</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Card A: School Test */}
                                            <div
                                                onClick={() => setTestType('school')}
                                                className={cn(
                                                    "p-6 rounded-3xl border-2 cursor-pointer transition-all text-left space-y-4 group relative",
                                                    testType === 'school'
                                                        ? "border-indigo-600 bg-indigo-50/30 shadow-inner"
                                                        : "border-slate-50 bg-white hover:border-slate-200 shadow-sm"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
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
                                                        <Check size={20} />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Card B: Proficiency Test */}
                                            <div
                                                onClick={() => setTestType('proficiency')}
                                                className={cn(
                                                    "p-6 rounded-3xl border-2 cursor-pointer transition-all text-left space-y-4 group relative",
                                                    testType === 'proficiency'
                                                        ? "border-indigo-600 bg-indigo-50/30 shadow-inner"
                                                        : "border-slate-50 bg-white hover:border-slate-200 shadow-sm"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
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
                                                        <Check size={20} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <motion.div
                                        initial={false}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        className="space-y-6 pt-6 border-t border-slate-50"
                                    >
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="col-span-2 space-y-2">
                                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                    <BookOpen size={14} /> テスト名
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.testName}
                                                    onChange={(e) => setFormData({ ...formData, testName: e.target.value })}
                                                    placeholder={testType === 'school' ? "例：2学期中間考査" : "例：英検2級 1次試験"}
                                                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-indigo-200 focus:bg-white outline-none transition-all text-sm font-bold"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                    <Calendar size={14} /> 日付
                                                </label>
                                                <input
                                                    type="date"
                                                    value={formData.date}
                                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-indigo-200 focus:bg-white outline-none transition-all text-sm font-bold"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                    <GraduationCap size={14} /> 学年
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.grade}
                                                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                                        className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-indigo-200 focus:bg-white outline-none transition-all text-sm font-bold appearance-none cursor-pointer"
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
                                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                        <ChevronRight size={16} className="rotate-90" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-2 space-y-2">
                                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                    <TrendingUp size={14} /> 点数
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        value={formData.score}
                                                        onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                                                        placeholder={testType === 'school' ? "例：85 / 100点" : "例：合格"}
                                                        className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-indigo-200 focus:bg-white outline-none transition-all text-sm font-bold"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Modal Footer */}
                                    <div className="flex items-center justify-between pt-4">
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            キャンセル
                                        </button>
                                        <button
                                            onClick={handleRecord}
                                            disabled={isSubmitting || !formData.testName || !formData.score}
                                            className="px-8 py-4 bg-indigo-600 text-white text-sm font-black rounded-[1.25rem] shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

function SchoolScoreChart({ scores }: { scores: any[] }) {
    if (scores.length < 2) return null;

    // Parse score and sort by date
    // Handles formats: "85", "85 / 100", "85点"
    const data = scores
        .map(s => {
            const numericScore = parseInt(s.score.split('/')[0].replace(/[^0-9]/g, '')) || 0;
            return {
                date: s.date,
                score: numericScore,
            };
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const width = 800;
    const height = 200;
    const padding = 40;

    const minScore = Math.max(0, Math.min(...data.map(d => d.score)) - 10);
    const maxScore = Math.min(100, Math.max(...data.map(d => d.score)) + 10);

    const getX = (index: number) => padding + (index * (width - 2 * padding)) / (data.length - 1);
    const getY = (score: number) => height - padding - ((score - minScore) * (height - 2 * padding)) / (maxScore - minScore);

    const points = data.map((d, i) => `${getX(i)},${getY(d.score)}`).join(' ');

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full"
        >
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
                {/* Horizontal Guide Lines */}
                {[0, 25, 50, 75, 100].map(val => (
                    <g key={val}>
                        <line x1={padding} y1={getY(val)} x2={width - padding} y2={getY(val)} stroke="#f1f5f9" strokeWidth="1" />
                        <text x={padding - 10} y={getY(val)} textAnchor="end" alignmentBaseline="middle" className="text-[10px] fill-slate-300 font-bold">{val}</text>
                    </g>
                ))}
                
                {/* Gradient */}
                <defs>
                    <linearGradient id="scoreGradientMain" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Area */}
                <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    d={`M ${getX(0)} ${height - padding} ${data.map((d, i) => `L ${getX(i)} ${getY(d.score)}`).join(' ')} L ${getX(data.length - 1)} ${height - padding} Z`}
                    fill="url(#scoreGradientMain)"
                />

                {/* The Line */}
                <motion.polyline
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                />

                {/* Dots & Labels */}
                {data.map((d, i) => (
                    <g key={i}>
                        <motion.circle
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1 + i * 0.1, type: "spring", stiffness: 200 }}
                            cx={getX(i)}
                            cy={getY(d.score)}
                            r="6"
                            fill="white"
                            stroke="#4f46e5"
                            strokeWidth="4"
                            className="drop-shadow-md"
                        />
                        <motion.text
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: -15 }}
                            transition={{ delay: 1.5 + i * 0.1 }}
                            x={getX(i)}
                            y={getY(d.score)}
                            textAnchor="middle"
                            className="text-[16px] font-black fill-indigo-600"
                        >
                            {d.score}
                        </motion.text>
                        {/* Date Label */}
                        <motion.text
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                            x={getX(i)}
                            y={height - 10}
                            textAnchor="middle"
                            className="text-[10px] font-bold fill-slate-400"
                        >
                            {d.date.split('-').slice(1).join('/')}
                        </motion.text>
                    </g>
                ))}
            </svg>
        </motion.div>
    );
}

function ScoreCard({ date, title, score, total, trend, color, onEdit }: any) {
    return (
        <div 
            onClick={onEdit}
            className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex justify-between items-center group cursor-pointer border-l-4 border-l-transparent hover:border-l-indigo-600"
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
