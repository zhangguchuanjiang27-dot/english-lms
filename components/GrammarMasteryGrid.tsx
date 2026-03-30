'use client';

import { useState } from 'react';
import { updateGrammarMastery } from '@/lib/actions/grammar';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Check, CheckCircle2, Circle, AlertTriangle, CircleDot } from 'lucide-react';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type Status = 'NONE' | 'TRIANGLE' | 'CIRCLE' | 'DOUBLE_CIRCLE';

interface GrammarPoint {
    id: string;
    label: string;
    category: string;
    status: Status;
}

interface Props {
    studentId: string;
    initialPoints: GrammarPoint[];
    isAdmin?: boolean;
}

export default function GrammarMasteryGrid({ studentId, initialPoints, isAdmin = false }: Props) {
    const [points, setPoints] = useState(initialPoints);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const categories = {
        'jhs1': '中学1年',
        'jhs2': '中学2年',
        'jhs3': '中学3年'
    };

    const handleToggle = async (pointId: string, currentStatus: Status) => {
        if (!isAdmin) return;
        
        const sequence: Status[] = ['NONE', 'TRIANGLE', 'CIRCLE', 'DOUBLE_CIRCLE'];
        const nextIndex = (sequence.indexOf(currentStatus) + 1) % sequence.length;
        const nextStatus = sequence[nextIndex];

        setUpdatingId(pointId);
        // Optimistic update
        const prevPoints = [...points];
        setPoints(points.map(p => p.id === pointId ? { ...p, status: nextStatus } : p));

        const res = await updateGrammarMastery(studentId, pointId, nextStatus);
        
        if (!res.success) {
            setPoints(prevPoints);
            alert('更新に失敗しました');
        }
        setUpdatingId(null);
    };

    const groupedPoints = points.reduce((acc, p) => {
        if (!acc[p.category]) acc[p.category] = [];
        acc[p.category].push(p);
        return acc;
    }, {} as Record<string, GrammarPoint[]>);

    return (
        <div className="space-y-12">
            {Object.entries(categories).map(([catKey, catLabel]) => (
                <div key={catKey} className="space-y-6">
                    <div className="flex items-center gap-4">
                        <h3 className="text-xl font-black text-slate-800">{catLabel}</h3>
                        <div className="h-px flex-1 bg-slate-200"></div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-lg">
                            {groupedPoints[catKey]?.length || 0} ITEMS
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {groupedPoints[catKey]?.map((point) => (
                            <div
                                key={point.id}
                                onClick={() => handleToggle(point.id, point.status)}
                                className={cn(
                                    "p-5 rounded-2xl border transition-all relative overflow-hidden group",
                                    isAdmin ? "cursor-pointer hover:shadow-md active:scale-95" : "cursor-default",
                                    getBgColor(point.status)
                                )}
                            >
                                <div className="flex items-center justify-between gap-4 relative z-10">
                                    <span className={cn(
                                        "font-bold text-sm",
                                        point.status === 'NONE' ? "text-slate-600" : "text-white"
                                    )}>
                                        {point.label}
                                    </span>
                                    <div className="shrink-0 flex items-center justify-center">
                                        <StatusIcon status={point.status} loading={updatingId === point.id} />
                                    </div>
                                </div>
                                
                                {isAdmin && (
                                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-white/20 p-1 rounded-full text-white">
                                            <Check size={10} className="hidden group-hover:block" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

function StatusIcon({ status, loading }: { status: Status, loading: boolean }) {
    if (loading) {
        return <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>;
    }

    switch (status) {
        case 'TRIANGLE':
            return <span className="text-2xl leading-none">△</span>; // Triangle is simple, better look as text?
        case 'CIRCLE':
            return <span className="text-2xl leading-none">〇</span>;
        case 'DOUBLE_CIRCLE':
            return <span className="text-2xl leading-none">◎</span>;
        default:
            return <div className="w-5 h-5 rounded-full border-2 border-slate-200"></div>;
    }
}

function getBgColor(status: Status) {
    switch (status) {
        case 'TRIANGLE':
            return "bg-amber-500 border-amber-600 shadow-amber-100";
        case 'CIRCLE':
            return "bg-indigo-500 border-indigo-600 shadow-indigo-100";
        case 'DOUBLE_CIRCLE':
            return "bg-emerald-600 border-emerald-700 shadow-emerald-200";
        default:
            return "bg-white border-slate-100 shadow-sm";
    }
}
