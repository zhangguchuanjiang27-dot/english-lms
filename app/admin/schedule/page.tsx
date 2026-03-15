'use client';

import { useState, useEffect } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Search,
    Users,
    Clock,
    Video,
    MoreHorizontal,
    X,
    Calendar,
    Check
} from 'lucide-react';
import { DataStore, LessonSchedule, Student } from '@/lib/data-store';
import { getStudents, getTeachers, addLessonSchedule, deleteLessonSchedule, getAllSchedules, addLessonRecord } from '@/lib/actions/admin';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const COURSES = ['英語', '中一英語', '中二英語', '中三英語', '数学', '中一数学', '中二数学', '中三数学'];
const TIME_SLOTS = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

export default function SchedulePage() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [schedule, setSchedule] = useState<LessonSchedule[]>([]);
    const [filterTeacher, setFilterTeacher] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
    const [selectedLessonForCompletion, setSelectedLessonForCompletion] = useState<LessonSchedule | null>(null);
    const [completionData, setCompletionData] = useState({
        title: '',
        grammar: 80,
        vocab: 80,
        pronunciation: 80,
        fluency: 80,
        feedback: '',
        internalNote: ''
    });

    const [students, setStudents] = useState<Student[]>([]);
    const [teachersState, setTeachersState] = useState<{ name: string }[]>([]);
    const [newLesson, setNewLesson] = useState<Partial<LessonSchedule>>({
        date: selectedDate,
        time: '10:00',
        duration: '50m',
        course: '英語',
        type: 'General',
        status: 'Scheduled'
    });

    const [currentMonth, setCurrentMonth] = useState(new Date());

    useEffect(() => {
        refreshData();
        getStudents().then(data => setStudents(data as any));
        getTeachers().then(data => setTeachersState(data as any));
        setNewLesson(prev => ({ ...prev, date: selectedDate }));
    }, [selectedDate]);

    const refreshData = () => {
        getAllSchedules().then(data => setSchedule(data as any));
    };

    const handleAddLesson = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newLesson.studentId || !newLesson.teacherName) return;

        const student = students.find(s => s.id === newLesson.studentId);

        addLessonSchedule({
            studentId: newLesson.studentId,
            studentName: student?.name || 'Unknown',
            teacherName: newLesson.teacherName,
            date: newLesson.date || selectedDate,
            time: newLesson.time || '10:00',
            duration: newLesson.duration || '50m',
            course: newLesson.course || '英語',
            type: newLesson.type as any || 'General',
        }).then(res => {
            if (res.success) {
                setIsModalOpen(false);
                refreshData();
            } else {
                alert(res.error);
            }
        });
    };

    const handleDelete = (id: string, lesson: any) => {
        if (confirm('この予約を削除しますか？')) {
            deleteLessonSchedule(id, lesson.studentId).then(res => {
                if (res.success) {
                    refreshData();
                } else {
                    alert(res.error);
                }
            });
        }
    };

    const handleCompleteLesson = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedLessonForCompletion) return;

        addLessonRecord({
            studentId: selectedLessonForCompletion.studentId,
            date: selectedLessonForCompletion.date,
            teacher: selectedLessonForCompletion.teacherName,
            title: completionData.title,
            grammar: completionData.grammar,
            vocab: completionData.vocab,
            pronunciation: completionData.pronunciation,
            fluency: completionData.fluency,
            feedback: completionData.feedback,
            internalNote: completionData.internalNote
        }).then(res => {
            if (res.success) {
                deleteLessonSchedule(selectedLessonForCompletion.id, selectedLessonForCompletion.studentId).then(() => {
                    setIsCompleteModalOpen(false);
                    setSelectedLessonForCompletion(null);
                    setCompletionData({
                        title: '',
                        grammar: 80,
                        vocab: 80,
                        pronunciation: 80,
                        fluency: 80,
                        feedback: '',
                        internalNote: ''
                    });
                    refreshData();
                });
            } else {
                alert(res.error);
            }
        });
    };

    const daySchedule = schedule.filter(s => s.date === selectedDate);

    const filteredSchedule = daySchedule.filter(item => {
        const matchesTeacher = filterTeacher === 'All' || item.teacherName === filterTeacher;
        const matchesSearch = item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.teacherName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTeacher && matchesSearch;
    });

    const changeDate = (days: number) => {
        const current = new Date(selectedDate);
        current.setDate(current.getDate() + days);
        setSelectedDate(current.toISOString().split('T')[0]);
    };

    // --- Calendar Generation ---
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const calendarYear = currentMonth.getFullYear();
    const calendarMonth = currentMonth.getMonth();

    const daysInMonth = getDaysInMonth(calendarYear, calendarMonth);
    const firstDay = getFirstDayOfMonth(calendarYear, calendarMonth);

    const prevMonth = () => setCurrentMonth(new Date(calendarYear, calendarMonth - 1, 1));
    const nextMonth = () => setCurrentMonth(new Date(calendarYear, calendarMonth + 1, 1));

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push({ empty: true });
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayHasLessons = schedule.some(s => s.date === dateStr);
        calendarDays.push({ empty: false, day, dateStr, hasLessons: dayHasLessons });
    }

    return (
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar: Mini Calendar */}
                <aside className="w-80 bg-white border-r-2 border-slate-100 flex flex-col p-6 overflow-y-auto hidden lg:flex">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-black text-slate-800 tracking-tight">
                            {calendarYear}年 {calendarMonth + 1}月
                        </h3>
                        <div className="flex gap-1">
                            <button onClick={prevMonth} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"><ChevronLeft size={16} /></button>
                            <button onClick={nextMonth} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"><ChevronRight size={16} /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-4">
                        {['日', '月', '火', '水', '木', '金', '土'].map(d => (
                            <div key={d} className="text-[10px] font-black text-slate-400 text-center py-2">{d}</div>
                        ))}
                        {calendarDays.map((cell, idx) => (
                            <button
                                key={idx}
                                disabled={cell.empty}
                                onClick={() => cell.dateStr && setSelectedDate(cell.dateStr)}
                                className={cn(
                                    "aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all text-xs font-bold",
                                    cell.empty ? "opacity-0 cursor-default" :
                                        selectedDate === cell.dateStr
                                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                                            : "hover:bg-slate-50 text-slate-700"
                                )}
                            >
                                {cell.day}
                                {!cell.empty && cell.hasLessons && (
                                    <div className={cn(
                                        "w-1 h-1 rounded-full absolute bottom-1.5",
                                        selectedDate === cell.dateStr ? "bg-white" : "bg-indigo-400"
                                    )}></div>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto pt-6 border-t-2 border-slate-50">
                        <div className="bg-indigo-50 rounded-2xl p-4">
                            <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Calendar size={14} />
                                今日のサマリー
                            </h4>
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs font-bold text-slate-600">
                                    <span>総予約数</span>
                                    <span>{schedule.length}件</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold text-slate-600">
                                    <span>今日の授業</span>
                                    <span>{daySchedule.length}件</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Section: Timeline */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="p-8 overflow-y-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight">授業スケジュール</h1>
                                <p className="text-slate-500 font-bold mt-1">講師と生徒の予約管理・タイムライン</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-xl font-black shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all active:scale-95"
                                >
                                    <Plus size={20} />
                                    予約を入れる
                                </button>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 mb-8 flex flex-col md:flex-row gap-4 items-center shadow-sm">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="生徒名、講師名で検索..."
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white transition-all outline-none text-sm font-bold"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <select
                                    className="flex-1 md:w-48 px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm font-black text-slate-700 outline-none focus:border-indigo-600 transition-all cursor-pointer"
                                    value={filterTeacher}
                                    onChange={(e) => setFilterTeacher(e.target.value)}
                                >
                                    <option value="All">全ての講師</option>
                                    {teachersState.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                                </select>
                                <div className="flex items-center bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                    <button onClick={() => changeDate(-1)} className="p-2.5 hover:bg-slate-50 border-r-2 border-slate-200 text-slate-600 active:bg-slate-100"><ChevronLeft size={20} /></button>
                                    <div className="px-6 py-2.5 font-black text-sm min-w-[160px] text-center text-slate-800">
                                        {new Date(selectedDate).toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'short' })}
                                    </div>
                                    <button onClick={() => changeDate(1)} className="p-2.5 hover:bg-slate-50 border-l-2 border-slate-200 text-slate-600 active:bg-slate-100"><ChevronRight size={20} /></button>
                                </div>
                            </div>
                        </div>

                        {/* Timeline View */}
                        <div className="bg-white rounded-[2rem] border-2 border-slate-200 shadow-xl overflow-hidden mb-10">
                            <div className="grid grid-cols-1 divide-y-2 divide-slate-100">
                                {TIME_SLOTS.map(hour => {
                                    const hourPrefix = hour.split(':')[0];
                                    const lessons = filteredSchedule
                                        .filter(l => l.time.startsWith(hourPrefix))
                                        .sort((a, b) => a.time.localeCompare(b.time));
                                    return (
                                        <div key={hour} className="flex group min-h-[100px]">
                                            <div className="w-24 py-6 px-4 text-sm font-black text-slate-400 border-r-2 border-slate-50 flex flex-col justify-start items-center">
                                                {hour}
                                            </div>
                                            <div className="flex-1 p-3 flex gap-4 overflow-x-auto bg-slate-50/20 group-hover:bg-white transition-all">
                                                {lessons.length > 0 ? (
                                                    lessons.map(lesson => (
                                                        <div
                                                            key={lesson.id}
                                                            className={cn(
                                                                "flex-1 min-w-[300px] max-w-[450px] p-4 rounded-2xl border-2 shadow-sm flex flex-col justify-between transition-all hover:shadow-md relative group/card",
                                                                getCourseColor(lesson.type)
                                                            )}
                                                        >
                                                            <div className="flex justify-between items-start mb-3">
                                                                <div>
                                                                    <h3 className="font-black text-base">{lesson.studentName}</h3>
                                                                    <p className="text-[11px] font-black uppercase tracking-widest opacity-70 mt-0.5">{lesson.course} ({lesson.duration})</p>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <button
                                                                        onClick={() => {
                                                                            setSelectedLessonForCompletion(lesson);
                                                                            setIsCompleteModalOpen(true);
                                                                        }}
                                                                        className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-600 transition-colors"
                                                                        title="レッスン完了 (カルテ入力)"
                                                                    >
                                                                        <Check size={16} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDelete(lesson.id, lesson)}
                                                                        className="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                                                                        title="予約キャンセル"
                                                                    >
                                                                        <X size={16} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between mt-auto">
                                                                <div className="flex items-center gap-2.5">
                                                                    <div className="w-7 h-7 rounded-xl bg-white/60 border border-white/40 flex items-center justify-center text-xs font-black shadow-sm">
                                                                        {lesson.teacherName[0]}
                                                                    </div>
                                                                    <span className="text-xs font-black">{lesson.teacherName}</span>
                                                                </div>
                                                                {lesson.meetingUrl ? (
                                                                    <div className="flex items-center gap-2 text-[10px] font-black px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100 shadow-sm text-indigo-700">
                                                                        <Video size={12} />
                                                                        <span className="truncate max-w-[120px]">{lesson.meetingUrl}</span>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center gap-2 text-[10px] font-black px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm text-slate-400">
                                                                        <Video size={12} />
                                                                        URL未設定
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            setNewLesson({ ...newLesson, time: hour });
                                                            setIsModalOpen(true);
                                                        }}
                                                        className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-white/50 hover:bg-white hover:border-indigo-300 hover:shadow-inner transition-all group/btn"
                                                    >
                                                        <div className="flex items-center gap-2 text-xs font-black text-slate-300 group-hover/btn:text-indigo-400 transition-colors">
                                                            <Plus size={14} />
                                                            <span>この時間に予約を入れる</span>
                                                        </div>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Complete Lesson Modal */}
            {isCompleteModalOpen && selectedLessonForCompletion && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
                        <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30 shrink-0">
                            <div>
                                <h2 className="text-xl font-black text-slate-900">カルテ入力 (レッスン完了)</h2>
                                <p className="text-xs font-bold text-slate-500 mt-1">{selectedLessonForCompletion.studentName} さん • {selectedLessonForCompletion.course}</p>
                            </div>
                            <button
                                onClick={() => setIsCompleteModalOpen(false)}
                                className="p-3 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleCompleteLesson} className="flex-1 flex flex-col overflow-hidden">
                            <div className="flex-1 overflow-y-auto p-10 space-y-6 min-h-0">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">レッスンタイトル/トピック</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="例: Unit 4 - Business Negotiation"
                                            className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-sm font-black text-slate-900 transition-all"
                                            value={completionData.title || ''}
                                            onChange={(e) => setCompletionData({ ...completionData, title: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">文法 (Grammar) 0-100</label>
                                            <input type="number" min="0" max="100" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 outline-none focus:border-indigo-600"
                                                value={completionData.grammar} onChange={(e) => setCompletionData({ ...completionData, grammar: parseInt(e.target.value) })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">語彙 (Vocabulary) 0-100</label>
                                            <input type="number" min="0" max="100" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 outline-none focus:border-indigo-600"
                                                value={completionData.vocab} onChange={(e) => setCompletionData({ ...completionData, vocab: parseInt(e.target.value) })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">発音 (Pronunciation) 0-100</label>
                                            <input type="number" min="0" max="100" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 outline-none focus:border-indigo-600"
                                                value={completionData.pronunciation} onChange={(e) => setCompletionData({ ...completionData, pronunciation: parseInt(e.target.value) })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">流暢さ (Fluency) 0-100</label>
                                            <input type="number" min="0" max="100" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 outline-none focus:border-indigo-600"
                                                value={completionData.fluency} onChange={(e) => setCompletionData({ ...completionData, fluency: parseInt(e.target.value) })} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">生徒へのフィードバック</label>
                                        <textarea
                                            required
                                            rows={3}
                                            placeholder="Great job today! Next time let's focus on..."
                                            className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-sm font-black text-slate-900 transition-all resize-none"
                                            value={completionData.feedback || ''}
                                            onChange={(e) => setCompletionData({ ...completionData, feedback: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">内部メモ (生徒には見えません)</label>
                                        <textarea
                                            rows={2}
                                            className="w-full px-5 py-3.5 rounded-2xl bg-amber-50/50 border-2 border-amber-100 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none text-sm font-bold text-slate-900 transition-all resize-none placeholder:text-amber-200"
                                            placeholder="運営や他の講師への引継ぎ事項等"
                                            value={completionData.internalNote || ''}
                                            onChange={(e) => setCompletionData({ ...completionData, internalNote: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-10 pt-4 flex gap-4 shrink-0 bg-white border-t border-slate-50 mt-auto">
                                <button
                                    type="button"
                                    onClick={() => setIsCompleteModalOpen(false)}
                                    className="flex-1 py-4 font-black text-slate-500 hover:bg-slate-100 rounded-2xl transition-all"
                                >
                                    キャンセル
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black shadow-xl shadow-emerald-600/30 transition-all active:scale-95"
                                >
                                    完了としてカルテ保存
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* New Lesson Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
                        <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30 shrink-0">
                            <div>
                                <h2 className="text-xl font-black text-slate-900">新規授業予約</h2>
                                <p className="text-xs font-bold text-slate-500 mt-1">レッスンの枠を確保します</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-3 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddLesson} className="flex-1 flex flex-col overflow-hidden">
                            <div className="flex-1 overflow-y-auto p-10 space-y-6 min-h-0">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">生徒を選択</label>
                                        <select
                                            required
                                            className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-sm font-black text-slate-900 transition-all cursor-pointer"
                                            value={newLesson.studentId || ''}
                                            onChange={(e) => setNewLesson({ ...newLesson, studentId: e.target.value })}
                                        >
                                            <option value="">生徒を選択...</option>
                                            {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">講師を選択</label>
                                        <select
                                            required
                                            className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-sm font-black text-slate-900 transition-all cursor-pointer"
                                            value={newLesson.teacherName || ''}
                                            onChange={(e) => setNewLesson({ ...newLesson, teacherName: e.target.value })}
                                        >
                                            <option value="">講師を選択...</option>
                                            {teachersState.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">日付</label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-sm font-black text-slate-900 transition-all"
                                            value={newLesson.date}
                                            onChange={(e) => setNewLesson({ ...newLesson, date: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">時間</label>
                                        <select
                                            className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-sm font-black text-slate-900 transition-all cursor-pointer"
                                            value={newLesson.time}
                                            onChange={(e) => setNewLesson({ ...newLesson, time: e.target.value })}
                                        >
                                            {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">コース</label>
                                        <select
                                            className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-sm font-black text-slate-900 transition-all cursor-pointer"
                                            value={newLesson.course}
                                            onChange={(e) => setNewLesson({ ...newLesson, course: e.target.value })}
                                        >
                                            {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">レッスンタイプ</label>
                                        <div className="flex gap-2 h-full items-center pt-1">
                                            {['General', 'Premium', 'Exam'].map(type => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => setNewLesson({ ...newLesson, type: type as any })}
                                                    className={cn(
                                                        "flex-1 py-2 text-[10px] font-black rounded-lg border-2 transition-all",
                                                        newLesson.type === type
                                                            ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                                                            : "border-slate-100 text-slate-400 hover:border-slate-200 bg-slate-50"
                                                    )}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Google Meet / 会議URL</label>
                                        <input
                                            type="url"
                                            placeholder="https://meet.google.com/xxx-xxxx-xxx"
                                            className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-sm font-black text-slate-900 transition-all font-mono"
                                            value={newLesson.meetingUrl || ''}
                                            onChange={(e) => setNewLesson({ ...newLesson, meetingUrl: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-10 pt-4 flex gap-4 shrink-0 bg-white border-t border-slate-50 mt-auto">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4 rounded-2xl font-black text-slate-500 hover:bg-slate-100 transition-all text-sm uppercase tracking-widest"
                                >
                                    キャンセル
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-indigo-600/20 transition-all text-sm uppercase tracking-widest active:scale-95"
                                >
                                    予約を確定する
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}

function getCourseColor(type: string | undefined) {
    switch (type) {
        case 'Premium':
            return 'bg-indigo-50 border-indigo-200 text-indigo-900';
        case 'Exam':
            return 'bg-amber-50 border-amber-200 text-amber-900';
        case 'Casual':
            return 'bg-emerald-50 border-emerald-200 text-emerald-900';
        default:
            return 'bg-slate-50 border-slate-200 text-slate-800';
    }
}
