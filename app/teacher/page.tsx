'use client';

import { useState, useEffect } from 'react';
import {
    Trash2,
    Calendar,
    Video,
    MessageSquare,
    CheckCircle2,
    Star,
    Award,
    FileText,
    TrendingUp,
    Zap,
    X,
    ClipboardCheck,
    BookOpen,
    AlertCircle,
    History,
    PencilLine
} from 'lucide-react';
import { Teacher, LessonSchedule, Student, LessonRecord } from '@/lib/data-store';
import { getTeacherDashboardData, updateLessonMeetingUrl, submitLessonKarte, getRecentRecordsByStudent, getRecordByLessonId, revokeLessonKarte } from '@/lib/actions/teacher';

export default function TeacherDashboard() {
    const [teacher, setTeacher] = useState<Teacher | null>(null);
    const [todaySchedule, setTodaySchedule] = useState<(LessonSchedule & { student?: Student })[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [isAssessModalOpen, setIsAssessModalOpen] = useState(false);
    const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState<any>(null);
    const [meetingUrlInput, setMeetingUrlInput] = useState('');
    const [lastRecord, setLastRecord] = useState<LessonRecord | null>(null);
    const [assessmentData, setAssessmentData] = useState({
        title: '',
        feedback: '',
        homework: '',
        internalNote: '',
        grammar: 50,
        vocab: 50,
        pronunciation: 50,
        fluency: 50,
    });

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (!userId) return;

        getTeacherDashboardData(userId).then(data => {
            if (data && data.teacher) {
                setTeacher(data.teacher as any);
                setTodaySchedule(data.todaySchedule as any);
            }
            setLoading(false);
        });
    }, []);


    const openAssessModal = async (lesson: any) => {
        setSelectedLesson(lesson);
        setLastRecord(null);

        try {
            // Fetch the specific record for this lesson if it's completed
            if (lesson.status === 'Completed') {
                const currentRecord = await getRecordByLessonId(lesson.id);
                if (currentRecord) {
                    setAssessmentData({
                        title: currentRecord.title || lesson.course || '',
                        feedback: currentRecord.feedback || '',
                        homework: currentRecord.homework || '',
                        internalNote: currentRecord.internalNote || '',
                        grammar: currentRecord.grammar || 50,
                        vocab: currentRecord.vocab || 50,
                        pronunciation: currentRecord.pronunciation || 50,
                        fluency: currentRecord.fluency || 50,
                    });
                } else {
                    setAssessmentData({
                        title: lesson.course || '',
                        feedback: '',
                        homework: '',
                        internalNote: '',
                        grammar: 50,
                        vocab: 50,
                        pronunciation: 50,
                        fluency: 50,
                    });
                }
            } else {
                setAssessmentData({
                    title: lesson.course || '',
                    feedback: '',
                    homework: '',
                    internalNote: '',
                    grammar: 50,
                    vocab: 50,
                    pronunciation: 50,
                    fluency: 50,
                });
            }

            // Also fetch the most recent of ALL records for the student for the history sidebar
            const record = await getRecentRecordsByStudent(lesson.studentId);
            setLastRecord(record as any);
        } catch (error) {
            console.error('Error fetching record data:', error);
            setAssessmentData({
                title: lesson.course || '',
                feedback: '',
                homework: '',
                internalNote: '',
                grammar: 50,
                vocab: 50,
                pronunciation: 50,
                fluency: 50
            });
        }
        setIsAssessModalOpen(true);
    };

    const handleAssessSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedLesson || !teacher) return;

        try {
            const result = await submitLessonKarte({
                lessonId: selectedLesson.id,
                studentId: selectedLesson.studentId,
                date: selectedLesson.date,
                teacherName: teacher.name,
                title: assessmentData.title || selectedLesson.course,
                feedback: assessmentData.feedback,
                homework: assessmentData.homework,
                internalNote: assessmentData.internalNote,
                grammar: assessmentData.grammar,
                vocab: assessmentData.vocab,
                pronunciation: assessmentData.pronunciation,
                fluency: assessmentData.fluency
            });

            if (result.success) {
                // Update local state by changing the status to 'Completed'
                setTodaySchedule(prev => prev.map(s =>
                    s.id === selectedLesson.id ? { ...s, status: 'Completed' } : s
                ));
                setIsAssessModalOpen(false);
                setSelectedLesson(null);
                alert('カルテを保存・送信しました。');
            } else {
                alert(result.error || 'カルテの送信に失敗しました');
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert('通信エラーが発生しました');
        }
    };

    const openUrlModal = (lesson: any) => {
        setSelectedLesson(lesson);
        setMeetingUrlInput(lesson.meetingUrl || '');
        setIsUrlModalOpen(true);
    };

    const handleRevokeKarte = async () => {
        if (!selectedLesson || !confirm('このカルテを取り消してよろしいですか？\n授業ステータスも未完了（Scheduled）に戻ります。')) return;

        try {
            const result = await revokeLessonKarte(selectedLesson.id);
            if (result.success) {
                // Update local state by changing the status back to 'Scheduled' (or original status)
                setTodaySchedule(prev => prev.map(s =>
                    s.id === selectedLesson.id ? { ...s, status: 'Scheduled' } : s
                ));
                setIsAssessModalOpen(false);
                setSelectedLesson(null);
                alert('カルテを取り消しました。');
            } else {
                alert(result.error || '取り消しに失敗しました');
            }
        } catch (error) {
            console.error('Revoke error:', error);
            alert('通信エラーが発生しました');
        }
    };

    const handleUrlSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedLesson) return;

        try {
            const result = await updateLessonMeetingUrl(selectedLesson.id, meetingUrlInput);
            if (result.success) {
                // Update local state
                setTodaySchedule(prev => prev.map(s => s.id === selectedLesson.id ? { ...s, meetingUrl: meetingUrlInput } : s));
                setIsUrlModalOpen(false);
                setSelectedLesson(null);
            } else {
                alert(result.error || 'URLの更新に失敗しました');
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert('通信エラーが発生しました');
        }
    };

    if (loading) return null;

    return (
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-50/50">
            <div className="max-w-6xl mx-auto space-y-8">

                <header className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-8">
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-emerald-500/30">
                                {teacher?.name.charAt(0)}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-800 tracking-tight">こんにちは、{teacher?.name}先生</h1>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                                <MessageSquare size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">メッセージ</p>
                                <p className="text-lg font-black text-slate-800">2 <span className="text-xs text-slate-500 font-medium">未読</span></p>
                            </div>
                        </div>
                        <div className="bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                                <ClipboardCheck size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">未入力カルテ</p>
                                <p className="text-lg font-black text-slate-800">0</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                            <Calendar className="text-emerald-500" size={24} />
                            今日のスケジュール
                        </h2>
                        <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                            {todaySchedule.length} 件の授業
                        </span>
                    </div>

                    <div className="space-y-4">
                        {todaySchedule.length > 0 ? todaySchedule.map((lesson, idx) => (
                            <div key={lesson.id} className="bg-white border text-left border-slate-200 hover:border-emerald-300 rounded-3xl p-6 shadow-sm transition-all group relative overflow-hidden flex flex-col sm:flex-row gap-6">
                                <div className="flex-shrink-0 w-32 border-b sm:border-b-0 sm:border-r border-slate-100 pb-4 sm:pb-0 sm:pr-6 flex flex-col justify-center">
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">開始時間</p>
                                    <p className="text-xl font-black text-slate-800">{lesson.time.split('-')[0].trim()}</p>
                                    <p className="text-xs font-bold text-slate-400 mt-1">{lesson.duration}</p>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2.5 py-1 rounded-md text-[10px] font-black tracking-wider bg-emerald-50 text-emerald-600">
                                            {lesson.tags?.[0] || lesson.course}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                                        {lesson.studentName || 'Unknown Student'}
                                    </h3>
                                    <p className="text-sm text-slate-500 font-medium flex items-center gap-2 mt-2">
                                        <TrendingUp size={14} className="text-slate-400" />
                                        目標: {lesson.student?.target || '未設定'}
                                    </p>
                                </div>

                                <div className="flex-shrink-0 flex sm:flex-col gap-3 justify-center">
                                    <div className="flex flex-col gap-1">
                                        {lesson.meetingUrl ? (
                                            <a
                                                href={lesson.meetingUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex justify-center items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-indigo-200"
                                            >
                                                <Video size={16} />
                                                教室入室
                                            </a>
                                        ) : (
                                            <button
                                                className="flex justify-center items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-400 rounded-xl text-sm font-bold cursor-not-allowed"
                                                disabled
                                            >
                                                <Video size={16} />
                                                URL未設定
                                            </button>
                                        )}
                                        <button
                                            onClick={() => openUrlModal(lesson)}
                                            className="text-[10px] font-black text-indigo-500 hover:text-indigo-700 uppercase tracking-widest text-center mt-1"
                                        >
                                            {lesson.meetingUrl ? 'URLを変更' : 'URLを設定する'}
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => openAssessModal(lesson)}
                                        className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2.5 bg-white border-2 border-emerald-500 hover:bg-emerald-50 text-emerald-600 rounded-xl text-sm font-bold transition-colors shadow-sm shadow-emerald-500/10"
                                    >
                                        <FileText size={16} />
                                        {lesson.status === 'Completed' ? 'カルテを編集' : 'カルテ入力'}
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-emerald-200">
                                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 size={32} className="text-emerald-400" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2">今日の授業はすべて完了しました！</h3>
                                <p className="text-slate-500 text-sm">現在予定されているレッスンはありません。</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isAssessModalOpen && selectedLesson && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAssessModalOpen(false)}></div>
                    <form onSubmit={handleAssessSubmit} className="relative bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col md:flex-row max-h-[90vh]">
                        {/* ... existing modal content ... */}
                        <div className="flex-1 flex flex-col overflow-y-auto">
                            <div className="px-6 py-5 border-b border-slate-100 bg-emerald-50 text-emerald-900 flex items-center justify-between shrink-0">
                                <div>
                                    <h3 className="text-lg font-black mb-1">授業カルテ作成</h3>
                                    <p className="text-xs font-bold text-emerald-700 tracking-wide">
                                        生徒: <span className="bg-white px-2 py-0.5 rounded shadow-sm">{selectedLesson.student?.name}</span>
                                    </p>
                                </div>
                                <button type="button" onClick={() => setIsAssessModalOpen(false)} className="md:hidden p-2 text-emerald-600 hover:bg-emerald-100 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 md:p-8 space-y-8">
                                <div className="space-y-3">
                                    <h4 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
                                        <BookOpen className="text-emerald-500" size={16} />
                                        授業テーマ・学習内容
                                    </h4>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-bold"
                                        placeholder="例: Unit 4: Leading a Project Meeting"
                                        value={assessmentData.title}
                                        onChange={(e) => setAssessmentData({ ...assessmentData, title: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
                                        <Star className="text-amber-500" size={16} />
                                        評価・分析 (5段階評価)
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                        <SkillSlider label="文法 (Grammar)" value={assessmentData.grammar} onChange={(v: number) => setAssessmentData({ ...assessmentData, grammar: v })} />
                                        <SkillSlider label="語彙 (Vocab)" value={assessmentData.vocab} onChange={(v: number) => setAssessmentData({ ...assessmentData, vocab: v })} />
                                        <SkillSlider label="発音 (Pronunciation)" value={assessmentData.pronunciation} onChange={(v: number) => setAssessmentData({ ...assessmentData, pronunciation: v })} />
                                        <SkillSlider label="流暢さ (Fluency)" value={assessmentData.fluency} onChange={(v: number) => setAssessmentData({ ...assessmentData, fluency: v })} />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
                                        <MessageSquare className="text-indigo-500" size={16} />
                                        生徒へのフィードバック
                                    </h4>
                                    <p className="text-[11px] text-slate-500 font-medium">この内容は生徒自身の学習カルテ画面に直接公開されます。</p>
                                    <textarea
                                        className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium resize-none leading-relaxed"
                                        placeholder="本日の授業の良かった点、改善点、次回の目標などを記入してください..."
                                        value={assessmentData.feedback}
                                        onChange={(e) => setAssessmentData({ ...assessmentData, feedback: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
                                        <PencilLine className="text-amber-500" size={16} />
                                        次回までの宿題
                                    </h4>
                                    <p className="text-[11px] text-slate-500 font-medium">生徒が次回復習できるよう、具体的な課題を記入してください。</p>
                                    <textarea
                                        className="w-full h-24 p-4 bg-amber-50/30 border border-amber-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium resize-none leading-relaxed"
                                        placeholder="例: 文法書 P.42-45 を解いてくる / 本日の重要フレーズを3回ずつ音読する"
                                        value={assessmentData.homework}
                                        onChange={(e) => setAssessmentData({ ...assessmentData, homework: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
                                        <AlertCircle className="text-slate-500" size={16} />
                                        講師間共有ノート (非公開)
                                    </h4>
                                    <p className="text-[11px] text-slate-500 font-medium">他の講師や管理者への引き継ぎ事項です。生徒には表示されません。</p>
                                    <textarea
                                        className="w-full h-20 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 font-medium resize-none leading-relaxed"
                                        placeholder="次回以降のレッスンで注意すべき点や、引き継ぎたい内容..."
                                        value={assessmentData.internalNote}
                                        onChange={(e) => setAssessmentData({ ...assessmentData, internalNote: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="px-6 py-5 border-t border-slate-100 bg-white flex justify-between gap-3 shrink-0 mt-auto">
                                <div className="flex gap-3">
                                    {selectedLesson?.status === 'Completed' && (
                                        <button
                                            type="button"
                                            onClick={handleRevokeKarte}
                                            className="px-4 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-2"
                                        >
                                            <Trash2 size={16} />
                                            取り消す
                                        </button>
                                    )}
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsAssessModalOpen(false)}
                                        className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
                                    >
                                        キャンセル
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-2.5 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center gap-2"
                                    >
                                        <CheckCircle2 size={18} className="text-emerald-100" />
                                        {selectedLesson?.status === 'Completed' ? 'カルテを更新する' : 'カルテを送信'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:flex flex-col w-80 bg-slate-50 border-l border-slate-100">
                            <div className="p-4 border-b border-slate-200 flex justify-end">
                                <button type="button" onClick={() => setIsAssessModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-6 flex-1 overflow-y-auto">
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <History size={14} />
                                    直近のカルテ履歴
                                </h4>
                                {lastRecord ? (
                                    <div className="space-y-5">
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">{lastRecord?.date} | 担当: {lastRecord?.teacher}</p>
                                            <p className="text-sm font-bold text-slate-800">{lastRecord?.title}</p>
                                        </div>

                                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative">
                                            <div className="absolute -top-3 left-4 bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                                                Feedback
                                            </div>
                                            <p className="text-xs text-slate-600 leading-relaxed mt-2 whitespace-pre-wrap">
                                                {lastRecord?.feedback}
                                            </p>
                                        </div>

                                        {lastRecord?.homework && (
                                            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 relative mt-4">
                                                <div className="absolute -top-3 left-4 bg-amber-200 text-amber-800 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                                                    Homework
                                                </div>
                                                <p className="text-xs text-amber-900 leading-relaxed mt-2 whitespace-pre-wrap font-bold">
                                                    {lastRecord.homework}
                                                </p>
                                            </div>
                                        )}

                                        {lastRecord?.internalNote && (
                                            <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 relative mt-4">
                                                <div className="absolute -top-3 left-4 bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                                                    引継ぎノート
                                                </div>
                                                <p className="text-xs text-slate-600 leading-relaxed mt-2 whitespace-pre-wrap font-medium">
                                                    {lastRecord.internalNote}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-10">
                                        <p className="text-xs text-slate-400 font-medium">この生徒の過去の受講記録はありません。</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {/* URL Setting Modal */}
            {isUrlModalOpen && selectedLesson && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsUrlModalOpen(false)}></div>
                    <form onSubmit={handleUrlSubmit} className="relative bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">Google Meet URL設定</h3>
                            <button type="button" onClick={() => setIsUrlModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 mb-6">
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">Target Lesson</p>
                                <p className="text-sm font-bold text-indigo-900">{selectedLesson.studentName} | {selectedLesson.course}</p>
                                <p className="text-[10px] font-bold text-indigo-500 mt-0.5">{selectedLesson.time}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Google Meet URL</label>
                                <input
                                    type="url"
                                    placeholder="https://meet.google.com/xxx-xxxx-xxx"
                                    className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-sm font-black text-slate-900 transition-all font-mono"
                                    value={meetingUrlInput}
                                    onChange={(e) => setMeetingUrlInput(e.target.value)}
                                    required
                                    autoFocus
                                />
                                <p className="text-[10px] text-slate-400 font-medium ml-1">
                                    ※ 設定したURLは生徒のダッシュボードに即時反映されます。
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button
                                type="button"
                                onClick={() => setIsUrlModalOpen(false)}
                                className="flex-1 py-3 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
                            >
                                キャンセル
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
                            >
                                URLを保存する
                            </button>
                        </div>
                    </form>
                </div>
            )}
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
                <label className="text-xs font-bold text-slate-700">{label}</label>
                <span className="text-[10px] font-mono bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-bold">
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
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
        </div>
    );
}
