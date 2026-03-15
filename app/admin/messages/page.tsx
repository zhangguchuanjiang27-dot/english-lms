'use client';

import {
    Search,
    Send,
    Paperclip,
    MoreVertical,
    CheckCheck,
    X
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DataStore, Student, Message, Teacher } from '@/lib/data-store';
import { getStudents, getTeachers, getAdminMessages, sendMessage, markMessagesAsRead } from '@/lib/actions/admin';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type ChatItem = {
    student: Student;
    lastMessage?: Message;
    unreadCount: number;
};

export default function AdminMessagesPage() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState<string>('');
    const [chats, setChats] = useState<ChatItem[]>([]);
    const [activeChat, setActiveChat] = useState<ChatItem | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getTeachers().then(data => {
            setTeachers(data as any);
            if (data.length > 0) {
                setSelectedTeacherId(data[0].id);
            }
        });
    }, []);

    useEffect(() => {
        if (selectedTeacherId) {
            refreshChats();
        }
    }, [selectedTeacherId]);

    useEffect(() => {
        if (activeChat && selectedTeacherId) {
            loadMessages(activeChat.student.id, selectedTeacherId);
        } else {
            setMessages([]);
        }
    }, [activeChat, selectedTeacherId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const refreshChats = () => {
        Promise.all([getStudents(), getAdminMessages(selectedTeacherId)]).then(([stds, msgs]: [any[], any[]]) => {
            const newChats: ChatItem[] = stds.map(student => {
                const studentMessages = msgs.filter(m => m.studentId === student.id);
                const lastMessage = studentMessages[studentMessages.length - 1];
                const unreadCount = studentMessages.filter(m => m.sender === 'student' && !m.read).length;

                return {
                    student,
                    lastMessage,
                    unreadCount
                };
            });

            newChats.sort((a, b) => {
                if (a.lastMessage && b.lastMessage) {
                    return new Date(b.lastMessage.time).getTime() - new Date(a.lastMessage.time).getTime();
                } else if (a.lastMessage) return -1;
                else if (b.lastMessage) return 1;
                return a.student.name.localeCompare(b.student.name);
            });

            setChats(newChats);

            if (activeChat) {
                const stillExists = newChats.find(c => c.student.id === activeChat.student.id);
                if (!stillExists) setActiveChat(newChats[0] || null);
                else setActiveChat(stillExists);
            } else if (newChats.length > 0) {
                setActiveChat(newChats[0]);
            }
        });
    };

    const loadMessages = (studentId: string, teacherId: string) => {
        getAdminMessages(teacherId).then(msgs => {
            const studentMsgs = msgs.filter((m: any) => m.studentId === studentId);
            setMessages(studentMsgs as any);

            const unreadExist = studentMsgs.some((m: any) => m.sender === 'student' && !m.read);
            if (unreadExist) {
                markMessagesAsRead(studentId, teacherId).then(() => {
                    refreshChats();
                });
            }
        });
    };

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || !activeChat || !selectedTeacherId) return;

        sendMessage({
            studentId: activeChat.student.id,
            teacherId: selectedTeacherId,
            sender: 'teacher',
            text: inputValue,
        }).then(res => {
            if (res.success) {
                setInputValue('');
                loadMessages(activeChat.student.id, selectedTeacherId);
                // Also refresh chats for the last message update
                refreshChats();
            } else {
                alert(res.error);
            }
        });
    };

    const filteredChats = chats.filter(chat =>
        chat.student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatTime = (timeStr: string) => {
        try {
            const date = new Date(timeStr);
            if (isNaN(date.getTime())) return timeStr; // For default dummy times

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

    return (
        <main className="flex-1 flex overflow-hidden bg-white">
            {/* Sidebar: Chat List (1/3) */}
            <div className="w-80 border-r border-slate-100 flex flex-col shrink-0 bg-slate-50/10">
                <div className="p-6 border-b border-slate-50">
                    <h2 className="text-xl font-black text-slate-900 mb-4">メッセージ</h2>

                    {/* Teacher Selector */}
                    <div className="mb-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">操作中の講師</label>
                        <select
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20"
                            value={selectedTeacherId}
                            onChange={(e) => setSelectedTeacherId(e.target.value)}
                        >
                            {teachers.map(t => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="生徒名を検索..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
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
                            <div className="shrink-0 w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-500">
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
                                    <p className="text-xs text-slate-500 truncate">
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
                    {filteredChats.length === 0 && (
                        <div className="p-8 text-center text-xs font-bold text-slate-400">
                            該当する生徒がいません
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Area (2/3) */}
            {activeChat ? (
                <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
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
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <MoreVertical size={20} />
                        </button>
                    </header>

                    {/* Messages History */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/50">
                        {messages.length > 0 ? messages.map((m) => (
                            <div key={m.id} className={cn(
                                "flex flex-col max-w-[80%]",
                                m.sender === 'teacher' ? "ml-auto items-end" : "items-start"
                            )}>
                                <div className={cn(
                                    "p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm",
                                    m.sender === 'teacher'
                                        ? "bg-indigo-600 text-white rounded-tr-none"
                                        : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                                )}>
                                    {m.text}
                                </div>
                                <div className="flex items-center gap-1 mt-1 px-1">
                                    <p className="text-[10px] font-bold text-slate-400">{formatTime(m.time)}</p>
                                    {m.sender === 'teacher' && m.read && (
                                        <CheckCheck size={12} className="text-indigo-400" />
                                    )}
                                </div>
                            </div>
                        )) : (
                            <div className="h-full flex items-center justify-center text-slate-400 text-sm font-bold">
                                まだメッセージはありません。<br />ここからチャットを開始できます。
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={handleSend} className="p-6 border-t border-slate-100 bg-white">
                        <div className="max-w-4xl mx-auto flex gap-4">
                            <button type="button" className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-indigo-600 transition-colors">
                                <Paperclip size={24} />
                            </button>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder={`${activeChat.student.name} さんにメッセージを送信...`}
                                    className="w-full pl-6 pr-14 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 outline-none text-sm font-medium transition-all"
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
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
                    <div className="w-16 h-16 rounded-3xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-4">
                        <Send size={24} className="text-slate-300" />
                    </div>
                    <p className="font-bold text-sm">生徒を選択してメッセージを開始します</p>
                </div>
            )}
        </main>
    );
}
