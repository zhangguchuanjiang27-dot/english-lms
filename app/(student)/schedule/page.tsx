'use client';

import {
    Calendar as CalendarIcon,
    Clock,
    Video,
    FileText,
    ChevronLeft,
    ChevronRight,
    PlusCircle,
    AlertCircle,
    X,
    MoreHorizontal,
    User,
    CheckCircle2,
    MessageSquare,
    Star,
    BookOpen,
    Link as LinkIcon,
    PencilLine
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { LessonSchedule, LessonRecord } from '@/lib/data-store';
import { getStudentSchedule } from '@/lib/actions/student';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function StudentSchedulePage() {
    const [schedule, setSchedule] = useState<LessonSchedule[]>([]);
    // Removed unused teachers state
    const [userId, setUserId] = useState('karat');
    const [currentDate, setCurrentDate] = useState(new Date());

    // Modal State
    const [selectedLesson, setSelectedLesson] = useState<LessonSchedule | null>(null);
    const [isKarteModalOpen, setIsKarteModalOpen] = useState(false);
    const [karte, setKarte] = useState<LessonRecord | null>(null);

    const [recordList, setRecordList] = useState<LessonRecord[]>([]);

    useEffect(() => {
        const id = localStorage.getItem('user_id');
        if (!id) return;
        setUserId(id);
        refreshData(id);
    }, [currentDate]);

    const refreshData = async (id: string = userId) => {
        const res = await getStudentSchedule(id);
        if (res) {
            // Sort to ensure correct order
            const mySchedule = (res.schedules as any).sort((a: any, b: any) => {
                const dateA = new Date(`${a.date.replace(/\//g, '-')}T${a.time.split(' ')[0]}:00`);
                const dateB = new Date(`${b.date.replace(/\//g, '-')}T${b.time.split(' ')[0]}:00`);
                return dateB.getTime() - dateA.getTime(); // Newest first
            });
            setSchedule(mySchedule);
            setRecordList(res.records as any);
        }
    };

    // --- Upcoming Lesson Logic (Sync with Dashboard) ---
    const [upcomingLesson, setUpcomingLesson] = useState<LessonSchedule | null>(null);
    const [timeLeft, setTimeLeft] = useState<string>('');

    useEffect(() => {
        const todayStr = new Intl.DateTimeFormat('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Asia/Tokyo'
        }).format(new Date()).replace(/\//g, '-');

        // Find the next scheduled/completed lesson from today onwards
        const next = [...schedule]
            .filter(s => ['Scheduled', 'Completed'].includes(s.status) && s.date >= todayStr)
            .sort((a, b) => {
                if (a.date !== b.date) return a.date.localeCompare(b.date);
                return a.time.localeCompare(b.time);
            })[0];

        setUpcomingLesson(next || null);
    }, [schedule]);

    useEffect(() => {
        if (!upcomingLesson) return;

        const updateTimer = () => {
            const now = new Date();
            const [year, month, day] = upcomingLesson.date.split('-').map(Number);
            const [hours, minutes] = upcomingLesson.time.split(':').map(Number);
            const lessonDate = new Date(year, month - 1, day, hours, minutes, 0, 0);

            const diff = lessonDate.getTime() - now.getTime();
            if (diff <= 0) {
                setTimeLeft('レッスン開始時間です');
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            if (days > 0) {
                setTimeLeft(`あと ${days}日 ${hrs}時間`);
            } else if (hrs > 0) {
                setTimeLeft(`あと ${hrs}時間 ${mins}分`);
            } else {
                setTimeLeft(`あと ${mins}分`);
            }
        };

        updateTimer();
        const timer = setInterval(updateTimer, 60000);
        return () => clearInterval(timer);
    }, [upcomingLesson]);

    const handleOpenKarte = (lesson: LessonSchedule) => {
        setSelectedLesson(lesson);
        // Find matching record
        const match = recordList.find(r => r.date === lesson.date || r.date === lesson.date.replace(/\//g, '-'));
        setKarte(match || null);
        setIsKarteModalOpen(true);
    };



    // --- Calendar Generation ---
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    const prevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1));

    const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

    // Generate Calendar Grid
    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push({ empty: true });
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        // Map to schedule format (could be YYYY-MM-DD or YYYY/MM/DD)
        const dateStrSlash = dateStr.replace(/-/g, '/');

        const daySchedules = schedule.filter(s => s.date === dateStr || s.date === dateStrSlash);

        calendarDays.push({
            empty: false,
            day,
            dateStr, // YYYY-MM-DD
            schedules: daySchedules
        });
    }

    // Helper to check today
    const isToday = (day: number) => {
        const today = new Date();
        return today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
    };


    return (
        <main className="flex-1 p-4 md:p-10 overflow-y-auto bg-slate-50 font-sans">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">スケジュール</h1>
                        <p className="text-slate-500 mt-1">予約済みの授業とカレンダー</p>
                    </div>
                    <div className="flex gap-2">
                        {/* 予約ボタンを削除 */}
                    </div>
                </div>

                {/* Next Lesson Focus */}
                <div className="bg-slate-900 border border-slate-800 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                        {upcomingLesson ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="space-y-6">
                                        <div className="inline-flex items-center gap-2 bg-emerald-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white ring-4 ring-emerald-500/20">
                                            次の授業
                                        </div>
                                        <div className="space-y-2">
                                            <h2 className="text-3xl font-black">{upcomingLesson.date} {upcomingLesson.time.split(' ')[0]} 開始</h2>
                                            <p className="text-indigo-300 font-bold">{upcomingLesson.course}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-4 pt-2">
                                            <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                                                <Video size={18} className="text-indigo-400" />
                                                Google Meet
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                                                <Clock size={18} className="text-indigo-400" />
                                                {upcomingLesson.duration} ( {upcomingLesson.teacherName} 先生 )
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 w-full md:w-auto mt-6 md:mt-0">
                                        <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-5 md:p-6 flex flex-col items-center justify-center border border-white/10 text-center min-w-[200px]">
                                            <p className="text-[10px] text-indigo-300 font-black uppercase tracking-widest mb-2">開始まで</p>
                                            <p className="text-3xl font-black text-white tracking-tight">{timeLeft || '確認中'}</p>
                                            <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                                                <div className="h-full bg-indigo-500 w-2/3"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4">
                                    {upcomingLesson.meetingUrl ? (
                                        <a
                                            href={upcomingLesson.meetingUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full sm:w-auto justify-center bg-white text-slate-900 px-6 py-3 md:px-8 md:py-3.5 rounded-xl md:rounded-2xl font-black text-sm shadow-xl hover:bg-slate-50 transition-all hover:translate-y-[-2px] active:translate-y-0 flex items-center gap-2"
                                        >
                                            教室に入室する
                                            <ChevronRight size={18} />
                                        </a>
                                    ) : (
                                        <button
                                            onClick={() => alert('会議URLが設定されていません。事務局にお問い合わせください。')}
                                            className="w-full sm:w-auto justify-center bg-slate-500 text-white px-6 py-3 md:px-8 md:py-3.5 rounded-xl md:rounded-2xl font-black text-sm shadow-xl opacity-80 cursor-not-allowed flex items-center gap-2"
                                        >
                                            入室準備中
                                            <Clock size={18} />
                                        </button>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <h2 className="text-2xl font-black mb-2">今後の予約はありません</h2>
                                <p className="text-slate-400">定期的に受講して学習を継続しましょう！</p>
                            </div>
                        )}
                    </div>

                    {/* Abstract Decoration */}
                    <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px]"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Interactive Calendar */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 border border-slate-200 shadow-sm">
                            {/* Calendar Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                                    <CalendarIcon className="text-indigo-600" size={24} />
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

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400 py-2">
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1 md:gap-2">
                                {calendarDays.map((cell, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => {
                                            if (!cell.empty && cell.schedules && cell.schedules.length > 0) {
                                                handleOpenKarte(cell.schedules[0]);
                                            }
                                        }}
                                        className={cn(
                                            "min-h-[60px] md:min-h-[80px] p-1 md:p-2 rounded-lg md:rounded-xl transition-all relative border",
                                            cell.empty
                                                ? "bg-transparent border-transparent cursor-default"
                                                : isToday(cell.day!)
                                                    ? "bg-indigo-50 border-indigo-200"
                                                    : "bg-white border-slate-100",
                                            !cell.empty && cell.schedules && cell.schedules.length > 0 && "hover:border-indigo-400 hover:shadow-md cursor-pointer group"
                                        )}
                                    >
                                        {!cell.empty && (
                                            <>
                                                <span className={cn(
                                                    "text-xs md:text-sm font-bold flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full",
                                                    isToday(cell.day!) ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-slate-700"
                                                )}>
                                                    {cell.day}
                                                </span>

                                                {/* Event Indicators */}
                                                <div className="mt-1 md:mt-2 space-y-1">
                                                    {/* Desktop/Tablet View */}
                                                    <div className="hidden md:block space-y-1">
                                                        {cell.schedules?.map((req, i) => (
                                                            <div key={i} className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded truncate" title={`${req.time} - ${req.course}`}>
                                                                {req.time}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    
                                                    {/* Mobile View: Dots Only */}
                                                    <div className="flex md:hidden flex-wrap items-center justify-center gap-1">
                                                        {cell.schedules?.map((req, i) => (
                                                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500" title={`${req.time} - ${req.course}`}></div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Hover View Icon */}
                                                {cell.schedules && cell.schedules.length > 0 && (
                                                    <div className="absolute inset-0 bg-indigo-900/5 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                        <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-indigo-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                                                            <FileText size={16} />
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Selected Date details / List */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-6 border border-slate-200 shadow-sm flex flex-col h-full">
                            <h3 className="text-lg font-black text-slate-800 mb-4 border-b border-slate-100 pb-4">
                                全ての予約一覧
                            </h3>
                            <div className="flex-1 overflow-y-auto pr-2 space-y-3 md:space-y-4 max-h-[500px]">
                                {schedule.map((lesson) => (
                                    <div
                                        key={lesson.id}
                                        onClick={() => handleOpenKarte(lesson)}
                                        className="p-3 md:p-4 rounded-[1.25rem] md:rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-indigo-200 transition-colors cursor-pointer group flex flex-col gap-2"
                                    >
                                        <div className="flex justify-between items-start">
                                            <span className={cn(
                                                "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md",
                                                lesson.status === 'Completed' ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100/50 text-indigo-600"
                                            )}>
                                                {lesson.date} • {lesson.time}
                                            </span>
                                            {lesson.status === 'Completed' && (
                                                <CheckCircle2 size={14} className="text-emerald-500" />
                                            )}
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-sm mb-1">{lesson.course}</h4>
                                        <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                                            <User size={12} />
                                            {lesson.teacherName} 先生
                                        </p>
                                    </div>
                                ))}
                                {schedule.length === 0 && (
                                    <div className="text-center py-10">
                                        <p className="text-slate-400 font-bold text-sm">予約済みのレッスンはありません。</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                {/* Karte Modal (Lesson Detail) */}
                {isKarteModalOpen && selectedLesson && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-2 md:p-4 animate-in fade-in duration-300">
                        <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
                            {/* Modal Header */}
                            <div className="px-6 py-6 md:px-10 md:py-8 border-b border-slate-100 flex justify-between items-start md:items-center bg-slate-50/30 shrink-0 gap-4">
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-1">
                                        <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">授業詳細・カルテ</h2>
                                        <span className={cn(
                                            "inline-flex self-start px-2 py-1 md:px-3 md:py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                            selectedLesson.status === 'Completed' ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"
                                        )}>
                                            {selectedLesson.status === 'Completed' ? '完了' : '予約済み'}
                                        </span>
                                    </div>
                                    <p className="text-[10px] md:text-xs font-bold text-slate-500 mt-1">{selectedLesson.date} • {selectedLesson.time} ({selectedLesson.duration})</p>
                                </div>
                                <button
                                    onClick={() => setIsKarteModalOpen(false)}
                                    className="p-2 md:p-3 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-all shrink-0"
                                >
                                    <X size={20} className="md:w-6 md:h-6" />
                                </button>
                            </div>
                            {/* Modal Body */}
                            <div className="p-6 md:p-10 overflow-y-auto flex-1">
                                <div className="space-y-6 md:space-y-8">
                                    {/* Course Info */}
                                    <div className="flex items-start gap-4 md:gap-5">
                                        <div className="bg-indigo-50 p-3 md:p-4 rounded-2xl shrink-0 border border-indigo-100/50">
                                            <BookOpen size={20} className="text-indigo-600 md:w-6 md:h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">コース/教材</p>
                                            <p className="text-base md:text-lg font-bold text-slate-800 leading-tight">{selectedLesson.course || '未設定'}</p>
                                        </div>
                                    </div>

                                    {/* Teacher Info */}
                                    <div className="flex items-start gap-4 md:gap-5">
                                        <div className="bg-sky-50 p-3 md:p-4 rounded-2xl shrink-0 border border-sky-100/50">
                                            <User size={20} className="text-sky-600 md:w-6 md:h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">担当講師</p>
                                            <p className="text-base md:text-lg font-bold text-slate-800 leading-tight">{selectedLesson.teacherName} 先生</p>
                                        </div>
                                    </div>

                                    {/* Memo / URL */}
                                    <div className="flex items-start gap-4 md:gap-5">
                                        <div className="bg-emerald-50 p-3 md:p-4 rounded-2xl shrink-0 border border-emerald-100/50">
                                            <LinkIcon size={20} className="text-emerald-600 md:w-6 md:h-6" />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">参加URL</p>
                                            {selectedLesson.meetingUrl ? (
                                                <a href={selectedLesson.meetingUrl} target="_blank" rel="noopener noreferrer" className="text-sm md:text-base font-bold text-indigo-600 hover:text-indigo-800 break-all">{selectedLesson.meetingUrl}</a>
                                            ) : (
                                                <p className="text-xs md:text-sm font-bold text-slate-500">未設定です</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {selectedLesson.status === 'Completed' && karte ? (
                                    <>
                                        <div className="space-y-4">
                                            <h3 className="text-sm font-black text-indigo-700 flex items-center gap-2">
                                                <Star size={18} className="text-amber-500 fill-amber-500" />
                                                次回までの宿題
                                            </h3>
                                            <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-2xl text-slate-700 font-medium">
                                                {karte.homework || '特にありません。'}
                                            </div>
                                        </div>

                                        {/* Feedback */}
                                        <div className="space-y-4">
                                            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                                                <MessageSquare size={18} className="text-indigo-500" />
                                                講師からのフィードバック
                                            </h3>
                                            <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100">
                                                <p className="text-slate-800 font-medium leading-relaxed whitespace-pre-wrap">
                                                    {karte.feedback}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                                        <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                                            <Clock size={32} />
                                        </div>
                                        <div>
                                            <p className="text-lg font-black text-slate-800">カルテはまだありません</p>
                                            <p className="text-sm text-slate-500 font-bold max-w-xs mx-auto mt-2">授業終了後に講師がカルテを記入すると、ここに表示されます。</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="px-10 py-8 border-t border-slate-100 bg-white shrink-0 flex gap-4">
                                <button
                                    onClick={() => setIsKarteModalOpen(false)}
                                    className="flex-1 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black shadow-xl shadow-slate-900/20 transition-all active:scale-95"
                                >
                                    閉じる
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main >
    );
}
