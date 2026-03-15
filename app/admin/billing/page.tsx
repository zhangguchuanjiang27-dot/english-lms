'use client';

import { useState, useEffect } from 'react';
import {
    CreditCard,
    Search,
    Filter,
    Download,
    MoreVertical,
    DollarSign,
    TrendingUp,
    AlertCircle,
    CheckCircle2,
    Clock,
    Plus,
    X,
    Check
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DataStore, Invoice, Student } from '@/lib/data-store';
import { getInvoices, addInvoice, updateInvoiceStatus, getStudents } from '@/lib/actions/admin';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// 複数のデータを結合してUI用にするための拡張型
type InvoiceWithStudent = Invoice & {
    studentName: string;
};

export default function AdminBillingPage() {
    const [invoices, setInvoices] = useState<InvoiceWithStudent[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Modal
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newInvoiceForm, setNewInvoiceForm] = useState<Partial<Invoice>>({
        status: 'Pending',
        amount: 15000
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        getStudents().then(data => setStudents(data as any));
        getInvoices().then(data => {
            const merged = data.map((inv: any) => ({
                ...inv,
                studentName: inv.student?.name || 'Unknown Student'
            }));
            setInvoices(merged);
        });
    };

    const handleUpdateStatus = (id: string, newStatus: Invoice['status']) => {
        updateInvoiceStatus(id, newStatus).then(res => {
            if (res.success) loadData();
            else alert(res.error);
        });
    };

    const handleCreateInvoice = (e: React.FormEvent) => {
        e.preventDefault();

        addInvoice({
            studentId: newInvoiceForm.studentId || students[0]?.id || '',
            planName: newInvoiceForm.planName || 'General Plan',
            amount: newInvoiceForm.amount || 0,
            dueDate: newInvoiceForm.dueDate || new Date().toISOString().split('T')[0],
            status: newInvoiceForm.status || 'Pending',
        }).then(res => {
            if (res.success) {
                setIsAddModalOpen(false);
                setNewInvoiceForm({ status: 'Pending', amount: 15000 });
                loadData();
            } else {
                alert(res.error);
            }
        });
    };

    // --- KPIs ---
    const totalExpected = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const totalPaid = invoices.filter(i => i.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0);
    const totalOverdue = invoices.filter(i => i.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0);

    // --- Filters ---
    const filteredInvoices = invoices.filter(inv => {
        if (filterStatus !== 'All' && inv.status !== filterStatus) return false;
        if (searchQuery) {
            return inv.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                inv.planName.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
    });

    return (
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6 md:p-8 shrink-0">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            <CreditCard className="text-emerald-600" size={32} />
                            請求・決済管理
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">生徒の請求情報、お支払いのステータス、売上の確認を行います。</p>
                    </div>
                </header>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl">
                                <TrendingUp size={20} />
                            </div>
                            <h3 className="font-bold text-slate-600 text-sm">今月の売上見込（総額）</h3>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-slate-900">¥{totalExpected.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl">
                                <CheckCircle2 size={20} />
                            </div>
                            <h3 className="font-bold text-slate-600 text-sm">今月の受取済</h3>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-slate-900">¥{totalPaid.toLocaleString()}</span>
                            <span className="text-sm font-bold text-emerald-600">({Math.round((totalPaid / totalExpected) * 100 || 0)}%)</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-rose-100 text-rose-600 rounded-xl">
                                <AlertCircle size={20} />
                            </div>
                            <h3 className="font-bold text-slate-600 text-sm">未払い・期限切れ</h3>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-rose-600">¥{totalOverdue.toLocaleString()}</span>
                            {totalOverdue > 0 && <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-md">要確認</span>}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden flex flex-col">

                    {/* Toolbar */}
                    <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
                        <div className="flex flex-1 w-full gap-4 items-center">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="生徒名、プラン名で検索..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <Filter size={18} className="text-slate-400 hidden sm:block" />
                                <select
                                    className="py-2.5 pl-3 pr-8 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="All">すべてのステータス</option>
                                    <option value="Paid">支払済 (Paid)</option>
                                    <option value="Pending">未払い (Pending)</option>
                                    <option value="Overdue">期限切れ (Overdue)</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">
                                <Download size={16} />
                                CSV出力
                            </button>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 border border-transparent text-white rounded-xl font-bold text-sm hover:bg-slate-800 shadow-md transition-all shadow-slate-900/20"
                            >
                                <Plus size={16} />
                                新規請求
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest pl-6 md:pl-8">生徒名</th>
                                    <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">対象プラン / 内容</th>
                                    <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">請求額</th>
                                    <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">支払期限</th>
                                    <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">ステータス</th>
                                    <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right pr-6 md:pr-8">アクション</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredInvoices.length > 0 ? filteredInvoices.map((invoice) => (
                                    <tr key={invoice.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="p-4 pl-6 md:pl-8">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                                                    {invoice.studentName.charAt(0)}
                                                </div>
                                                <span className="font-bold text-slate-900 text-sm">{invoice.studentName}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-bold text-slate-700 text-sm">{invoice.planName}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">作成日: {invoice.createdAt}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className="font-black text-slate-900 text-sm flex items-center">
                                                <DollarSign size={14} className="text-slate-400 mr-0.5" />
                                                {invoice.amount.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm font-medium text-slate-600">{invoice.dueDate}</span>
                                        </td>
                                        <td className="p-4">
                                            <StatusBadge status={invoice.status} />
                                        </td>
                                        <td className="p-4 pr-6 md:pr-8 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {invoice.status !== 'Paid' && (
                                                    <button
                                                        onClick={() => handleUpdateStatus(invoice.id, 'Paid')}
                                                        className="px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 text-xs font-bold rounded-lg transition-colors border border-emerald-100"
                                                    >
                                                        支払済にする
                                                    </button>
                                                )}
                                                <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-slate-500 font-medium">
                                            条件に一致する請求データがありません。
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Invoice Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
                    <form onSubmit={handleCreateInvoice} className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-lg font-bold text-slate-900 border-l-4 border-emerald-500 pl-3">新規請求書作成</h3>
                            <button type="button" onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-white p-2 rounded-full shadow-sm">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-600">対象の生徒</label>
                                <select
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 font-bold text-slate-700"
                                    value={newInvoiceForm.studentId || ''}
                                    onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, studentId: e.target.value })}
                                    required
                                >
                                    <option value="" disabled>生徒を選択してください</option>
                                    {students.map(s => (
                                        <option key={s.id} value={s.id}>{s.name} ({s.id})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-600">プラン名 / 請求内容</label>
                                <input
                                    type="text"
                                    placeholder="例: スタンダード月額プラン"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 font-bold"
                                    value={newInvoiceForm.planName || ''}
                                    onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, planName: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-600">請求額 (円)</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 font-bold"
                                        value={newInvoiceForm.amount || ''}
                                        onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, amount: Number(e.target.value) })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-600">支払期限</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 font-bold"
                                        value={newInvoiceForm.dueDate || ''}
                                        onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, dueDate: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsAddModalOpen(false)}
                                className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-200 rounded-xl transition-colors"
                            >
                                キャンセル
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md rounded-xl transition-colors flex items-center gap-2"
                            >
                                <Check size={16} />
                                作成する
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    );
}

function StatusBadge({ status }: { status: Invoice['status'] }) {
    switch (status) {
        case 'Paid':
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <CheckCircle2 size={12} />
                    支払済 (Paid)
                </span>
            );
        case 'Pending':
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100">
                    <Clock size={12} />
                    未払い (Pending)
                </span>
            );
        case 'Overdue':
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-100">
                    <AlertCircle size={12} />
                    期限超過 (Overdue)
                </span>
            );
        default:
            return null;
    }
}
