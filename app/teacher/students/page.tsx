'use client';

import { useState, useEffect } from 'react';
import {
    Trash2,
    Search,
    BookOpen,
    Calendar,
    Clock,
    User,
    ChevronRight,
    Users,
    Filter,
    FileText,
    CheckCircle2,
    X,
    MessageSquare,
    PencilLine,
    AlertCircle,
    History,
    Video,
    Zap
} from 'lucide-react';
import { Student, LessonSchedule, LessonRecord, Teacher } from '@/lib/data-store';
import { getTeacherStudentsData, updateLessonMeetingUrl, submitLessonKarte, getRecentRecordsByStudent, getRecordByLessonId, revokeLessonKarte } from '@/lib/actions/teacher';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function formatTimeRange(time: string, durationStr: string) {
    if (!time || time.includes('~')) return time || '';
    const [hours, minutes] = time.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return time;
    const match = durationStr?.match(/(\d+)/);
    const durationMins = match ? parseInt(match[0]) : 50;
    const end = new Date(2000, 0, 1, hours, minutes + durationMins);
    return `${time}~${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`;
}

export default function TeacherStudentsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [myLessons, setMyLessons] = useState<{ lesson: LessonSchedule, student?: Student }[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'upcoming' | 'all'>('upcoming');
    const [teacher, setTeacher] = useState<Teacher | null>(null);

    // Modal State
    const [isAssessModalOpen, setIsAssessModalOpen] = useState(false);
    const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState<any>(null);
    const [meetingUrlInput, setMeetingUrlInput] = useState('');
    const [lastRecord, setLastRecord] = useState<LessonRecord | null>(null);
    const [assessmentData, setAssessmentData] = useState({
        title: '',
        feedback: '',
        nextScope: '',
        homework: '',
        internalNote: ''
    });

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (!userId) return;

        getTeacherStudentsData(userId).then(data => {
            if (data && data.teacher) {
                setTeacher(data.teacher as any);
                const lessonsData = data.mySchedules.map((lesson: any) => ({
                    lesson,
                    student: lesson.student
                }));
                setMyLessons(lessonsData);
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
                        nextScope: (currentRecord as any).nextScope || '',
                        homework: currentRecord.homework || '',
                        internalNote: currentRecord.internalNote || ''
                    });
                } else {
                    setAssessmentData({
                        title: lesson.course || '',
                        feedback: '',
                        nextScope: '',
                        homework: '',
                        internalNote: ''
                    });
                }
            } else {
                setAssessmentData({
                    title: lesson.course || '',
                    feedback: '',
                    nextScope: '',
                    homework: '',
                    internalNote: ''
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
                nextScope: '',
                homework: '',
                internalNote: ''
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
                nextScope: assessmentData.nextScope,
                homework: assessmentData.homework,
                internalNote: assessmentData.internalNote
            });

            if (result.success) {
                // Update the lesson status in myLessons
                setMyLessons(prev => prev.map(item => {
                    if (item.lesson.id === selectedLesson.id) {
                        return {
                            ...item,
                            lesson: {
                                ...item.lesson,
                                status: 'Completed'
                            }
                        };
                    }
                    return item;
                }));

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
                // Update local state by changing the status back to 'Scheduled'
                setMyLessons(prev => prev.map(item => {
                    if (item.lesson.id === selectedLesson.id) {
                        return {
                            ...item,
                            lesson: {
                                ...item.lesson,
                                status: 'Scheduled'
                            }
                        };
                    }
                    return item;
                }));

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
                setMyLessons(prev => prev.map(item => {
                    if (item.lesson.id === selectedLesson.id) {
                        return {
                            ...item,
                            lesson: {
                                ...item.lesson,
                                meetingUrl: meetingUrlInput
                            }
                        };
                    }
                    return item;
                }));
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

    const todayStr = new Date().toISOString().split('T')[0];

    const filteredLessons = myLessons.filter(item => {
        // 検索フィルター
        const matchesSearch =
            item.student?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.lesson.course.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        // 表示モードフィルター
        if (viewMode === 'upcoming') {
            return item.lesson.status === 'Scheduled' && item.lesson.date >= todayStr;
        }

        return true;
    });

    if (loading) return null;

    return (
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-50 min-h-screen">
            <div className="max-w-6xl mx-auto space-y-8">

                <header className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-8">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                            <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl">
                                <Calendar size={24} />
                            </div>
                            担当授業・生徒管理
                        </h1>
                        <p className="text-sm font-medium text-slate-500 mt-2">
                            あなたの担当する授業の一覧です。各回のスケジュールを確認できます。
                        </p>
                    </div>
                </header>

                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="生徒名、受講コースで検索..."
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all text-slate-900 font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button
                                onClick={() => setViewMode('upcoming')}
                                className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${viewMode === 'upcoming'
                                    ? 'bg-white text-emerald-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                今後の授業
                            </button>
                            <button
                                onClick={() => setViewMode('all')}
                                className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${viewMode === 'all'
                                    ? 'bg-white text-emerald-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                すべての履歴
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {filteredLessons.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {filteredLessons.map(({ lesson, student }, idx) => {
                                    const isCompleted = lesson.status === 'Completed';
                                    const isToday = lesson.date === todayStr;

                                    return (
                                    <div key={lesson.id} className={cn(
                                        "group border rounded-3xl p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden",
                                        isCompleted 
                                            ? "bg-slate-100/50 backdrop-blur-sm border-slate-200/50 shadow-inner opacity-80" 
                                            : "bg-white border-emerald-100/60 hover:border-emerald-300 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-emerald-200/40 hover:-translate-y-1"
                                    )}>
                                        {!isCompleted && (
                                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-emerald-400 to-teal-500 shadow-sm hidden md:block"></div>
                                        )}
                                        {!isCompleted && (
                                            <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500 shadow-sm md:hidden"></div>
                                        )}
                                        <div className="flex items-center gap-4 min-w-[200px] md:pl-4">
                                            <div className={cn(
                                                "w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-black shadow-sm",
                                                isCompleted ? "bg-slate-200 text-slate-500" : isToday ? 'bg-amber-100 text-amber-700' : 'bg-emerald-50 text-emerald-600'
                                            )}>
                                                <span className="text-[10px] uppercase leading-none mb-0.5">{new Date(lesson.date).toLocaleDateString('ja-JP', { weekday: 'short' })}</span>
                                                <span className="text-lg leading-none">{new Date(lesson.date).getDate()}</span>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                                                    {new Date(lesson.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' })}
                                                </div>
                                                <div className={cn(
                                                    "flex items-center gap-2 font-bold",
                                                    isCompleted ? "text-slate-500" : "text-slate-700"
                                                )}>
                                                    <Clock size={14} className={isCompleted ? "text-slate-400" : "text-emerald-500"} />
                                                    {formatTimeRange(lesson.time, lesson.duration)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 flex-1">
                                            <div className="flex items-center gap-3 min-w-[150px]">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shadow-sm border border-white/50",
                                                    isCompleted ? "bg-slate-200 text-slate-400" : "bg-indigo-50 text-indigo-600"
                                                )}>
                                                    {student?.name[0] || 'U'}
                                                </div>
                                                <div>
                                                    <div className={cn(
                                                        "text-base font-black transition-colors",
                                                        isCompleted ? "text-slate-500" : "text-slate-800 group-hover:text-emerald-700"
                                                    )}>{lesson.studentName || student?.name || '不明な生徒'}</div>
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{student?.course}</div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className={cn(
                                                    "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm",
                                                    isCompleted ? "bg-slate-200 text-slate-500" : "bg-emerald-50 text-emerald-700 border border-emerald-100/50"
                                                )}>
                                                    {lesson.course}
                                                </span>
                                                {isCompleted ? (
                                                    <span className="px-3 py-1.5 bg-slate-200/80 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1 backdrop-blur-md border border-white/50 shadow-sm">
                                                        <CheckCircle2 size={12} />完了済み
                                                    </span>
                                                ) : isToday ? (
                                                    <span className="px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-wider animate-pulse border border-amber-200/50 shadow-sm flex items-center gap-1">
                                                        <Calendar size={12} />本日
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-wider border border-blue-200/50 shadow-sm">
                                                        予約済み
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end gap-3 shrink-0">
                                            <button
                                                onClick={() => openUrlModal(lesson)}
                                                className={cn(
                                                    "p-2.5 rounded-xl transition-all flex items-center gap-2 text-xs font-bold shadow-sm",
                                                    isCompleted
                                                        ? "bg-slate-100 text-slate-400 hover:bg-slate-200"
                                                        : lesson.meetingUrl
                                                            ? "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-100/50"
                                                            : "bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                                                )}
                                                title={lesson.meetingUrl ? 'URLを変更' : 'URLを設定'}
                                            >
                                                <Video size={16} />
                                                <span className="hidden sm:inline">{lesson.meetingUrl ? 'URL設定済み' : 'URL未設定'}</span>
                                            </button>

                                            {!isCompleted ? (
                                                <button
                                                    onClick={() => openAssessModal(lesson)}
                                                    className="px-4 py-2 bg-white border-2 border-emerald-500 hover:bg-emerald-50 text-emerald-600 rounded-xl transition-all flex items-center gap-2 text-xs font-bold shadow-sm shadow-emerald-500/10"
                                                >
                                                    <FileText size={14} />
                                                    カルテ入力
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => openAssessModal(lesson)}
                                                    className="px-4 py-2 bg-white border-2 border-slate-300 hover:bg-slate-50 text-slate-600 rounded-xl transition-all flex items-center gap-2 text-xs font-bold shadow-sm"
                                                >
                                                    <Search size={14} />
                                                    カルテ確認
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )})}
                            </div>
                        ) : (
                            <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                                <Calendar size={48} className="mx-auto text-slate-200 mb-4" />
                                <p className="text-slate-400 font-medium">該当する授業が見つかりませんでした。</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isAssessModalOpen && selectedLesson && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAssessModalOpen(false)}></div>
                    <form onSubmit={handleAssessSubmit} className="relative bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col md:flex-row max-h-[90vh]">
                        {/* ... Modal content ... */}
                        <div className="flex-1 flex flex-col overflow-y-auto text-left">
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
                                        <MessageSquare className="text-indigo-500" size={16} />
                                        本日やったこと (生徒への公開フィードバック)
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
                                        <Zap className="text-blue-500" size={16} />
                                        次回の授業範囲
                                    </h4>
                                    <p className="text-[11px] text-slate-500 font-medium">次回レッスンで扱う予定の範囲を記入してください。（生徒に公開されます）</p>
                                    <textarea
                                        className="w-full h-20 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium resize-none leading-relaxed"
                                        placeholder="例: Unit 5 の Vocabulary と Grammar の解説..."
                                        value={assessmentData.nextScope}
                                        onChange={(e) => setAssessmentData({ ...assessmentData, nextScope: e.target.value })}
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
                                        講師間共有ノート / 次期学習範囲 (非公開)
                                    </h4>
                                    <p className="text-[11px] text-slate-500 font-medium">次回学習する予定の範囲や、他の講師・管理者への引き継ぎ事項です。生徒には表示されません。</p>
                                    <textarea
                                        className="w-full h-20 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 font-medium resize-none leading-relaxed"
                                        placeholder="例: 次回は Unit 5 のリスニング問題からスタートしてください。/ 助動詞の理解が弱いため復習が必要です。"
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
                                        {selectedLesson?.status === 'Completed' ? '閉じる' : 'キャンセル'}
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

                        <div className="hidden md:flex flex-col w-80 bg-slate-50 border-l border-slate-100 text-left">
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
                                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">{lastRecord.date} | 担当: {lastRecord.teacher}</p>
                                            <p className="text-sm font-bold text-slate-800">{lastRecord.title}</p>
                                        </div>

                                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative">
                                            <div className="absolute -top-3 left-4 bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                                                Feedback
                                            </div>
                                            <p className="text-xs text-slate-600 leading-relaxed mt-2 whitespace-pre-wrap">
                                                {lastRecord.feedback}
                                            </p>
                                        </div>

                                        {lastRecord.homework && (
                                            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 relative mt-4">
                                                <div className="absolute -top-3 left-4 bg-amber-200 text-amber-800 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                                                    Homework
                                                </div>
                                                <p className="text-xs text-amber-900 leading-relaxed mt-2 whitespace-pre-wrap font-bold">
                                                    {lastRecord.homework}
                                                </p>
                                            </div>
                                        )}

                                        {lastRecord.internalNote && (
                                            <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 relative mt-4">
                                                <div className="absolute -top-3 left-4 bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                                                    引継ぎノート / 次回学習範囲
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
                            <h3 className="text-xl font-black text-slate-800 tracking-tight text-left">Google Meet URL設定</h3>
                            <button type="button" onClick={() => setIsUrlModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4 text-left">
                            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 mb-6">
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">Target Lesson</p>
                                <p className="text-sm font-bold text-indigo-900">{selectedLesson.studentName} | {selectedLesson.course}</p>
                                <p className="text-[10px] font-bold text-indigo-500 mt-0.5">{selectedLesson.date} {selectedLesson.time}</p>
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
