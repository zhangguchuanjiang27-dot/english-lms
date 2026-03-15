'use client';

import { useState, useEffect } from 'react';
import {
    Settings as SettingsIcon,
    Users,
    Building,
    Globe,
    Clock,
    Save,
    Plus,
    Search,
    MoreVertical,
    Edit,
    Shield,
    X,
    Check
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DataStore, SchoolSettings, Teacher } from '@/lib/data-store';
import { getSchoolSettings, updateSchoolSettings, getTeachers, addTeacher, updateTeacher, resetDatabase } from '@/lib/actions/admin';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState<'general' | 'teachers'>('general');
    const [settings, setSettings] = useState<SchoolSettings | null>(null);
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    // Status
    const [isEditingSettings, setIsEditingSettings] = useState(false);
    const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);

    // Forms
    const [settingsForm, setSettingsForm] = useState<Partial<SchoolSettings>>({});
    const [teacherForm, setTeacherForm] = useState<Partial<Teacher>>({
        status: 'Active',
        role: 'Teacher',
        type: 'Bilingual'
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        getSchoolSettings().then(s => {
            if (s) {
                setSettings(s as any);
                setSettingsForm(s as any);
            }
        });
        getTeachers().then(t => setTeachers(t as any));
    };

    const handleSaveSettings = () => {
        if (settingsForm) {
            updateSchoolSettings(settingsForm).then(res => {
                if (res.success) {
                    setSettings(settingsForm as SchoolSettings);
                    setIsEditingSettings(false);
                    loadData();
                } else {
                    alert(res.error);
                }
            });
        }
    };

    const handleSaveTeacher = (e: React.FormEvent) => {
        e.preventDefault();

        if (teacherForm.id) {
            // Update
            updateTeacher(teacherForm.id, teacherForm).then(res => {
                if (res.success) {
                    setIsTeacherModalOpen(false);
                    loadData();
                } else {
                    alert(res.error);
                }
            });
        } else {
            // Create
            addTeacher({
                name: teacherForm.name || '',
                email: teacherForm.email || '',
                loginId: teacherForm.name?.replace(/\s+/g, '').toLowerCase() || '',
                password: 'password123',
                role: teacherForm.role || 'Teacher',
                bio: teacherForm.bio || ''
            }).then(res => {
                if (res.success) {
                    setIsTeacherModalOpen(false);
                    setTeacherForm({ status: 'Active', role: 'Teacher' });
                    loadData();
                } else {
                    alert(res.error);
                }
            });
        }
    };

    if (!settings) return null;

    return (
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6 md:p-8 shrink-0">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            <SettingsIcon className="text-indigo-600" size={32} />
                            スクール・システム設定
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">スクールの基本情報、システム挙動、および講師アカウントの管理を行います。</p>
                    </div>
                </header>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-slate-200">
                    <TabButton
                        active={activeTab === 'general'}
                        icon={Building}
                        label="スクール基本設定"
                        onClick={() => setActiveTab('general')}
                    />
                    <TabButton
                        active={activeTab === 'teachers'}
                        icon={Users}
                        label="講師アカウント管理"
                        onClick={() => setActiveTab('teachers')}
                    />
                </div>

                {/* Tab Content: General Settings */}
                {activeTab === 'general' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-slate-800">スクール情報</h2>
                                <button
                                    onClick={() => isEditingSettings ? handleSaveSettings() : setIsEditingSettings(true)}
                                    className={cn(
                                        "px-5 py-2.5 rounded-xl font-bold text-sm transition-colors",
                                        isEditingSettings
                                            ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                                            : "bg-indigo-50 hover:bg-base-200 text-indigo-700 hover:bg-indigo-100"
                                    )}
                                >
                                    {isEditingSettings ? '保存する' : '編集する'}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <SettingField
                                    icon={Building} label="スクール名"
                                    value={settingsForm.schoolName} isEditing={isEditingSettings}
                                    onChange={(v: string) => setSettingsForm({ ...settingsForm, schoolName: v })}
                                />
                                <SettingField
                                    icon={Globe} label="タイムゾーン"
                                    value={settingsForm.timezone} isEditing={isEditingSettings}
                                    onChange={(v: string) => setSettingsForm({ ...settingsForm, timezone: v })}
                                />
                                <SettingField
                                    icon={Clock} label="デフォルトレッスン時間 (分)"
                                    value={settingsForm.defaultCourseDuration?.toString()} type="number" isEditing={isEditingSettings}
                                    onChange={(v: string) => setSettingsForm({ ...settingsForm, defaultCourseDuration: Number(v) })}
                                />
                                <SettingField
                                    icon={Clock} label="キャンセル期限 (レッスン開始X時間前)"
                                    value={settingsForm.cancellationDeadlineHours?.toString()} type="number" isEditing={isEditingSettings}
                                    onChange={(v: string) => setSettingsForm({ ...settingsForm, cancellationDeadlineHours: Number(v) })}
                                />

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">システム設定</label>
                                    <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <input
                                            type="checkbox"
                                            id="allowCancel"
                                            checked={settingsForm.allowStudentCancellation}
                                            disabled={!isEditingSettings}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, allowStudentCancellation: e.target.checked })}
                                            className="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 disabled:opacity-50"
                                        />
                                        <label htmlFor="allowCancel" className="text-sm font-bold text-slate-700 cursor-pointer">
                                            生徒によるマイページからの予約キャンセルを許可する
                                        </label>
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2 mt-4 pt-4 border-t border-slate-100">
                                    <label className="text-xs font-black uppercase tracking-widest text-rose-400">開発者・デモ用ツール</label>
                                    <div className="flex items-center justify-between bg-rose-50 p-4 rounded-xl border border-rose-100">
                                        <div>
                                            <p className="text-sm font-bold text-rose-800">データベースを初期状態にリセット</p>
                                            <p className="text-xs text-rose-600 mt-1">ローカルデータをすべて消去し、最新のシードデータから再ロードします。</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (confirm('本当に全てのデータを初期状態に戻しますか？')) {
                                                    resetDatabase().then(res => {
                                                        if (res.success) window.location.reload();
                                                        else alert(res.error);
                                                    });
                                                }
                                            }}
                                            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-lg shadow-sm transition-colors"
                                        >
                                            全リセット
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab Content: Teachers Management */}
                {activeTab === 'teachers' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
                            <div className="relative w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="講師名・メールで検索..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                />
                            </div>
                            <button
                                onClick={() => {
                                    setTeacherForm({ status: 'Active', role: 'Teacher', type: 'Bilingual' });
                                    setIsTeacherModalOpen(true);
                                }}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 text-sm transition-all shadow-md shadow-indigo-600/20"
                            >
                                <Plus size={18} />
                                新規登録
                            </button>
                        </div>

                        <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-200">
                                            <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest pl-8">講師名</th>
                                            <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">属性</th>
                                            <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">権限</th>
                                            <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">ステータス</th>
                                            <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">加入日</th>
                                            <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right pr-8">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {teachers.map(teacher => (
                                            <tr key={teacher.id} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="p-4 pl-8">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100 shadow-sm">
                                                            {teacher.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-900 text-sm">{teacher.name}</p>
                                                            <p className="text-xs text-slate-500 font-medium">{teacher.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={cn(
                                                        "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600"
                                                    )}>
                                                        {teacher.type}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                                                        {teacher.role === 'Admin' ? <Shield size={14} className="text-rose-500" /> : <Users size={14} className="text-indigo-400" />}
                                                        {teacher.role}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={cn(
                                                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border",
                                                        teacher.status === 'Active'
                                                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                                            : "bg-slate-50 text-slate-500 border-slate-200"
                                                    )}>
                                                        <div className={cn("w-1.5 h-1.5 rounded-full", teacher.status === 'Active' ? "bg-emerald-500" : "bg-slate-400")}></div>
                                                        {teacher.status}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-sm font-medium text-slate-600">{teacher.joinDate}</span>
                                                </td>
                                                <td className="p-4 pr-8 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => {
                                                                setTeacherForm(teacher);
                                                                setIsTeacherModalOpen(true);
                                                            }}
                                                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Teacher Form Modal */}
            {isTeacherModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsTeacherModalOpen(false)}></div>
                    <form onSubmit={handleSaveTeacher} className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-lg font-bold text-slate-900">
                                {teacherForm.id ? '講師情報を編集' : '新規講師登録'}
                            </h3>
                            <button type="button" onClick={() => setIsTeacherModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-white p-2 rounded-full shadow-sm">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-2 col-span-2">
                                    <label className="text-xs font-bold text-slate-600">名前</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="例: Sarah Johnson"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 font-medium"
                                        value={teacherForm.name || ''}
                                        onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <label className="text-xs font-bold text-slate-600">メールアドレス</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="sarah@example.com"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 font-medium"
                                        value={teacherForm.email || ''}
                                        onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-600">講師タイプ</label>
                                    <select
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 font-medium"
                                        value={teacherForm.type || 'Native'}
                                        onChange={(e) => setTeacherForm({ ...teacherForm, type: e.target.value as any })}
                                    >
                                        <option value="Native">Native</option>
                                        <option value="Bilingual">Bilingual</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-600">権限 (Role)</label>
                                    <select
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 font-medium"
                                        value={teacherForm.role || 'Teacher'}
                                        onChange={(e) => setTeacherForm({ ...teacherForm, role: e.target.value as any })}
                                    >
                                        <option value="Teacher">講師 (Teacher)</option>
                                        <option value="Admin">管理者 (Admin)</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-600">ステータス</label>
                                    <select
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 font-medium"
                                        value={teacherForm.status || 'Active'}
                                        onChange={(e) => setTeacherForm({ ...teacherForm, status: e.target.value as any })}
                                    >
                                        <option value="Active">有効 (Active)</option>
                                        <option value="Inactive">無効 (Inactive)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-600">加入日</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 font-medium"
                                        value={teacherForm.joinDate || ''}
                                        onChange={(e) => setTeacherForm({ ...teacherForm, joinDate: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2 col-span-2">
                                    <label className="text-xs font-bold text-slate-600">プロフィール/略歴</label>
                                    <textarea
                                        placeholder="経歴や得意な指導分野..."
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 font-medium min-h-[80px]"
                                        value={teacherForm.bio || ''}
                                        onChange={(e) => setTeacherForm({ ...teacherForm, bio: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsTeacherModalOpen(false)}
                                className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-200 rounded-xl transition-colors"
                            >
                                キャンセル
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 rounded-xl transition-colors flex items-center gap-2"
                            >
                                <Check size={16} />
                                {teacherForm.id ? '更新する' : '登録する'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    );
}


interface TabButtonProps {
    active: boolean;
    icon: any;
    label: string;
    onClick: () => void;
}

function TabButton({ active, icon: Icon, label, onClick }: TabButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 px-6 py-3 font-bold text-sm transition-all border-b-2 outline-none",
                active
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            )}
        >
            <Icon size={18} />
            {label}
        </button>
    )
}

interface SettingFieldProps {
    icon: any;
    label: string;
    value: string | undefined;
    isEditing: boolean;
    onChange: (value: string) => void;
    type?: string;
}

function SettingField({ icon: Icon, label, value, isEditing, onChange, type = "text" }: SettingFieldProps) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Icon size={14} className="text-slate-400" />
                {label}
            </label>
            {isEditing ? (
                <input
                    type={type}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 font-bold text-slate-800 transition-all"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <div className="px-4 py-2.5 bg-slate-50/50 border border-transparent rounded-xl text-sm font-bold text-slate-700">
                    {value || '---'}
                </div>
            )}
        </div>
    )
}
