'use client';

import { useState } from 'react';
import {
    Bell,
    Lock,
    Palette,
    Smartphone,
    Globe,
    LogOut,
    CheckCircle2,
    Volume2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function StudentSettingsPage() {
    const [activeTab, setActiveTab] = useState('notifications');
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        line: false,
        marketing: false
    });

    const [theme, setTheme] = useState('system');

    return (
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-50 font-sans">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">設定</h1>
                        <p className="text-slate-500 mt-1 font-medium">アカウントやシステム全般の設定を管理します</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Navigation Sidebar (Desktop) */}
                    <div className="hidden md:block col-span-1 space-y-2">
                        <SettingsTab icon={Bell} label="通知設定" active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
                        <SettingsTab icon={Lock} label="セキュリティ" active={activeTab === 'security'} onClick={() => setActiveTab('security')} />
                        <SettingsTab icon={Palette} label="外観・テーマ" active={activeTab === 'appearance'} onClick={() => setActiveTab('appearance')} />
                        <SettingsTab icon={Volume2} label="音声・ビデオ" active={activeTab === 'media'} onClick={() => setActiveTab('media')} />
                        <SettingsTab icon={Globe} label="言語と地域" active={activeTab === 'localization'} onClick={() => setActiveTab('localization')} />

                        <div className="pt-6 mt-6 border-t border-slate-200">
                            <SettingsTab icon={LogOut} label="ログアウト" danger />
                        </div>
                    </div>

                    {/* Main Settings Area */}
                    <div className="col-span-1 md:col-span-3 space-y-8">

                        {activeTab === 'notifications' && (
                            <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-black flex items-center gap-3 border-b border-slate-200 pb-4 text-slate-800">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                                        <Bell size={20} />
                                    </div>
                                    通知設定
                                </h2>
                                <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm space-y-6 transition-all">
                                    <ToggleRow
                                        label="メール通知"
                                        desc="予約のリマインドや講師からのメッセージをメールで受け取ります。"
                                        checked={notifications.email}
                                        onChange={(c: boolean) => setNotifications({ ...notifications, email: c })}
                                    />
                                    <div className="h-px w-full bg-slate-100"></div>
                                    <ToggleRow
                                        label="プッシュ通知"
                                        desc="ブラウザ上でレッスンの開始５分前にお知らせします。"
                                        checked={notifications.push}
                                        onChange={(c: boolean) => setNotifications({ ...notifications, push: c })}
                                    />
                                    <div className="h-px w-full bg-slate-100"></div>
                                    <ToggleRow
                                        label="LINE連携"
                                        desc="公式LINEアカウントと連携し、トーク画面でお知らせを受け取ります。"
                                        checked={notifications.line}
                                        onChange={(c: boolean) => setNotifications({ ...notifications, line: c })}
                                        badge="おすすめ"
                                    />
                                </div>
                            </section>
                        )}

                        {activeTab === 'appearance' && (
                            <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-black flex items-center gap-3 border-b border-slate-200 pb-4 text-slate-800">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                                        <Palette size={20} />
                                    </div>
                                    外観・テーマ
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <ThemeOption
                                        type="light"
                                        label="ライト"
                                        active={theme === 'light'}
                                        onClick={() => setTheme('light')}
                                        icon={<div className="w-full h-full bg-slate-50 border-4 border-white rounded-xl shadow-sm flex items-center justify-center text-slate-300 font-bold">L</div>}
                                    />
                                    <ThemeOption
                                        type="dark"
                                        label="ダーク"
                                        active={theme === 'dark'}
                                        onClick={() => setTheme('dark')}
                                        icon={<div className="w-full h-full bg-slate-900 border-4 border-slate-800 rounded-xl shadow-sm flex items-center justify-center text-slate-700 font-bold">D</div>}
                                    />
                                    <ThemeOption
                                        type="system"
                                        label="システム設定"
                                        active={theme === 'system'}
                                        onClick={() => setTheme('system')}
                                        icon={<div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-800 border-4 border-white rounded-xl shadow-sm flex items-center justify-center text-white font-bold"><Smartphone size={24} /></div>}
                                    />
                                </div>
                            </section>
                        )}

                        {activeTab === 'security' && (
                            <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-black flex items-center gap-3 border-b border-slate-200 pb-4 text-slate-800">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                                        <Lock size={20} />
                                    </div>
                                    セキュリティ
                                </h2>
                                <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm space-y-6">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <p className="font-bold text-slate-800">パスワードの変更</p>
                                            <p className="text-sm font-medium text-slate-500 mt-1">最後に変更したのは3ヶ月前です。</p>
                                        </div>
                                        <button className="px-6 py-2.5 bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors text-sm shrink-0">
                                            変更する
                                        </button>
                                    </div>
                                    <div className="h-px w-full bg-slate-100"></div>
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <p className="font-bold text-slate-800">2段階認証 (2FA)</p>
                                            <p className="text-sm font-medium text-slate-500 mt-1">アカウントのセキュリティを最大限に強化します。</p>
                                        </div>
                                        <button className="px-6 py-2.5 bg-indigo-600 outline-none text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-colors text-sm shrink-0 flex items-center gap-2">
                                            <Lock size={16} />
                                            有効にする
                                        </button>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Placeholder for others */}
                        {(activeTab === 'media' || activeTab === 'localization') && (
                            <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="bg-white rounded-[2rem] p-12 text-center border border-slate-200 shadow-sm space-y-4">
                                    <div className="w-16 h-16 mx-auto bg-slate-100 text-slate-400 rounded-full flex items-center justify-center">
                                        {activeTab === 'media' ? <Volume2 size={24} /> : <Globe size={24} />}
                                    </div>
                                    <h3 className="font-bold text-slate-800 text-lg">この機能は現在準備中です</h3>
                                    <p className="text-slate-500 font-medium text-sm">システム要件に合わせて後日拡張予定です。</p>
                                </div>
                            </section>
                        )}

                    </div>
                </div>
            </div>
        </main>
    );
}

function SettingsTab({ icon: Icon, label, active = false, danger = false, onClick }: any) {
    return (
        <button onClick={onClick} type="button" className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm group",
            active
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                : danger
                    ? "text-rose-600 hover:bg-rose-50"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        )}>
            <Icon size={20} className={cn(!active && "text-slate-400 group-hover:text-current", danger && "text-rose-500 group-hover:text-rose-600")} />
            {label}
        </button>
    )
}

function ToggleRow({ label, desc, checked, onChange, badge }: any) {
    return (
        <div className="flex justify-between items-start gap-6">
            <div className="space-y-1 pr-4">
                <div className="flex items-center gap-2">
                    <p className="font-bold text-slate-800">{label}</p>
                    {badge && (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-black uppercase tracking-widest">{badge}</span>
                    )}
                </div>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">{desc}</p>
            </div>
            <button
                onClick={() => onChange(!checked)}
                className={cn(
                    "relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2",
                    checked ? "bg-indigo-600" : "bg-slate-200"
                )}
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={cn(
                        "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        checked ? "translate-x-5" : "translate-x-0"
                    )}
                />
            </button>
        </div>
    )
}

function ThemeOption({ type, label, active, onClick, icon }: any) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center gap-3 w-full group outline-none"
        >
            <div className={cn(
                "w-full aspect-video rounded-2xl p-2 transition-all duration-300 relative",
                active ? "bg-indigo-600 ring-4 ring-indigo-600/20 shadow-xl shadow-indigo-600/30" : "bg-white border-2 border-slate-100 group-hover:border-indigo-300 shadow-sm"
            )}>
                {icon}
                {active && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-md">
                        <CheckCircle2 size={20} className="fill-indigo-600 text-white" />
                    </div>
                )}
            </div>
            <span className={cn(
                "text-xs font-bold transition-colors",
                active ? "text-indigo-600" : "text-slate-500"
            )}>{label}</span>
        </button>
    )
}
