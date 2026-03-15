'use client';

import { useState, useEffect } from 'react';
import {
    Megaphone,
    Search,
    Filter,
    Plus,
    Check,
    X,
    Calendar,
    AlertCircle,
    CheckCircle2,
    Users
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DataStore, Announcement } from '@/lib/data-store';
import { getAnnouncements, addAnnouncement, deleteAnnouncement } from '@/lib/actions/admin';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function AdminAnnouncementsPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterTarget, setFilterTarget] = useState<string>('All');

    // Modal
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newForm, setNewForm] = useState<Partial<Announcement>>({
        priority: 'Normal',
        target: 'All'
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await getAnnouncements();
        setAnnouncements(data as any);
    };

    const handleDelete = async (id: string) => {
        if (confirm('このお知らせを削除してもよろしいですか？')) {
            await deleteAnnouncement(id);
            loadData();
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await addAnnouncement({
            title: newForm.title || 'タイトルなし',
            content: newForm.content || '',
            priority: newForm.priority || 'Normal',
            target: newForm.target || 'All',
        });

        if (res.success) {
            setIsAddModalOpen(false);
            setNewForm({ priority: 'Normal', target: 'All' });
            loadData();
        } else {
            alert(res.error || '配信に失敗しました');
        }
    };

    const filtered = announcements.filter(a => {
        if (filterTarget !== 'All' && a.target !== filterTarget && a.target !== 'All') return false;
        if (searchQuery) {
            return a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.content.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
    });

    return (
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6 md:p-8 shrink-0">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            <div className="p-2.5 bg-amber-100 text-amber-600 rounded-2xl">
                                <Megaphone size={28} className="fill-amber-600/20" />
                            </div>
                            お知らせ配信
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">生徒へのお知らせ・キャンペーン情報を一斉配信・管理します。</p>
                    </div>
                </header>

                <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden flex flex-col">

                    {/* Toolbar */}
                    <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
                        <div className="flex flex-1 w-full gap-4 items-center">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="タイトル、内容で検索..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-amber-500/20 outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <Filter size={18} className="text-slate-400 hidden sm:block" />
                                <select
                                    className="py-2.5 pl-3 pr-8 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none"
                                    value={filterTarget}
                                    onChange={(e) => setFilterTarget(e.target.value)}
                                >
                                    <option value="All">すべての対象</option>
                                    <option value="Business">ビジネスプラン向け</option>
                                    <option value="Beginner">日常英会話向け</option>
                                    <option value="Kids">キッズ向け</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 w-full md:w-auto">
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 border border-transparent text-white rounded-xl font-bold text-sm shadow-md transition-all shadow-amber-500/20"
                            >
                                <Plus size={18} />
                                新規お知らせ作成
                            </button>
                        </div>
                    </div>

                    {/* Announcements List */}
                    <div className="divide-y divide-slate-100">
                        {filtered.length > 0 ? filtered.map((item) => (
                            <div key={item.id} className="p-6 hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row gap-6 relative group">
                                {/* Left: Actions / Status */}
                                <div className="sm:w-48 flex-shrink-0 space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-slate-500 font-bold">
                                        <Calendar size={14} />
                                        {item.date}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {item.priority === 'High' && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-100">
                                                <AlertCircle size={10} />
                                                重要
                                            </span>
                                        )}
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600">
                                            <Users size={10} />
                                            {item.target === 'All' ? '全体向け' : item.target}
                                        </span>
                                    </div>
                                </div>

                                {/* Right: Content */}
                                <div className="flex-1 space-y-2">
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm font-medium text-slate-600 leading-relaxed whitespace-pre-wrap">
                                        {item.content}
                                    </p>
                                    <p className="text-xs text-slate-400 font-bold pt-2">
                                        配信者: {item.author}
                                    </p>
                                </div>

                                {/* Delete Button (Hover) */}
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="absolute top-6 right-6 p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                    aria-label="削除"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        )) : (
                            <div className="p-12 text-center text-slate-500 font-bold">
                                お知らせがありません。
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Create Announcement Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
                    <form onSubmit={handleCreate} className="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <Megaphone className="text-amber-500" size={20} />
                                新規お知らせ作成
                            </h3>
                            <button type="button" onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-white p-2 rounded-full shadow-sm">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6 overflow-y-auto">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-600">配信対象</label>
                                <select
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-500 font-bold text-slate-700"
                                    value={newForm.target || 'All'}
                                    onChange={(e) => setNewForm({ ...newForm, target: e.target.value as any })}
                                    required
                                >
                                    <option value="All">すべての生徒</option>
                                    <option value="Business">ビジネスプラン受講生</option>
                                    <option value="Beginner">日常英会話プラン受講生</option>
                                    <option value="Kids">キッズプラン受講生</option>
                                </select>
                            </div>

                            <div className="space-y-4 bg-slate-50 p-4 border border-slate-100 rounded-2xl">
                                <label className="text-xs font-bold text-slate-600">重要度（優先フラグ）</label>
                                <div className="flex gap-4">
                                    <label className={cn(
                                        "flex-1 flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all",
                                        newForm.priority === 'Normal' ? "border-amber-500 bg-white shadow-sm" : "border-transparent text-slate-500 hover:bg-slate-100"
                                    )}>
                                        <input
                                            type="radio" name="priority" value="Normal"
                                            checked={newForm.priority === 'Normal'}
                                            onChange={() => setNewForm({ ...newForm, priority: 'Normal' })}
                                            className="hidden"
                                        />
                                        <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center", newForm.priority === 'Normal' ? "border-amber-500" : "border-slate-300")}>
                                            {newForm.priority === 'Normal' && <div className="w-2 h-2 rounded-full bg-amber-500"></div>}
                                        </div>
                                        <span className="font-bold text-sm">通常 (Normal)</span>
                                    </label>
                                    <label className={cn(
                                        "flex-1 flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all",
                                        newForm.priority === 'High' ? "border-rose-500 bg-white shadow-sm" : "border-transparent text-slate-500 hover:bg-slate-100"
                                    )}>
                                        <input
                                            type="radio" name="priority" value="High"
                                            checked={newForm.priority === 'High'}
                                            onChange={() => setNewForm({ ...newForm, priority: 'High' })}
                                            className="hidden"
                                        />
                                        <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center", newForm.priority === 'High' ? "border-rose-500" : "border-slate-300")}>
                                            {newForm.priority === 'High' && <div className="w-2 h-2 rounded-full bg-rose-500"></div>}
                                        </div>
                                        <span className="font-bold text-sm text-rose-600">重要 (High Priority)</span>
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-600">お知らせタイトル</label>
                                <input
                                    type="text"
                                    placeholder="例: ゴールデンウィーク休業のお知らせ"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-500 font-bold"
                                    value={newForm.title || ''}
                                    onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-600">本文</label>
                                <textarea
                                    placeholder="ご案内内容を記入してください..."
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-500 font-medium min-h-[160px] resize-y"
                                    value={newForm.content || ''}
                                    onChange={(e) => setNewForm({ ...newForm, content: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3 shrink-0">
                            <button
                                type="button"
                                onClick={() => setIsAddModalOpen(false)}
                                className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-200 rounded-xl transition-colors"
                            >
                                キャンセル
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2.5 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-md rounded-xl transition-colors flex items-center gap-2"
                            >
                                <Megaphone size={16} className="fill-white/20" />
                                配信する
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    );
}
