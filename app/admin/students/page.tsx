'use client';

import { useState } from 'react';
import {
    Search,
    Filter,
    MoreHorizontal,
    User,
    Mail,
    Phone,
    Calendar,
    ChevronRight,
    Plus,
    Trash2
} from 'lucide-react';
import Link from 'next/link';

import { DataStore, Student } from '@/lib/data-store';
import { useEffect } from 'react';
import { getStudents, addStudent, deleteStudent } from '@/lib/actions/admin';

export default function StudentsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState<Student[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newStudent, setNewStudent] = useState({
        name: '',
        email: '',
        loginId: '',
        password: 'password123'
    });

    const refreshStudents = () => {
        getStudents().then((data) => setStudents(data as Student[]));
    };

    useEffect(() => {
        refreshStudents();
    }, []);

    const handleAddStudent = (e: React.FormEvent) => {
        e.preventDefault();

        addStudent({
            name: newStudent.name,
            email: newStudent.email || `${newStudent.loginId}@student.voca-academy.jp`,
            course: '英語', // Default course
            loginId: newStudent.loginId,
            password: newStudent.password
        }).then(res => {
            if (res.success && res.student) {
                alert(`アカウントを発行しました！\n\n【ログイン情報】\nID: ${res.student.loginId}\nPASS: ${res.student.password}\n\nこの情報を生徒・保護者へお伝えください。`);
                setIsAddModalOpen(false);
                setNewStudent({ name: '', email: '', loginId: '', password: 'password123' });
                refreshStudents();
            } else {
                alert(res.error || '登録に失敗しました');
            }
        });
    };

    const handleDeleteStudent = (e: React.MouseEvent, studentId: string, studentName: string) => {
        e.stopPropagation();
        if (confirm(`${studentName} のデータを完全に削除します。\nよろしいですか？（この操作は取り消せません）`)) {
            deleteStudent(studentId).then(res => {
                if (res.success) {
                    refreshStudents();
                } else {
                    alert(res.error);
                }
            });
        }
    };

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="flex-1 flex flex-col overflow-hidden">
            <div className="p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">生徒管理</h1>
                        <p className="text-muted-foreground mt-1">全 {students.length} 名の生徒が登録されています</p>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-indigo-700 transition-all flex items-center gap-2"
                    >
                        <Plus size={18} />
                        生徒アカウント発行
                    </button>
                </div>

                {/* Add Student Modal */}
                {isAddModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                        <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                            <div className="bg-indigo-600 p-6 text-white shrink-0">
                                <h2 className="text-xl font-bold">新規アカウント発行</h2>
                                <p className="text-indigo-100 text-xs mt-1">生徒・保護者用のログイン情報を設定します</p>
                            </div>
                            <form onSubmit={handleAddStudent} className="flex-1 flex flex-col overflow-hidden">
                                <div className="flex-1 overflow-y-auto p-8 space-y-5 min-h-0">
                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">氏名</label>
                                            <input
                                                type="text"
                                                placeholder="例: 山田 太郎"
                                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm text-slate-900 placeholder:text-slate-400"
                                                value={newStudent.name}
                                                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value, loginId: e.target.value.replace(' ', '').toLowerCase() })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">メールアドレス</label>
                                            <input
                                                type="email"
                                                placeholder="parent@example.com"
                                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm text-slate-900 placeholder:text-slate-400"
                                                value={newStudent.email}
                                                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="pt-4 border-t border-slate-100 space-y-4">
                                            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">ログイン設定</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-500">ログインID</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-4 py-2.5 rounded-xl bg-indigo-50/50 border border-indigo-100 font-mono text-xs focus:ring-2 focus:ring-indigo-500/20 outline-none text-slate-900"
                                                        value={newStudent.loginId}
                                                        onChange={(e) => setNewStudent({ ...newStudent, loginId: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-500">初期パスワード</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-4 py-2.5 rounded-xl bg-indigo-50/50 border border-indigo-100 font-mono text-xs focus:ring-2 focus:ring-indigo-500/20 outline-none text-slate-900"
                                                        value={newStudent.password}
                                                        onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>
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
                                        アカウントを発行
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
                    <div className="flex gap-2 w-full md:w-auto">
                        <button className="px-4 py-2 border border-border rounded-lg bg-background hover:bg-secondary text-sm font-medium transition-colors">
                            ステータス
                        </button>
                    </div>
                </div>

                {/* Students Table */}
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-secondary/50 text-muted-foreground border-b border-border">
                            <tr>
                                <th className="px-6 py-4 font-medium">生徒名 / ID</th>
                                <th className="px-6 py-4 font-medium">ステータス</th>
                                <th className="px-6 py-4 font-medium">最終レッスン</th>
                                <th className="px-6 py-4 font-medium">進捗</th>
                                <th className="px-6 py-4 text-right">アクション</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredStudents.map((student) => (
                                <tr
                                    key={student.id}
                                    className="hover:bg-muted/30 transition-colors group cursor-pointer"
                                    onClick={() => window.location.href = `/admin/students/${student.id}`}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                                                {student.name[0]}
                                            </div>
                                            <div>
                                                <div className="font-bold text-foreground">{student.name}</div>
                                                <div className="text-xs text-muted-foreground">{student.email}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <StatusBadge status={student.status} />
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                                        {student.lastLesson}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${student.progress}%` }}></div>
                                            </div>
                                            <span className="text-xs text-muted-foreground">{student.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right leading-none">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={(e) => handleDeleteStudent(e, student.id, student.name)}
                                                className="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                            <Link href={`/admin/students/${student.id}`} onClick={(e) => e.stopPropagation()} className="p-2 hover:bg-secondary rounded-full text-muted-foreground hover:text-foreground transition-colors inline-block">
                                                <ChevronRight size={18} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredStudents.length === 0 && (
                        <div className="p-12 text-center text-muted-foreground">
                            該当する生徒が見つかりませんでした。
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

function StatusBadge({ status }: { status: string }) {
    if (status === 'Active') {
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>受講中</span>;
    }
    if (status === 'Paused') {
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>休会中</span>;
    }
    return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">退会済</span>;
}
