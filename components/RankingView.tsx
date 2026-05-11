'use client';

import { useState, useEffect } from 'react';
import { Trophy, Flame, Star, Medal, ArrowLeft, Users, Crown, Edit2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface RankingViewProps {
    onClose: () => void;
    currentStudentId?: string;
}

export default function RankingView({ onClose, currentStudentId }: RankingViewProps) {
    const [tab, setTab] = useState<'streak' | 'level'>('streak');
    const [data, setData] = useState<{ streakRanking: any[], levelRanking: any[] }>({ streakRanking: [], levelRanking: [] });
    const [loading, setLoading] = useState(true);
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const [newNickname, setNewNickname] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const fetchRankings = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/student/rankings');
            if (res.ok) {
                const json = await res.json();
                setData(json);
            }
        } catch (err) {
            console.error('Failed to fetch rankings', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRankings();
    }, []);

    const handleUpdateNickname = async () => {
        if (!currentStudentId || !newNickname.trim()) return;
        setIsSaving(true);
        try {
            const res = await fetch('/api/student/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: currentStudentId, nickname: newNickname.trim() })
            });
            if (res.ok) {
                setIsEditingNickname(false);
                fetchRankings(); // Refresh list
            }
        } catch (err) {
            console.error('Failed to update nickname', err);
        } finally {
            setIsSaving(false);
        }
    };

    const rankingData = tab === 'streak' ? data.streakRanking : data.levelRanking;

    return (
        <div className="flex flex-col h-full bg-slate-950 text-slate-50">
            {/* Header */}
            <div className="p-4 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center gap-3 md:gap-4 self-start">
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 -ml-2">
                        <ArrowLeft size={20} className="md:w-6 md:h-6" />
                    </button>
                    <div>
                        <h2 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
                            <Trophy className="text-amber-400 w-5 h-5 md:w-6 md:h-6" />
                            RANKINGS
                        </h2>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Top Players</p>
                    </div>
                </div>
                
                <div className="flex bg-slate-800 p-1 rounded-xl w-full sm:w-auto">
                    <button 
                        onClick={() => setTab('streak')}
                        className={cn(
                            "flex-1 sm:flex-none px-4 py-2 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-widest transition-all",
                            tab === 'streak' ? "bg-rose-600 text-white shadow-lg shadow-rose-900/20" : "text-slate-400 hover:text-white"
                        )}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Flame size={14} />
                            STREAK
                        </div>
                    </button>
                    <button 
                        onClick={() => setTab('level')}
                        className={cn(
                            "flex-1 sm:flex-none px-4 py-2 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-widest transition-all",
                            tab === 'level' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20" : "text-slate-400 hover:text-white"
                        )}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Star size={14} />
                            LEVEL
                        </div>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto space-y-4">
                        {rankingData.map((student, index) => {
                            const isMe = student.id === currentStudentId;
                            const rank = index + 1;
                            
                            return (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    key={student.id}
                                    className={cn(
                                        "group relative flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl border transition-all",
                                        isMe ? "bg-indigo-600/10 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.1)]" : "bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
                                    )}
                                >
                                    {/* Rank Badge */}
                                    <div className="w-10 flex-shrink-0 flex justify-center">
                                        {rank === 1 ? (
                                            <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.4)]">
                                                <Crown size={16} className="text-amber-950" />
                                            </div>
                                        ) : rank === 2 ? (
                                            <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(203,213,225,0.4)]">
                                                <Medal size={16} className="text-slate-900" />
                                            </div>
                                        ) : rank === 3 ? (
                                            <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(180,83,9,0.4)]">
                                                <Medal size={16} className="text-amber-100" />
                                            </div>
                                        ) : (
                                            <span className="text-lg font-black text-slate-600">{rank}</span>
                                        )}
                                    </div>

                                    {/* Avatar */}
                                    <div className="w-12 h-12 rounded-xl bg-slate-800 overflow-hidden border border-slate-700 flex-shrink-0">
                                        {student.avatarUrl ? (
                                            <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
                                                <Users size={20} className="text-slate-500" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Name & Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                            {isMe && isEditingNickname ? (
                                                <div className="flex items-center gap-2 w-full">
                                                    <input 
                                                        autoFocus
                                                        value={newNickname}
                                                        onChange={(e) => setNewNickname(e.target.value)}
                                                        placeholder="Nickname"
                                                        className="bg-slate-800 border border-indigo-500/50 rounded-lg px-3 py-1 text-sm text-white w-full outline-none focus:ring-2 ring-indigo-500/30"
                                                    />
                                                    <button 
                                                        onClick={handleUpdateNickname}
                                                        disabled={isSaving}
                                                        className="p-2 bg-indigo-600 rounded-lg text-white disabled:opacity-50"
                                                    >
                                                        {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check size={16} />}
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <h3 className="font-black text-white truncate text-base md:text-lg">
                                                        {student.nickname || `Adventurer_${student.id.slice(-4)}`}
                                                    </h3>
                                                    {isMe && (
                                                        <button 
                                                            onClick={() => {
                                                                setNewNickname(student.nickname || '');
                                                                setIsEditingNickname(true);
                                                            }}
                                                            className="p-1 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-indigo-400 transition-colors"
                                                        >
                                                            <Edit2 size={12} />
                                                        </button>
                                                    )}
                                                    {isMe && !isEditingNickname && <span className="bg-indigo-600 text-[8px] md:text-[9px] font-black uppercase px-2 py-0.5 rounded-full text-white">YOU</span>}
                                                </>
                                            )}
                                        </div>
                                        {!isEditingNickname && tab === 'level' && (
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                                Level {student.questLevel} • {student.questXP.toLocaleString()} XP
                                            </p>
                                        )}
                                    </div>

                                    {/* Score */}
                                    <div className="text-right">
                                        {tab === 'streak' ? (
                                            <div className="flex flex-col items-end">
                                                <div className="flex items-center gap-1.5 text-rose-400 font-black text-xl">
                                                    <Flame size={18} />
                                                    {student.questStreak}
                                                </div>
                                                <p className="text-[9px] font-black text-slate-600 uppercase tracking-tighter">Days Streak</p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-end">
                                                <div className="flex items-center gap-1.5 text-indigo-400 font-black text-xl">
                                                    <Star size={18} />
                                                    {student.questLevel}
                                                </div>
                                                <p className="text-[9px] font-black text-slate-600 uppercase tracking-tighter">Current Level</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
