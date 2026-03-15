'use client';

import {
    Search,
    Send,
    Paperclip,
    MoreVertical,
    CheckCheck,
    X,
    ArrowLeft
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DataStore, Student, Message, Teacher } from '@/lib/data-store';
import { getStudents, getTeachers, getMessages, sendMessage, getTeacherChats, markMessagesAsRead } from '@/lib/actions/admin';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type ChatItem = {
    student: Student;
    lastMessage?: Message;
    unreadCount: number;
};

export default function TeacherMessagesPage() {
    const [teacher, setTeacher] = useState<Teacher | null>(null);
    const [chats, setChats] = useState<ChatItem[]>([]);
    const [activeChat, setActiveChat] = useState<ChatItem | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const refreshChats = async (teacherId: string) => {
        const data = await getTeacherChats(teacherId);
        setChats(data as any);

        if (!activeChat && data.length > 0) {
            const yukukumo = data.find((c: any) => c.student.loginId === 'yukukumo' || c.student.name.includes('yukukumo'));
            setActiveChat(yukukumo || data[0] as any);
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        const fetchData = async () => {
            const allTeachers = await getTeachers();
            let found = allTeachers.find((t: any) => t.id === userId);

            if (!found) {
                found = allTeachers.find((t: any) => t.name === '長谷川匠') || allTeachers[0];
            }

            if (found) {
                setTeacher(found as any);
                await refreshChats(found.id);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (activeChat && teacher) {
            loadMessages(activeChat.student.id, teacher.id);
        }
    }, [activeChat?.student.id, teacher?.id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const loadMessages = async (studentId: string, teacherId: string) => {
        const msgs = await getMessages(studentId);
        const roomMsgs = msgs.filter(m => m.teacherId === teacherId);
        setMessages(roomMsgs as any);

        const unreadExist = roomMsgs.some(m => m.sender === 'student' && !m.read);
        if (unreadExist) {
            await markMessagesAsRead(studentId, teacherId);
            refreshChats(teacherId);
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || !activeChat || !teacher) return;

        const res = await sendMessage({
            studentId: activeChat.student.id,
            teacherId: teacher.id,
            sender: 'teacher',
            text: inputValue
        });

        if (res.success) {
            setInputValue('');
            refreshChats(teacher.id);
            loadMessages(activeChat.student.id, teacher.id);
        }
    };

    const filteredChats = chats.filter(chat =>
        chat.student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatTime = (timeStr: string) => {
        try {
            const date = new Date(timeStr);
            if (isNaN(date.getTime())) return timeStr;
            const today = new Date();
            const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
            if (isToday) {
                return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
            }
            return date.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' });
        } catch {
            return timeStr;
        }
    };

    if (!teacher) {
        return <div className="p-10 text-center font-bold text-slate-400">講師情報が見つかりません。</div>;
    }

    return (
        <main className="flex-1 flex overflow-hidden bg-white">
            <aside className="w-80 border-r border-slate-100 flex flex-col shrink-0 bg-slate-50/20">
                <div className="p-6 border-b border-slate-50">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white shadow-lg shadow-indigo-600/30">
                            {teacher.name[0]}
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-slate-800 tracking-tight">{teacher.name}</h2>
                        </div>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="生徒を検索..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 outline-none"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filteredChats.map((chat) => (
                        <button
                            key={chat.student.id}
                            onClick={() => setActiveChat(chat)}
                            className={cn(
                                "w-full p-4 flex gap-3 transition-all border-l-4",
                                activeChat?.student.id === chat.student.id
                                    ? "bg-white border-indigo-600 shadow-sm"
                                    : "bg-transparent border-transparent hover:bg-slate-50"
                            )}
                        >
                            <div className="shrink-0 w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-500">
                                {chat.student.name[0]}
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-sm text-slate-900 truncate">{chat.student.name}</span>
                                    {chat.lastMessage && (
                                        <span className="text-[10px] text-slate-400">{formatTime(chat.lastMessage.time)}</span>
                                    )}
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-xs text-slate-500 truncate font-medium">
                                        {chat.lastMessage ? chat.lastMessage.text : 'まだメッセージはありません'}
                                    </p>
                                    {chat.unreadCount > 0 && (
                                        <span className="bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                            {chat.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </aside>

            <section className="flex-1 flex flex-col bg-[#F8FAFC]">
                {activeChat ? (
                    <>
                        <header className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-white shadow-sm z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-500">
                                    {activeChat.student.name[0]}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{activeChat.student.name}</h3>
                                    <p className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">{activeChat.student.course}</p>
                                </div>
                            </div>
                        </header>

                        <div className="flex-1 overflow-y-auto p-8 space-y-6">
                            {messages.length > 0 ? messages.map((m) => (
                                <div key={m.id} className={cn(
                                    "flex flex-col max-w-[80%] transition-opacity animate-in fade-in slide-in-from-bottom-2",
                                    m.sender === 'teacher' ? "ml-auto items-end" : "items-start"
                                )}>
                                    <div className={cn(
                                        "p-4 rounded-2xl text-[15px] font-medium leading-relaxed shadow-sm",
                                        m.sender === 'teacher'
                                            ? "bg-indigo-600 text-white rounded-tr-none"
                                            : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                                    )}>
                                        {m.text}
                                    </div>
                                    <div className="flex items-center gap-1 mt-1.5 px-1">
                                        <p className="text-[10px] font-bold text-slate-400">{formatTime(m.time)}</p>
                                        {m.sender === 'teacher' && m.read && (
                                            <CheckCheck size={12} className="text-indigo-400" />
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <div className="h-full flex items-center justify-center text-slate-400 text-sm font-bold opacity-60">
                                    メッセージを開始しましょう。
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSend} className="p-6 border-t border-slate-100 bg-white">
                            <div className="max-w-4xl mx-auto flex gap-4">
                                <button type="button" className="p-3.5 bg-slate-50 text-slate-400 rounded-2xl hover:text-indigo-600 transition-all">
                                    <Paperclip size={24} />
                                </button>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder={`${activeChat.student.name} さんにメッセージを送信...`}
                                        className="w-full pl-6 pr-14 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 outline-none text-[15px] font-medium transition-all"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        disabled={!inputValue.trim()}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 disabled:bg-slate-200 disabled:shadow-none transition-all"
                                    >
                                        <Send size={20} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                        <Send size={48} className="text-slate-200 mb-4" />
                        <p className="font-bold text-sm">生徒を選択してください</p>
                    </div>
                )}
            </section>
        </main>
    );
}
