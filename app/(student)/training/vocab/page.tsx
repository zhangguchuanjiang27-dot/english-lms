'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Zap,
    X,
    Flame,
    Trophy,
    ArrowRight,
    BookOpen
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { VOCAB_QUESTIONS } from '@/lib/data/vocab';
import XPResultsView from '@/components/training/XPResultsView';
import { getLevelInfo } from '@/lib/quest-utils';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type Level = 'jhs1' | 'jhs2' | 'jhs3';

const LEVELS = [
    { id: 'jhs1', name: '中学1年生', sub: 'Level 1', color: 'from-emerald-400 to-emerald-600', shadow: 'shadow-emerald-500/30' },
    { id: 'jhs2', name: '中学2年生', sub: 'Level 2', color: 'from-amber-400 to-amber-600', shadow: 'shadow-amber-500/30' },
    { id: 'jhs3', name: '中学3年生', sub: 'Level 3', color: 'from-rose-400 to-rose-600', shadow: 'shadow-rose-500/30' },
] as const;

export default function FlashDashPage() {
    const router = useRouter();
    const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [combo, setCombo] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10); // 10 seconds per question
    const [isGameOver, setIsGameOver] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedStageIndex, setSelectedStageIndex] = useState<number | null>(null);
    const [isRetryMode, setIsRetryMode] = useState(false);
    const [stageCompletions, setStageCompletions] = useState<Record<string, number>>({});
    const [stagePerfectClears, setStagePerfectClears] = useState<Record<string, number>>({});
    const [stageHighScores, setStageHighScores] = useState<Record<string, number>>({});
    const [preGameStats, setPreGameStats] = useState<any>(null);
    const [postGameStats, setPostGameStats] = useState<any>(null);

    type Question = { word: string; options: string[]; answer: number; };
    const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
    const [wrongAnswers, setWrongAnswers] = useState<Question[]>([]);

    const question = gameQuestions[currentIndex];

    // Load completions from DB on mount
    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (!userId) return;

        const fetchProgress = async () => {
            try {
                const profileRes = await fetch(`/api/student/profile?id=${userId}`);
                if (profileRes.ok) {
                    const profileData = await profileRes.json();
                    setPreGameStats(getLevelInfo(profileData.questXP || 0));
                }

                const res = await fetch(`/api/training/vocab?studentId=${userId}`);
                if (res.ok) {
                    const data = await res.json();

                    const completions: Record<string, number> = {};
                    const perfectClears: Record<string, number> = {};
                    const highScores: Record<string, number> = {};

                    data.forEach((item: any) => {
                        const key = `${item.level}_${item.stageIndex}`;
                        completions[key] = item.completions;
                        perfectClears[key] = item.perfectClears || 0;
                        highScores[key] = item.highestScore;
                    });

                    setStageCompletions(completions);
                    setStagePerfectClears(perfectClears);
                    setStageHighScores(highScores);
                }
            } catch (err) {
                console.error("Failed to fetch progress", err);
            }
        };

        fetchProgress();
    }, []);

    // Timer effect
    useEffect(() => {
        if (isGameOver || showResult || !isPlaying || gameQuestions.length === 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0.1) {
                    handleAnswer(-1);
                    return 0;
                }
                return prev - 0.1;
            });
        }, 100);

        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, isGameOver, showResult, isPlaying, gameQuestions.length]);

    const handleAnswer = (optionIndex: number) => {
        if (showResult || isGameOver || !question) return;

        setSelectedOption(optionIndex);
        setShowResult(true);

        const isCorrect = optionIndex === question.answer;

        if (isCorrect) {
            setScore(s => s + 100 + (combo * 10)); // Combo bonus
            setCombo(c => c + 1);
        } else {
            setCombo(0);
            setWrongAnswers(prev => [...prev, question]);
        }

        setTimeout(() => {
            nextQuestion();
        }, 1000);
    };

    const nextQuestion = () => {
        if (currentIndex < gameQuestions.length - 1) {
            setCurrentIndex(i => i + 1);
            setTimeLeft(10); // Reset timer
            setSelectedOption(null);
            setShowResult(false);
        } else {
            setIsGameOver(true);

            // Save to database
            if (selectedStageIndex !== null && selectedLevel !== null) {
                const isFullClear = !isRetryMode;
                const userId = localStorage.getItem('user_id');

                if (userId) {
                    fetch('/api/training/vocab', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            studentId: userId,
                            level: selectedLevel,
                            stageIndex: selectedStageIndex,
                            score: score,
                            completed: isFullClear,
                            isPerfectClear: isFullClear && wrongAnswers.length === 0,
                        })
                    }).then(async res => {
                        if (res.ok) {
                            const data = await res.json();
                            const actualProgress = data.progress;
                            const key = `${actualProgress.level}_${actualProgress.stageIndex}`;
                            setStageCompletions(prev => ({ ...prev, [key]: actualProgress.completions }));
                            setStagePerfectClears(prev => ({ ...prev, [key]: actualProgress.perfectClears || 0 }));
                            setStageHighScores(prev => ({ ...prev, [key]: actualProgress.highestScore }));

                            if (data.studentProgress) {
                                setPostGameStats(data.studentProgress);
                            }
                        }
                    }).catch(err => console.error("Failed to save progress", err));
                }
            }
        }
    };

    const startStage = (level: Level, stageIndex: number) => {
        const allQuestions = VOCAB_QUESTIONS[level] || [];
        const stageQuestions = allQuestions.slice(stageIndex * 50, (stageIndex + 1) * 50);
        // Shuffle and select up to 50 questions
        const shuffled = [...stageQuestions].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 50);

        setSelectedLevel(level);
        setSelectedStageIndex(stageIndex);
        setGameQuestions(selected);
        setCurrentIndex(0);
        setScore(0);
        setCombo(0);
        setWrongAnswers([]);
        setTimeLeft(10);
        setIsGameOver(false);
        setIsRetryMode(false);
        setIsPlaying(true);
        setSelectedOption(null);
        setShowResult(false);
        setPostGameStats(null); // Reset post stats for new game
    };

    const startWrongAnswersMode = () => {
        // Shuffle the wrong answers to retry
        const shuffled = [...wrongAnswers].sort(() => 0.5 - Math.random());
        setGameQuestions(shuffled);
        setCurrentIndex(0);
        setScore(0);
        setCombo(0);
        setWrongAnswers([]); // Reset wrong answers for this retry run
        setTimeLeft(10);
        setIsGameOver(false);
        setIsRetryMode(true);
        setIsPlaying(true);
        setSelectedOption(null);
        setShowResult(false);
    };

    if (!selectedLevel) {
        return (
            <main className="flex-1 flex flex-col items-center justify-center bg-indigo-950 font-sans min-h-screen text-slate-50 relative overflow-hidden p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-800/40 via-indigo-950 to-slate-900"></div>

                <div className="absolute top-6 left-6 z-20">
                    <button
                        onClick={() => router.push('/training')}
                        className="w-12 h-12 bg-indigo-900/50 hover:bg-indigo-800 border border-indigo-700/50 rounded-full flex items-center justify-center transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="relative z-10 w-full max-w-4xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-indigo-900/50 border border-indigo-400/30 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest text-indigo-200 backdrop-blur-md mb-4">
                            <Zap size={16} className="text-indigo-400" />
                            Vocab Quest
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-xl tracking-tight mb-4">Flash Dash</h1>
                        <p className="text-indigo-200 font-medium text-lg">挑戦するレベルを選択してください</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {LEVELS.map((level) => (
                            <button
                                key={level.id}
                                onClick={() => setSelectedLevel(level.id)}
                                className="group relative block overflow-hidden rounded-[2rem] bg-indigo-900/40 border border-indigo-700/50 p-8 text-left transition-all hover:-translate-y-2 hover:bg-indigo-800/60"
                            >
                                <div className={cn("absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity", `bg-gradient-to-br ${level.color}`)}></div>

                                <div className="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
                                    <div>
                                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg", `bg-gradient-to-br ${level.color} ${level.shadow}`)}>
                                            <BookOpen size={24} className="text-white" />
                                        </div>
                                        <h3 className="text-3xl font-black text-white mb-2">{level.name}</h3>
                                        <p className="text-indigo-300 font-bold">{level.sub}</p>
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-indigo-900 transition-colors">
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    if (selectedLevel && !isPlaying && !isGameOver) {
        const allQuestions = VOCAB_QUESTIONS[selectedLevel] || [];
        const totalStages = Math.ceil(allQuestions.length / 50) || 1;

        return (
            <main className="flex-1 flex flex-col items-center justify-center bg-indigo-950 font-sans min-h-screen text-slate-50 relative overflow-hidden p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-800/40 via-indigo-950 to-slate-900"></div>

                <div className="absolute top-6 left-6 z-20">
                    <button
                        onClick={() => setSelectedLevel(null)}
                        className="w-12 h-12 bg-indigo-900/50 hover:bg-indigo-800 border border-indigo-700/50 rounded-full flex items-center justify-center transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="relative z-10 w-full max-w-4xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-indigo-900/50 border border-indigo-400/30 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest text-indigo-200 backdrop-blur-md mb-4">
                            <Zap size={16} className="text-indigo-400" />
                            {LEVELS.find(l => l.id === selectedLevel)?.name}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-xl tracking-tight mb-4">
                            ステージ選択
                        </h1>
                        <p className="text-indigo-200 font-medium text-lg">50問ごとに区切られたステージに挑戦しよう</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: totalStages }).map((_, i) => {
                            const startNum = i * 50 + 1;
                            const endNum = Math.min((i + 1) * 50, Math.max(allQuestions.length, 1));
                            const completionKey = `${selectedLevel}_${i}`;
                            const perfectClears = stagePerfectClears[completionKey] || 0;
                            const highScore = stageHighScores[completionKey] || null;

                            return (
                                <button
                                    key={i}
                                    onClick={() => startStage(selectedLevel, i)}
                                    className="group relative block overflow-hidden rounded-3xl bg-indigo-900/40 border border-indigo-700/50 p-6 text-left transition-all hover:-translate-y-1 hover:bg-indigo-800/60"
                                >
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="text-sm font-bold text-indigo-400">STAGE {i + 1}</div>
                                            {perfectClears > 0 && (
                                                <div className="text-[10px] bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded-full font-bold border border-amber-500/30 flex items-center gap-1">
                                                    <Trophy size={10} />
                                                    {perfectClears}回 Perfect!
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-2xl font-black text-white mb-4">No. {startNum} - {endNum}</h3>

                                        <div className="mt-auto flex justify-between items-end">
                                            <div>
                                                {highScore !== null && (
                                                    <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                                                        <Trophy size={14} className="text-amber-400" />
                                                        <span className="text-sm font-bold text-slate-300">
                                                            High: <span className="text-amber-400">{highScore}</span>
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-indigo-900 transition-colors">
                                                <ArrowRight size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </main>
        );
    }

    if (isGameOver) {
        return (
            <main className="flex-1 p-6 flex flex-col items-center justify-start bg-indigo-950 font-sans min-h-screen text-slate-50 relative overflow-y-auto">
                <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] opacity-10 pointer-events-none fixed"></div>

                {postGameStats ? (
                    <XPResultsView
                        score={score}
                        oldLevelInfo={postGameStats.oldLevelInfo}
                        newLevelInfo={postGameStats.newLevelInfo}
                        onRetry={wrongAnswers.length > 0 ? startWrongAnswersMode : () => startStage(selectedLevel!, selectedStageIndex!)}
                        onBack={() => { setIsGameOver(false); setIsPlaying(false); }}
                        wrongAnswersCount={wrongAnswers.length}
                        levelName={`Flash Dash - ${LEVELS.find(l => l.id === selectedLevel)?.name}`}
                    />
                ) : (
                    <div className="relative z-10 bg-indigo-900/80 backdrop-blur-xl border border-indigo-500/30 p-8 md:p-12 rounded-[3rem] text-center max-w-2xl w-full shadow-2xl mt-12 mb-12">
                        <div className="w-12 h-12 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
                        <p className="mt-4 text-indigo-200">成果を記録中...</p>
                    </div>
                )}
            </main>
        );
    }

    return (
        <main className="flex-1 flex flex-col items-center justify-center bg-indigo-950 font-sans min-h-screen text-slate-50 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-800/40 via-indigo-950 to-slate-900"></div>

            {/* Combo flash effect */}
            {combo > 2 && (
                <div className="absolute inset-0 bg-amber-500/5 animate-pulse pointer-events-none"></div>
            )}

            <div className="relative z-10 w-full max-w-2xl px-6">

                {/* Header (HUD) */}
                <header className="flex justify-between items-center mb-12 bg-indigo-900/50 backdrop-blur-md p-4 rounded-3xl border border-indigo-500/20">
                    <button
                        onClick={() => { setIsGameOver(false); setIsPlaying(false); }}
                        className="w-10 h-10 bg-indigo-800/50 hover:bg-indigo-700 rounded-full flex items-center justify-center transition-colors border border-indigo-600/30"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Flame size={20} className={cn("transition-colors", combo > 2 ? "text-amber-500 animate-bounce" : "text-slate-500")} />
                            <span className={cn("font-black text-lg", combo > 2 ? "text-amber-400" : "text-slate-400")}>x{combo}</span>
                        </div>
                        <div className="h-8 w-[2px] bg-indigo-800/50"></div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-0.5">経験値</p>
                            <p className="text-2xl font-black leading-none flex items-baseline justify-end gap-1">
                                {score} <span className="text-xs font-bold text-indigo-400">EXP</span>
                            </p>
                        </div>
                    </div>
                </header>

                {/* Progress */}
                <div className="flex justify-end items-end mb-4">
                    <span className="text-xs font-bold text-indigo-300 tracking-wider">
                        Wave {currentIndex + 1}/{gameQuestions.length}
                    </span>
                </div>

                {/* Timer Bar */}
                <div className="h-3 w-full bg-indigo-900 rounded-full overflow-hidden border border-indigo-800 mb-8 shadow-inner relative">
                    <div
                        className={cn("absolute top-0 left-0 h-full rounded-full transition-all duration-100",
                            timeLeft > 5 ? "bg-emerald-400" : timeLeft > 2 ? "bg-amber-400" : "bg-rose-500"
                        )}
                        style={{ width: `${(timeLeft / 10) * 100}%` }}
                    ></div>
                </div>

                {/* Question Area */}
                <div className="text-center mb-12 min-h-[160px] flex items-center justify-center">
                    <h2 className="text-6xl md:text-8xl font-black text-white drop-shadow-xl tracking-tight">
                        {question?.word}
                    </h2>
                </div>

                {/* Options (4 Choices) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {question?.options.map((option: string, idx: number) => {
                        let btnClass = "bg-indigo-800/60 border-indigo-600/30 hover:bg-indigo-700 hover:border-indigo-400 text-indigo-100";

                        if (showResult) {
                            if (idx === question.answer) {
                                btnClass = "bg-emerald-500 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]"; // Correct
                            } else if (idx === selectedOption) {
                                btnClass = "bg-rose-500 border-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]"; // Wrong selected
                            } else {
                                btnClass = "bg-indigo-900/30 border-indigo-800/30 text-indigo-500 opacity-50"; // Dimmed
                            }
                        }

                        return (
                            <button
                                key={idx}
                                disabled={showResult}
                                onClick={() => handleAnswer(idx)}
                                className={cn(
                                    "p-6 text-xl md:text-2xl font-black rounded-[2rem] border-2 transition-all duration-200 active:scale-95 shadow-lg",
                                    btnClass
                                )}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

            </div>
        </main>
    );
}
