'use client';

import { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    MoreHorizontal,
    Star,
    Award,
    ChevronRight,
    Plus,
    Trash2,
    Edit2
} from 'lucide-react';
import Link from 'next/link';
import { DataStore, Teacher } from '@/lib/data-store';
import { getTeachers, addTeacher, updateTeacher, deleteTeacherAdmin } from '@/lib/actions/admin';

export default function TeachersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    // Add Modal State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newTeacher, setNewTeacher] = useState({
        name: '',
        email: '',
        loginId: '',
        password: 'password123',
        role: 'Teacher',
        bio: ''
    });

    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

    const refreshTeachers = () => {
        getTeachers().then((data) => setTeachers(data as any));
    };

    useEffect(() => {
        refreshTeachers();
    }, []);

    const handleAddTeacher = (e: React.FormEvent) => {
        e.preventDefault();

        addTeacher({
            name: newTeacher.name,
            email: newTeacher.email,
            loginId: newTeacher.loginId,
            password: newTeacher.password,
            role: newTeacher.role,
            bio: newTeacher.bio
        }).then(res => {
            if (res.success && res.teacher) {
                alert(`講師「${res.teacher.name}」を追加しました。\n\n【ログイン情報】\nID: ${res.teacher.loginId}\nPASS: ${res.teacher.password}`);
                setIsAddModalOpen(false);
                setNewTeacher({ name: '', email: '', loginId: '', password: 'password123', role: 'Teacher', bio: '' });
                refreshTeachers();
            } else {
                alert(res.error || '追加に失敗しました');
            }
        });
    };

    const handleEditTeacher = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingTeacher) return;

        updateTeacher(editingTeacher.id, editingTeacher).then(res => {
            if (res.success) {
                alert(`講師「${editingTeacher.name}」の情報を更新しました。`);
                setIsEditModalOpen(false);
                setEditingTeacher(null);
                refreshTeachers();
            } else {
                alert(res.error || '更新に失敗しました');
            }
        });
    };

    const handleDeleteTeacher = (teacher: Teacher) => {
        if (window.confirm(`本当に講師「${teacher.name}」を削除しますか？\nこの操作は取り消せません。`)) {
            deleteTeacherAdmin(teacher.id).then(res => {
                if (res.success) {
                    refreshTeachers();
                } else {
                    alert(res.error || '削除に失敗しました');
                }
            });
        }
    };

    const openEditModal = (teacher: Teacher) => {
        setEditingTeacher({ ...teacher });
        setIsEditModalOpen(true);
    };

    const filteredTeachers = teachers.filter((teacher: Teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="flex-1 flex flex-col overflow-hidden">
            <div className="p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">講師管理</h1>
                        <p className="text-muted-foreground mt-1">全 {teachers.length} 名の講師が登録されています</p>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-indigo-700 transition-all flex items-center gap-2"
                    >
                        <Plus size={18} />
                        講師アカウント追加
                    </button>
                </div>

                {/* Add Teacher Modal */}
                {isAddModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                        <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                            <div className="bg-indigo-600 p-6 text-white shrink-0">
                                <h2 className="text-xl font-bold">新規講師アカウント追加</h2>
                                <p className="text-indigo-100 text-xs mt-1">講師の基本情報を登録します</p>
                            </div>
                            <form onSubmit={handleAddTeacher} className="flex-1 flex flex-col overflow-hidden">
                                <div className="flex-1 overflow-y-auto p-8 space-y-5 min-h-0">
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">氏名</label>
                                                <input
                                                    type="text"
                                                    placeholder="例: 山田太郎"
                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm text-slate-900 placeholder:text-slate-400"
                                                    value={newTeacher.name}
                                                    onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value, loginId: e.target.value.replace(/\s+/g, '').toLowerCase() })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">メールアドレス</label>
                                                <input
                                                    type="email"
                                                    placeholder="teacher@example.com"
                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm text-slate-900 placeholder:text-slate-400"
                                                    value={newTeacher.email}
                                                    onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">ログイン ID</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm text-slate-900"
                                                    value={newTeacher.loginId}
                                                    onChange={(e) => setNewTeacher({ ...newTeacher, loginId: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">パスワード</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm text-slate-900"
                                                    value={newTeacher.password}
                                                    onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">役割</label>
                                                <select
                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm text-slate-900"
                                                    value={newTeacher.role}
                                                    onChange={(e) => setNewTeacher({ ...newTeacher, role: e.target.value })}
                                                >
                                                    <option value="Teacher">Teacher (講師)</option>
                                                    <option value="Admin">Admin (管理者)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">経歴・プロフィール (自己紹介)</label>
                                            <textarea
                                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm text-slate-900 placeholder:text-slate-400 resize-none h-24"
                                                placeholder="講師の経歴やアピールポイント..."
                                                value={newTeacher.bio}
                                                onChange={(e) => setNewTeacher({ ...newTeacher, bio: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 p-8 pt-4 border-t border-slate-50 shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="flex-1 py-3 bg-slate-50 text-slate-500 font-bold rounded-xl hover:bg-slate-100 transition-colors"
                                    >
                                        キャンセル
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
                                    >
                                        アカウントを追加
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit Teacher Modal */}
                {isEditModalOpen && editingTeacher && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                        <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                            <div className="bg-emerald-600 p-6 text-white shrink-0">
                                <h2 className="text-xl font-bold">講師情報の編集</h2>
                                <p className="text-emerald-100 text-xs mt-1">ログイン情報やプロフィールを更新します</p>
                            </div>
                            <form onSubmit={handleEditTeacher} className="flex-1 flex flex-col overflow-hidden">
                                <div className="flex-1 overflow-y-auto p-8 space-y-5 min-h-0">
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">氏名</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm text-slate-900"
                                                    value={editingTeacher.name}
                                                    onChange={(e) => setEditingTeacher({ ...editingTeacher, name: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">メールアドレス</label>
                                                <input
                                                    type="email"
                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm text-slate-900"
                                                    value={editingTeacher.email}
                                                    onChange={(e) => setEditingTeacher({ ...editingTeacher, email: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">ログイン ID</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm text-slate-900 font-mono"
                                                    value={editingTeacher.loginId || ''}
                                                    onChange={(e) => setEditingTeacher({ ...editingTeacher, loginId: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">パスワード</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm text-slate-900 font-mono"
                                                    value={editingTeacher.password || ''}
                                                    onChange={(e) => setEditingTeacher({ ...editingTeacher, password: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">役割</label>
                                                <select
                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm text-slate-900"
                                                    value={editingTeacher.role}
                                                    onChange={(e) => setEditingTeacher({ ...editingTeacher, role: e.target.value as any })}
                                                >
                                                    <option value="Teacher">Teacher (講師)</option>
                                                    <option value="Admin">Admin (管理者)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">経歴・プロフィール (自己紹介)</label>
                                            <textarea
                                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm text-slate-900 resize-none h-24"
                                                value={editingTeacher.bio || ''}
                                                onChange={(e) => setEditingTeacher({ ...editingTeacher, bio: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 p-8 pt-4 border-t border-slate-50 shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="flex-1 py-3 bg-slate-50 text-slate-500 font-bold rounded-xl hover:bg-slate-100 transition-colors"
                                    >
                                        キャンセル
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95"
                                    >
                                        保存する
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Filters & Search */}
                <div className="bg-card rounded-xl border border-border p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="名前、メールアドレスで検索..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Teachers Table */}
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-secondary/50 text-muted-foreground border-b border-border">
                            <tr>
                                <th className="px-6 py-4 font-medium">講師名 / メール</th>
                                <th className="px-6 py-4 font-medium">ログイン ID</th>
                                <th className="px-6 py-4 font-medium">ステータス</th>
                                <th className="px-6 py-4 text-right">アクション</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredTeachers.map((t) => (
                                <tr
                                    key={t.id}
                                    className="hover:bg-muted/30 transition-colors group cursor-pointer"
                                    onClick={() => openEditModal(t)}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                                                {t.name[0]}
                                            </div>
                                            <div>
                                                <div className="font-bold text-foreground flex items-center gap-2">
                                                    {t.name}
                                                    {t.role === 'Admin' && <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase">Admin</span>}
                                                </div>
                                                <div className="text-xs text-muted-foreground">{t.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded inline-block">
                                            {t.loginId || '未設定'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={t.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteTeacher(t);
                                            }}
                                            className="p-2 hover:bg-rose-50 rounded-full text-slate-400 hover:text-rose-600 transition-colors inline-block"
                                            title="削除"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredTeachers.length === 0 && (
                        <div className="p-12 text-center text-muted-foreground">
                            該当する講師が見つかりませんでした。
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

function StatusBadge({ status }: { status: string }) {
    if (status === 'Active') {
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>在籍中</span>;
    }
    return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">退職済</span>;
}
