'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Zap, Star, ArrowRight, RotateCcw } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface XPResultsViewProps {
    score: number;
    oldLevelInfo: {
        level: number;
        xpInLevel: number;
        xpRequired: number;
    };
    newLevelInfo: {
        level: number;
        xpInLevel: number;
        xpRequired: number;
    };
    onRetry: () => void;
    onBack: () => void;
    wrongAnswersCount: number;
    levelName?: string;
}

export default function XPResultsView({
    score,
    oldLevelInfo,
    newLevelInfo,
    onRetry,
    onBack,
    wrongAnswersCount,
    levelName
}: XPResultsViewProps) {
    const [currentLevel, setCurrentLevel] = useState(oldLevelInfo.level);
    const [displayXP, setDisplayXP] = useState(oldLevelInfo.xpInLevel);
    const [displayRequired, setDisplayRequired] = useState(oldLevelInfo.xpRequired);
    const [isLevelingUp, setIsLevelingUp] = useState(false);
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        // Start animation sequence
        const animateXP = async () => {
            let tempLevel = oldLevelInfo.level;
            let tempXP = oldLevelInfo.xpInLevel;

            // Handle multiple level ups if necessary
            while (tempLevel < newLevelInfo.level) {
                // Animate to 100%
                await new Promise(r => setTimeout(r, 500));
                setDisplayXP(getXpRequired(tempLevel));

                // Wait for bar to fill
                await new Promise(r => setTimeout(r, 800));

                // Trigger level up effect
                setIsLevelingUp(true);
                await new Promise(r => setTimeout(r, 1500));
                setIsLevelingUp(false);

                // Reset for next level
                tempLevel++;
                setCurrentLevel(tempLevel);
                tempXP = 0;
                setDisplayXP(0);
                setDisplayRequired(getXpRequired(tempLevel));
            }

            // Final animation to target XP
            await new Promise(r => setTimeout(r, 500));
            setDisplayXP(newLevelInfo.xpInLevel);

            // Wait and show buttons
            await new Promise(r => setTimeout(r, 1000));
            setShowButtons(true);
        };

        animateXP();
    }, []);

    // Helper to get requirement for any level during animation
    function getXpRequired(level: number) {
        return Math.floor(1000 * Math.pow(1.5, level - 1));
    }

    const progressPercent = Math.min((displayXP / displayRequired) * 100, 100);

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-12 flex flex-col items-center">
            {/* Celebration Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <Trophy size={64} className="text-amber-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Quest Complete!</h1>
                <p className="text-indigo-200 font-medium">{levelName || 'Stage Results'}</p>
            </motion.div>

            {/* XP Gain Stats */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-indigo-900/40 backdrop-blur-xl border border-indigo-500/30 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] w-full shadow-2xl relative overflow-hidden mb-8"
            >
                <div className="text-center mb-8 md:mb-10">
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-indigo-400 mb-1">獲得経験値</p>
                    <p className="text-4xl md:text-6xl font-black text-white">{score} <span className="text-xl md:text-2xl text-indigo-300">EXP</span></p>
                </div>

                {/* Level Progress */}
                <div className="space-y-3 md:space-y-4">
                    <div className="flex justify-between items-end px-1 md:px-2">
                        <div className="flex flex-col">
                            <span className="text-[10px] md:text-xs font-bold text-indigo-400 uppercase tracking-tighter">Level</span>
                            <span className="text-2xl md:text-3xl font-black text-white">{currentLevel}</span>
                        </div>
                        <div className="text-right">
                            <span className="text-xs md:text-sm font-bold text-indigo-200">{Math.floor(displayXP)} / {displayRequired} XP</span>
                        </div>
                    </div>

                    <div className="h-5 md:h-6 w-full bg-indigo-950 rounded-full p-1 border border-indigo-800/50 relative overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                            initial={{ width: `${(oldLevelInfo.xpInLevel / oldLevelInfo.xpRequired) * 100}%` }}
                            animate={{
                                backgroundPosition: ["0% center", "200% center"],
                                width: `${progressPercent}%`
                            }}
                            transition={{
                                backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
                                width: { duration: 0.8, ease: "easeOut" }
                            }}
                        />
                    </div>
                </div>

                {/* Level Up Notification Overlay */}
                <AnimatePresence>
                    {isLevelingUp && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.5 }}
                            className="absolute inset-0 flex items-center justify-center bg-indigo-600/20 backdrop-blur-sm z-20 rounded-[2rem] md:rounded-[3rem]"
                        >
                            <div className="text-center">
                                <motion.div
                                    animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1, 1.2, 1] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Star size={60} className="md:size-[80px] text-amber-400 fill-amber-400 mx-auto mb-2 md:mb-4" />
                                </motion.div>
                                <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter drop-shadow-lg">LEVEL UP!</h2>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Wrong Answers Review if any */}
            {wrongAnswersCount > 0 && showButtons && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full mb-8"
                >
                    <p className="text-center text-rose-400 font-bold mb-4">
                        {wrongAnswersCount}問間違えました。復習しましょう！
                    </p>
                </motion.div>
            )}

            {/* Perfect Clear Badge */}
            {wrongAnswersCount === 0 && showButtons && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="w-full mb-8 flex justify-center"
                >
                    <div className="bg-amber-500/20 border border-amber-500/50 px-6 py-2.5 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                        <Star size={18} className="text-amber-400 fill-amber-400 animate-pulse" />
                        <p className="text-amber-400 font-black tracking-widest uppercase text-sm md:text-base">Perfect Clear!</p>
                        <Star size={18} className="text-amber-400 fill-amber-400 animate-pulse" />
                    </div>
                </motion.div>
            )}

            {/* Buttons */}
            {showButtons && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full"
                >
                    <button
                        onClick={onBack}
                        className="flex-1 py-3.5 md:py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl md:rounded-2xl font-black transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                        <ArrowRight size={18} className="rotate-180" />
                        ステージ選択
                    </button>
                    <button
                        onClick={onRetry}
                        className={cn(
                            "flex-[2] py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base",
                            wrongAnswersCount > 0
                                ? "bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white"
                                : "bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-emerald-950"
                        )}
                    >
                        {wrongAnswersCount > 0 ? (
                            <>
                                <RotateCcw size={18} />
                                復習する
                            </>
                        ) : (
                            <>
                                <Zap size={18} />
                                もう一度プレイ
                            </>
                        )}
                    </button>
                </motion.div>
            )}
        </div>
    );
}
