'use client';

import { useState, useEffect } from 'react';
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Clock,
    Video,
    FileText,
    CheckCircle2,
    MessageSquare,
    Star,
    Award,
    TrendingUp,
    Zap,
    X,
    Plus,
    Trash2,
    History,
    BookOpen,
    PencilLine,
    AlertCircle,
    User,
    ClipboardCheck
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';
import { Teacher, LessonSchedule, Student, LessonRecord } from '@/lib/data-store';
import { 
    getTeacherShiftsData, 
    updateLessonMeetingUrl, 
    submitLessonKarte, 
    getRecentRecordsByStudent, 
    getRecordByLessonId, 
    revokeLessonKarte 
} from '@/lib/actions/teacher';
import { getStudentGrammarMastery } from '@/lib/actions/grammar';
import GrammarMasteryGrid from '@/components/GrammarMasteryGrid';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const parseExpressions = (data: any) => {
    if (!data || (typeof data === 'string' && !data.trim())) {
        return [{ expression: '', meaning: '' }];
    }
    if (Array.isArray(data)) return data.length > 0 ? data : [{ expression: '', meaning: '' }];
    try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {
        return [{ expression: String(data), meaning: '' }];
    }
    return [{ expression: '', meaning: '' }];
};

export default function TeacherShiftsPage() {
    const [teacher, setTeacher] = useState<Teacher | null>(null);
    const [schedules, setSchedules] = useState<(LessonSchedule & { student?: Student })[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());
    
    // Formatting today's date in Tokyo timezone as YYYY-MM-DD
    const getTokyoTodayStr = () => {
        return new Intl.DateTimeFormat('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Asia/Tokyo'
        }).format(new Date()).replace(/\//g, '-');
    };

    const [selectedDateStr, setSelectedDateStr] = useState<string>('');

    // Modals State
    const [isAssessModalOpen, setIsAssessModalOpen] = useState(false);
    const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState<any>(null);
    const [meetingUrlInput, setMeetingUrlInput] = useState('');
    const [lastRecord, setLastRecord] = useState<LessonRecord | null>(null);
    
    const [assessmentData, setAssessmentData] = useState({
        title: '',
        feedback: '',
        todayTest: '',
        nextScope: '',
        importantExpressions: [{ expression: '', meaning: '' }] as { expression: string, meaning: string }[],
        homework: '',
        internalNote: '',
        grammar: 50,
        vocab: 50,
        pronunciation: 50,
        fluency: 50,
    });

    const [grammarMastery, setGrammarMastery] = useState<any[]>([]);
    const [isLoadingMastery, setIsLoadingMastery] = useState(false);

    // Initial Load
    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (!userId) return;

        setSelectedDateStr(getTokyoTodayStr());

        getTeacherShiftsData(userId).then(data => {
            if (data && data.teacher) {
                setTeacher(data.teacher as any);
                setSchedules(data.schedules as any);
            }
            setLoading(false);
        });
    }, []);

    const refreshData = () => {
        const userId = localStorage.getItem('user_id');
        if (!userId) return;
        getTeacherShiftsData(userId).then(data => {
            if (data && data.schedules) {
                setSchedules(data.schedules as any);
            }
        });
    };

    // Modal Handlers
    const openAssessModal = async (lesson: any) => {
        setSelectedLesson(lesson);
        setLastRecord(null);

        try {
            if (lesson.status === 'Completed') {
                const currentRecord = await getRecordByLessonId(lesson.id);
                if (currentRecord) {
                    setAssessmentData({
                        title: currentRecord.title || lesson.course || '',
                        feedback: currentRecord.feedback || '',
                        todayTest: currentRecord.todayTest || '',
                        nextScope: (currentRecord as any).nextScope || '',
                        importantExpressions: parseExpressions((currentRecord as any).importantExpressions),
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
                        todayTest: '',
                        nextScope: '',
                        importantExpressions: [{ expression: '', meaning: '' }],
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
                    todayTest: '',
                    nextScope: '',
                    importantExpressions: [{ expression: '', meaning: '' }],
                    homework: '',
                    internalNote: '',
                    grammar: 50,
                    vocab: 50,
                    pronunciation: 50,
                    fluency: 50,
                });
            }

            const record = await getRecentRecordsByStudent(lesson.studentId, lesson.course);
            setLastRecord(record as any);
        } catch (error) {
            console.error('Error fetching record data:', error);
            setAssessmentData({
                title: lesson.course || '',
                feedback: '',
                todayTest: '',
                nextScope: '',
                importantExpressions: [{ expression: '', meaning: '' }],
                homework: '',
                internalNote: '',
                grammar: 50,
                vocab: 50,
                pronunciation: 50,
                fluency: 50
            });
        }
        setIsAssessModalOpen(true);

        setIsLoadingMastery(true);
        try {
            const mastery = await getStudentGrammarMastery(lesson.studentId);
            setGrammarMastery(mastery);
        } catch (error) {
            console.error('Error fetching grammar mastery:', error);
        } finally {
            setIsLoadingMastery(false);
        }
    };

    const handleAssessSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedLesson || !teacher) return;

        try {
            const validExpressions = assessmentData.importantExpressions.filter(e => e.expression.trim() || e.meaning.trim());
            const expressionsString = validExpressions.length > 0 ? JSON.stringify(validExpressions) : '';

            const result = await submitLessonKarte({
                lessonId: selectedLesson.id,
                studentId: selectedLesson.studentId,
                date: selectedLesson.date,
                teacherName: teacher.name,
                title: assessmentData.title || selectedLesson.course,
                feedback: assessmentData.feedback,
                todayTest: assessmentData.todayTest,
                nextScope: assessmentData.nextScope,
                importantExpressions: expressionsString,
                homework: assessmentData.homework,
                internalNote: assessmentData.internalNote,
                grammar: assessmentData.grammar,
                vocab: assessmentData.vocab,
                pronunciation: assessmentData.pronunciation,
                fluency: assessmentData.fluency
            });

            if (result.success) {
                // Update local state and refresh
                setSchedules(prev => prev.map(s =>
                    s.id === selectedLesson.id ? { ...s, status: 'Completed' } : s
                ));
                setIsAssessModalOpen(false);
                setSelectedLesson(null);
                alert('カルテを保存・送信しました。');
                refreshData();
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

    const handleUrlSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedLesson) return;

        try {
            const result = await updateLessonMeetingUrl(selectedLesson.id, meetingUrlInput);
            if (result.success) {
                setSchedules(prev => prev.map(s => s.id === selectedLesson.id ? { ...s, meetingUrl: meetingUrlInput } : s));
                setIsUrlModalOpen(false);
                setSelectedLesson(null);
                refreshData();
            } else {
                alert(result.error || 'URLの更新に失敗しました');
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert('通信エラーが発生しました');
        }
    };

    const handleRevokeKarte = async () => {
        if (!selectedLesson || !confirm('このカルテを取り消してよろしいですか？\n授業ステータスも未完了（Scheduled）に戻ります。')) return;

        try {
            const result = await revokeLessonKarte(selectedLesson.id);
            if (result.success) {
                setSchedules(prev => prev.map(s =>
                    s.id === selectedLesson.id ? { ...s, status: 'Scheduled' } : s
                ));
                setIsAssessModalOpen(false);
                setSelectedLesson(null);
                alert('カルテを取り消しました。');
                refreshData();
            } else {
                alert(result.error || '取り消しに失敗しました');
            }
        } catch (error) {
            console.error('Revoke error:', error);
            alert('通信エラーが発生しました');
        }
    };

    // Date calculations
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    const prevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1));

    const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

    // Generate month prefix for checking active month schedules (e.g. YYYY-MM)
    const activeMonthPrefix = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;

    // Filter schedules for the currently displayed month
    const activeMonthSchedules = schedules.filter(s => {
        const normalizedDate = s.date.replace(/\//g, '-');
        return normalizedDate.startsWith(activeMonthPrefix);
    });

    // Statistics calculations
    const stats = (() => {
        let totalLessons = activeMonthSchedules.length;
        let completed = activeMonthSchedules.filter(s => s.status === 'Completed').length;
        let scheduled = activeMonthSchedules.filter(s => s.status === 'Scheduled').length;
        let cancelled = activeMonthSchedules.filter(s => s.status === 'Cancelled').length;
        
        let totalMinutes = activeMonthSchedules
            .filter(s => s.status === 'Completed' || s.status === 'Scheduled')
            .reduce((acc, s) => acc + (parseInt(s.duration) || 50), 0);
        let totalHours = (totalMinutes / 60).toFixed(1);

        return {
            totalLessons,
            completed,
            scheduled,
            cancelled,
            totalHours
        };
    })();

    // Generate calendar days
    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push({ empty: true });
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dateStrSlash = dateStr.replace(/-/g, '/');

        const daySchedules = schedules.filter(s => s.date === dateStr || s.date === dateStrSlash);

        calendarDays.push({
            empty: false,
            day,
            dateStr,
            schedules: daySchedules
        });
    }

    const isDateToday = (day: number) => {
        const today = new Date();
        return today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
    };

    // Filter schedules for the selected day
    const selectedDaySchedules = schedules.filter(s => {
        const normalizedDate = s.date.replace(/\//g, '-');
        return normalizedDate === selectedDateStr;
    }).sort((a, b) => a.time.localeCompare(b.time));

    if (loading) return null;

    return (
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-50 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-emerald-200">
                            <CalendarIcon size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-800 tracking-tight">シフトカレンダー</h1>
                            <p className="text-slate-500 text-sm">月間のシフト確認と授業カルテの管理</p>
                        </div>
                    </div>
                </header>

                {/* Monthly Stats Cards */}
                <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">今月の総レッスン数</span>
                        <div className="flex items-baseline gap-1 mt-2">
                            <span className="text-2xl font-black text-slate-850">{stats.totalLessons}</span>
                            <span className="text-xs text-slate-500 font-medium">件</span>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">総指導時間</span>
                        <div className="flex items-baseline gap-1 mt-2">
                            <span className="text-2xl font-black text-indigo-600">{stats.totalHours}</span>
                            <span className="text-xs text-indigo-500 font-medium">時間</span>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">完了済みレッスン</span>
                        <div className="flex items-baseline gap-1 mt-2">
                            <span className="text-2xl font-black text-emerald-600">{stats.completed}</span>
                            <span className="text-xs text-emerald-500 font-medium">件</span>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">予約中レッスン</span>
                        <div className="flex items-baseline gap-1 mt-2">
                            <span className="text-2xl font-black text-amber-500">{stats.scheduled}</span>
                            <span className="text-xs text-amber-500 font-medium">件</span>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between col-span-2 md:col-span-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">キャンセル数</span>
                        <div className="flex items-baseline gap-1 mt-2">
                            <span className="text-2xl font-black text-rose-500">{stats.cancelled}</span>
                            <span className="text-xs text-rose-500 font-medium">件</span>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Interactive Calendar */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm">
                            {/* Calendar Navigation */}
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                                    <CalendarIcon className="text-emerald-600" size={22} />
                                    {currentYear}年 {monthNames[currentMonth]}
                                </h3>
                                <div className="flex gap-2">
                                    <button onClick={prevMonth} className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button onClick={nextMonth} className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Calendar Header Days */}
                            <div className="grid grid-cols-7 gap-2 mb-2">
                                {['日', '月', '火', '水', '木', '金', '土'].map((day, idx) => (
                                    <div key={idx} className={cn(
                                        "text-center text-xs font-black uppercase tracking-wider py-2",
                                        idx === 0 ? "text-rose-500" : idx === 6 ? "text-blue-500" : "text-slate-400"
                                    )}>
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-2">
                                {calendarDays.map((cell, idx) => {
                                    const isSelected = !cell.empty && cell.dateStr === selectedDateStr;
                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => {
                                                if (!cell.empty) {
                                                    setSelectedDateStr(cell.dateStr!);
                                                }
                                            }}
                                            className={cn(
                                                "min-h-[75px] md:min-h-[95px] p-2 rounded-xl transition-all relative border flex flex-col justify-between",
                                                cell.empty
                                                    ? "bg-transparent border-transparent cursor-default pointer-events-none"
                                                    : isDateToday(cell.day!)
                                                        ? "bg-emerald-50/50 border-emerald-300"
                                                        : "bg-white border-slate-100",
                                                !cell.empty && "hover:border-emerald-500 hover:shadow-md cursor-pointer",
                                                isSelected && "ring-2 ring-emerald-500 border-transparent shadow-sm bg-emerald-50/20"
                                            )}
                                        >
                                            {!cell.empty && (
                                                <>
                                                    <div className="flex justify-between items-center">
                                                        <span className={cn(
                                                            "text-xs md:text-sm font-bold flex items-center justify-center w-6 h-6 rounded-full",
                                                            isDateToday(cell.day!) ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30" : "text-slate-700"
                                                        )}>
                                                            {cell.day}
                                                        </span>
                                                        {cell.schedules && cell.schedules.length > 0 && (
                                                            <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full shrink-0">
                                                                {cell.schedules.length}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Day Schedule Thumbnails */}
                                                    <div className="mt-2 space-y-1 overflow-hidden flex-1 flex flex-col justify-end">
                                                        {/* Desktop view */}
                                                        <div className="hidden md:block space-y-1">
                                                            {cell.schedules?.slice(0, 2).map((item, i) => (
                                                                <div 
                                                                    key={i} 
                                                                    className={cn(
                                                                        "text-[9px] font-bold px-1.5 py-0.5 rounded truncate border leading-tight",
                                                                        item.status === 'Completed'
                                                                            ? "bg-slate-100 text-slate-500 border-slate-200"
                                                                            : item.status === 'Cancelled'
                                                                                ? "bg-rose-50 text-rose-600 border-rose-100"
                                                                                : "bg-emerald-50 text-emerald-700 border-emerald-100"
                                                                    )}
                                                                    title={`${item.time} - ${item.studentName}`}
                                                                >
                                                                    {item.time.split('-')[0].trim()} {item.studentName.split(' ')[0]}
                                                                </div>
                                                            ))}
                                                            {cell.schedules && cell.schedules.length > 2 && (
                                                                <div className="text-[8px] font-black text-slate-400 text-center uppercase tracking-widest leading-none pt-0.5">
                                                                    他 {cell.schedules.length - 2} 件
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Mobile view dots */}
                                                        <div className="flex md:hidden items-center justify-center gap-1">
                                                            {cell.schedules?.map((item, i) => (
                                                                <div 
                                                                    key={i} 
                                                                    className={cn(
                                                                        "w-1.5 h-1.5 rounded-full",
                                                                        item.status === 'Completed'
                                                                            ? "bg-slate-400"
                                                                            : item.status === 'Cancelled'
                                                                                ? "bg-rose-500"
                                                                                : "bg-emerald-500"
                                                                    )}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right: Selected Date Details List */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm flex flex-col h-full min-h-[400px]">
                            {/* Selected Date Header */}
                            <div className="border-b border-slate-100 pb-4 mb-4">
                                <h3 className="text-base font-black text-slate-800 tracking-tight uppercase flex items-center gap-2">
                                    <ClipboardCheck className="text-emerald-500" size={20} />
                                    {(() => {
                                        if (!selectedDateStr) return '日付を選択してください';
                                        const [y, m, d] = selectedDateStr.split('-');
                                        return `${y}年${m}月${d}日 のスケジュール`;
                                    })()}
                                </h3>
                                <p className="text-xs text-slate-400 font-bold mt-1">
                                    {selectedDaySchedules.length} 件の授業予定があります
                                </p>
                            </div>

                            {/* Schedule Items List */}
                            <div className="flex-1 overflow-y-auto space-y-4 max-h-[500px] pr-1">
                                {selectedDaySchedules.map((lesson) => {
                                    const isCompleted = lesson.status === 'Completed';
                                    const isCancelled = lesson.status === 'Cancelled';
                                    
                                    return (
                                        <div 
                                            key={lesson.id} 
                                            className={cn(
                                                "p-4 rounded-2xl border transition-all text-left flex flex-col gap-3 relative overflow-hidden",
                                                isCompleted 
                                                    ? "bg-slate-50 border-slate-200 opacity-80" 
                                                    : isCancelled
                                                        ? "bg-rose-50/30 border-rose-100 opacity-70"
                                                        : "bg-white border-emerald-100 hover:border-emerald-300 hover:shadow-md"
                                            )}
                                        >
                                            {!isCompleted && !isCancelled && (
                                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500" />
                                            )}

                                            {/* Top info and status */}
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                                    <Clock size={14} className="text-slate-400" />
                                                    <span>{lesson.time} ({lesson.duration})</span>
                                                </div>
                                                <span className={cn(
                                                    "text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm border",
                                                    isCompleted 
                                                        ? "bg-slate-200 text-slate-600 border-slate-350"
                                                        : isCancelled
                                                            ? "bg-rose-100 text-rose-700 border-rose-200"
                                                            : "bg-emerald-50 text-emerald-700 border-emerald-100"
                                                )}>
                                                    {isCompleted ? '完了' : isCancelled ? 'キャンセル' : '予約中'}
                                                </span>
                                            </div>

                                            {/* Student and Course info */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
                                                        {lesson.studentName.charAt(0)}
                                                    </div>
                                                    <h4 className="font-bold text-slate-800 text-sm">{lesson.studentName}</h4>
                                                </div>
                                                <p className="text-xs text-slate-500 font-medium ml-7">{lesson.course} • {lesson.type}</p>
                                            </div>

                                            {/* Action buttons */}
                                            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-50 mt-1 justify-end">
                                                {/* URL setting */}
                                                {!isCancelled && (
                                                    <button
                                                        onClick={() => openUrlModal(lesson)}
                                                        className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-[10px] font-black text-slate-600 bg-white hover:bg-slate-50 active:scale-95 transition-all"
                                                    >
                                                        {lesson.meetingUrl ? 'URL変更' : 'URL登録'}
                                                    </button>
                                                )}

                                                {/* Classroom Entry */}
                                                {!isCancelled && lesson.meetingUrl && (
                                                    <a
                                                        href={lesson.meetingUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-2.5 py-1.5 bg-indigo-600 text-white rounded-lg text-[10px] font-black hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-1 shadow-sm"
                                                    >
                                                        <Video size={10} />
                                                        教室入室
                                                    </a>
                                                )}

                                                {/* Karte Input */}
                                                {!isCancelled && (
                                                    <button
                                                        onClick={() => openAssessModal(lesson)}
                                                        className={cn(
                                                            "px-2.5 py-1.5 rounded-lg text-[10px] font-black active:scale-95 transition-all flex items-center gap-1 border",
                                                            isCompleted
                                                                ? "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                                                                : "bg-emerald-500 text-white border-transparent hover:bg-emerald-600 shadow-sm"
                                                        )}
                                                    >
                                                        <FileText size={10} />
                                                        {isCompleted ? 'カルテ編集' : 'カルテ入力'}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}

                                {selectedDaySchedules.length === 0 && (
                                    <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
                                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3 border border-slate-200">
                                            <CalendarIcon size={20} />
                                        </div>
                                        <p className="text-slate-500 font-bold text-sm">レッスン予定がありません</p>
                                        <p className="text-slate-400 text-xs mt-1">他の日付を選択してご確認ください。</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* URL Modal */}
            {isUrlModalOpen && selectedLesson && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsUrlModalOpen(false)}></div>
                    <form onSubmit={handleUrlSubmit} className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                            <h3 className="text-lg font-black text-slate-800">授業の会議URL設定</h3>
                            <button type="button" onClick={() => setIsUrlModalOpen(false)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-bold text-slate-400 mb-1">生徒名</p>
                                <p className="text-sm font-bold text-slate-800">{selectedLesson.studentName}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 mb-1">授業日時</p>
                                <p className="text-sm font-bold text-slate-800">{selectedLesson.date} {selectedLesson.time}</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-700 block">会議URL (Google Meetなど)</label>
                                <input
                                    type="url"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-bold"
                                    placeholder="https://meet.google.com/abc-defg-hij"
                                    value={meetingUrlInput}
                                    onChange={(e) => setMeetingUrlInput(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6 border-t border-slate-100 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsUrlModalOpen(false)}
                                className="px-5 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                            >
                                キャンセル
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                            >
                                保存する
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Karte Modal (Lesson Assessment) */}
            {isAssessModalOpen && selectedLesson && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAssessModalOpen(false)}></div>
                    <form onSubmit={handleAssessSubmit} className="relative bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col md:flex-row max-h-[90vh]">
                        <div className="flex-1 flex flex-col overflow-y-auto">
                            <div className="px-6 py-5 border-b border-slate-100 bg-emerald-50 text-emerald-900 flex items-center justify-between shrink-0">
                                <div>
                                    <h3 className="text-lg font-black mb-1">授業カルテ作成</h3>
                                    <p className="text-xs font-bold text-emerald-700 tracking-wide">
                                        生徒: <span className="bg-white px-2 py-0.5 rounded shadow-sm">{selectedLesson.studentName}</span>
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
                                        <ClipboardCheck className="text-violet-500" size={16} />
                                        本日のテスト
                                    </h4>
                                    <p className="text-[11px] text-slate-500 font-medium">テスト名や結果を記入してください。（任意・生徒に公開されます）</p>
                                    <textarea
                                        className="w-full h-20 p-4 bg-violet-50/30 border border-violet-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 font-medium resize-none leading-relaxed"
                                        placeholder="例: Unit 3 単語テスト：18/20点"
                                        value={assessmentData.todayTest}
                                        onChange={(e) => setAssessmentData({ ...assessmentData, todayTest: e.target.value })}
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
                                        value={assessmentData.nextScope || ''}
                                        onChange={(e) => setAssessmentData({ ...assessmentData, nextScope: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
                                        <Star className="text-yellow-500" size={16} />
                                        本日の重要表現・単語
                                    </h4>
                                    <p className="text-[11px] text-slate-500 font-medium">生徒が復習しやすいように、今日学んだ重要なフレーズや単語を記入してください。（生徒に公開されます）</p>
                                    <div className="space-y-2 mt-2">
                                        {assessmentData.importantExpressions.map((item, index) => (
                                            <div key={index} className="flex gap-2 items-start">
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        placeholder="英語・フレーズ"
                                                        className="w-full p-3 bg-yellow-50/30 border border-yellow-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 font-bold"
                                                        value={item.expression}
                                                        onChange={(e) => {
                                                            const newExp = [...assessmentData.importantExpressions];
                                                            newExp[index].expression = e.target.value;
                                                            setAssessmentData({ ...assessmentData, importantExpressions: newExp });
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        placeholder="和訳・意味"
                                                        className="w-full p-3 bg-yellow-50/30 border border-yellow-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 font-medium"
                                                        value={item.meaning}
                                                        onChange={(e) => {
                                                            const newExp = [...assessmentData.importantExpressions];
                                                            newExp[index].meaning = e.target.value;
                                                            setAssessmentData({ ...assessmentData, importantExpressions: newExp });
                                                        }}
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newExp = assessmentData.importantExpressions.filter((_, i) => i !== index);
                                                        if (newExp.length === 0) newExp.push({ expression: '', meaning: '' });
                                                        setAssessmentData({ ...assessmentData, importantExpressions: newExp });
                                                    }}
                                                    className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setAssessmentData({
                                                    ...assessmentData,
                                                    importantExpressions: [...assessmentData.importantExpressions, { expression: '', meaning: '' }]
                                                });
                                            }}
                                            className="text-xs font-bold text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100 flex items-center gap-1 px-3 py-2 rounded-lg transition-colors mt-2"
                                        >
                                            <Plus size={14} /> 単語・表現を追加する
                                        </button>
                                    </div>
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

                                <div className="space-y-3 pt-6 border-t border-slate-100">
                                    <h4 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
                                        <BookOpen className="text-emerald-500" size={16} />
                                        文法習得状況の記録
                                    </h4>
                                    <p className="text-[11px] text-slate-500 font-medium">中1〜中3レベルの文法項目の理解度を選択してください。</p>
                                    
                                    <div className="bg-slate-50 rounded-3xl p-6 md:p-8 mt-2 border border-slate-200 shadow-inner text-center">
                                        {isLoadingMastery ? (
                                            <div className="flex flex-col items-center justify-center py-10 gap-3">
                                                <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                                                <p className="text-xs font-bold text-slate-400">習得状況を読み込み中...</p>
                                            </div>
                                        ) : (
                                            <GrammarMasteryGrid 
                                                studentId={selectedLesson.studentId} 
                                                initialPoints={grammarMastery} 
                                                isAdmin={true} 
                                            />
                                        )}
                                    </div>
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

                        {/* Sidebar History (Desktop only) */}
                        <div className="hidden md:flex flex-col w-80 bg-slate-50 border-l border-slate-100 shrink-0">
                            <div className="p-4 border-b border-slate-200 flex justify-end shrink-0">
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

                                        {(lastRecord as any)?.importantExpressions && (
                                            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 relative mt-4">
                                                <div className="absolute -top-3 left-4 bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded text-[10px] font-black uppercase flex items-center gap-1">
                                                    <Star size={10} /> Expressions
                                                </div>
                                                <div className="mt-3 space-y-2">
                                                    {(() => {
                                                        const exps = parseExpressions((lastRecord as any).importantExpressions);
                                                        return exps.map((exp: any, i: number) => (
                                                            exp.expression ? (
                                                                <div key={i} className="text-xs text-yellow-900 flex flex-col gap-0.5 border-b border-yellow-200/50 pb-2 last:border-0 last:pb-0">
                                                                    <span className="font-bold">Eng: {exp.expression}</span>
                                                                    <span className="opacity-80">Jpn: {exp.meaning}</span>
                                                                </div>
                                                            ) : null
                                                        ));
                                                    })()}
                                                </div>
                                            </div>
                                        )}

                                        {lastRecord?.homework && (
                                            <div className="bg-[#FFFDF5] p-4 rounded-xl border border-amber-200 relative mt-4">
                                                <div className="absolute -top-3 left-4 bg-amber-200 text-amber-800 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                                                    Homework
                                                </div>
                                                <p className="text-xs text-slate-700 leading-relaxed mt-2 whitespace-pre-wrap">
                                                    {lastRecord?.homework}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-10">
                                        <p className="text-slate-400 font-bold text-xs">過去のカルテ履歴はありません。</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </main>
    );
}
