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
import TrainingHUD from '@/components/training/TrainingHUD';
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

    const [isListeningMode, setIsListeningMode] = useState(false);

    type Question = { word: string; options: string[]; answer: number; };
    const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
    const [wrongAnswers, setWrongAnswers] = useState<Question[]>([]);

    const question = gameQuestions[currentIndex];

    // Audio on start for listening mode
    useEffect(() => {
        if (isPlaying && isListeningMode && !showResult && question) {
            playWord(question.word);
        }
    }, [currentIndex, isPlaying, isListeningMode, showResult, question]);

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
                        const key = `${item.level}_${item.stageIndex}_${item.mode || 'flash'}`;
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

    const playWord = (text: string) => {
        if (!window.speechSynthesis) return;
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
    };

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

        // Play the correct word audio
        playWord(question.word);

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
                            mode: isListeningMode ? 'listen' : 'flash'
                        })
                    }).then(async res => {
                        if (res.ok) {
                            const data = await res.json();
                            const actualProgress = data.progress;
                            const key = `${actualProgress.level}_${actualProgress.stageIndex}_${actualProgress.mode}`;
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

    const startStage = (level: Level, stageIndex: number, listening: boolean = false) => {
        const allQuestions = VOCAB_QUESTIONS[level] || [];
        const stageQuestions = allQuestions.slice(stageIndex * 50, (stageIndex + 1) * 50);
        // Shuffle and select up to 50 questions
        const shuffled = [...stageQuestions].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 50);

        setSelectedLevel(level);
        setSelectedStageIndex(stageIndex);
        setGameQuestions(selected);
        setIsListeningMode(listening);
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
                                <div
                                    key={i}
                                    className="group relative block overflow-hidden rounded-3xl bg-indigo-900/40 border border-indigo-700/50 p-6 text-left transition-all hover:-translate-y-1 hover:bg-indigo-800/60"
                                >
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="text-sm font-bold text-indigo-400">STAGE {i + 1}</div>
                                        </div>
                                        <h3 className="text-2xl font-black text-white mb-4">No. {startNum} - {endNum}</h3>

                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            {/* Flash Stats */}
                                            <div className="bg-indigo-950/40 rounded-xl p-2 border border-indigo-500/10">
                                                <div className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter mb-1">表 (Flash)</div>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1">
                                                        <Trophy size={10} className={stageHighScores[`${selectedLevel}_${i}_flash`] ? "text-amber-400" : "text-slate-600"} />
                                                        <span className="text-[11px] font-bold text-slate-300">
                                                            {stageHighScores[`${selectedLevel}_${i}_flash`] || '-'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Zap size={10} className={stagePerfectClears[`${selectedLevel}_${i}_flash`] ? "text-emerald-400" : "text-slate-600"} />
                                                        <span className="text-[10px] font-bold text-slate-400">
                                                            {stagePerfectClears[`${selectedLevel}_${i}_flash`] || 0} Perfect
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Listen Stats */}
                                            <div className="bg-purple-950/40 rounded-xl p-2 border border-purple-500/10">
                                                <div className="text-[10px] font-black text-purple-400 uppercase tracking-tighter mb-1">裏 (Listen)</div>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1">
                                                        <Trophy size={10} className={stageHighScores[`${selectedLevel}_${i}_listen`] ? "text-amber-400" : "text-slate-600"} />
                                                        <span className="text-[11px] font-bold text-slate-300">
                                                            {stageHighScores[`${selectedLevel}_${i}_listen`] || '-'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Zap size={10} className={stagePerfectClears[`${selectedLevel}_${i}_listen`] ? "text-emerald-400" : "text-slate-600"} />
                                                        <span className="text-[10px] font-bold text-slate-400">
                                                            {stagePerfectClears[`${selectedLevel}_${i}_listen`] || 0} Perfect
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-auto grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => startStage(selectedLevel, i, false)}
                                                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black py-2.5 rounded-xl transition-colors shadow-lg shadow-indigo-900/20"
                                            >
                                                表 (Flash)
                                            </button>
                                            <button
                                                onClick={() => startStage(selectedLevel, i, true)}
                                                className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-black py-2.5 rounded-xl transition-colors shadow-lg shadow-purple-900/20"
                                            >
                                                裏 (Listen)
                                            </button>
                                        </div>
                                    </div>
                                </div>
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
                        onRetry={wrongAnswers.length > 0 ? startWrongAnswersMode : () => startStage(selectedLevel!, selectedStageIndex!, isListeningMode)}
                        onBack={() => { setIsGameOver(false); setIsPlaying(false); }}
                        wrongAnswersCount={wrongAnswers.length}
                        levelName={`Flash Dash ${isListeningMode ? '(裏)' : '(表)'} - ${LEVELS.find(l => l.id === selectedLevel)?.name}`}
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

            <TrainingHUD
                theme="dark"
                score={score}
                combo={combo}
                currentStep={currentIndex + 1}
                totalSteps={gameQuestions.length}
                onClose={() => { setIsGameOver(false); setIsPlaying(false); }}
            />

            <div className="relative z-10 w-full max-w-2xl px-4 md:px-6 pt-16 md:pt-12">

                {/* Progress (Optional visual detail) */}
                <div className="flex justify-end items-end mb-3 md:mb-4 opacity-70">
                    <span className="text-[10px] md:text-xs font-bold text-indigo-300 tracking-wider">
                        Wave {currentIndex + 1}/{gameQuestions.length}
                    </span>
                </div>

                {/* Timer Bar */}
                <div className="h-2.5 md:h-3 w-full bg-indigo-900 rounded-full overflow-hidden border border-indigo-800 mb-6 md:mb-8 shadow-inner relative">
                    <div
                        className={cn("absolute top-0 left-0 h-full rounded-full transition-all duration-100",
                            timeLeft > 5 ? "bg-emerald-400" : timeLeft > 2 ? "bg-amber-400" : "bg-rose-50"
                        )}
                        style={{ width: `${(timeLeft / 10) * 100}%` }}
                    ></div>
                </div>

                {/* Question Area */}
                <div className="text-center mb-8 md:mb-12 min-h-[120px] md:min-h-[160px] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        {isListeningMode && !showResult ? (
                            <button
                                onClick={() => playWord(question.word)}
                                className="w-24 h-24 md:w-32 md:h-32 bg-indigo-600/30 hover:bg-indigo-600/50 rounded-full flex items-center justify-center border-4 border-indigo-500/30 transition-all active:scale-95"
                            >
                                <Zap size={48} className="text-indigo-400 animate-pulse" />
                            </button>
                        ) : (
                            <h2 className={cn(
                                "text-5xl md:text-8xl font-black drop-shadow-xl tracking-tight break-all transition-all duration-500",
                                isListeningMode && showResult ? "text-amber-400" : "text-white"
                            )}>
                                {question?.word}
                            </h2>
                        )}
                        {isListeningMode && !showResult && (
                            <p className="text-indigo-300 font-bold tracking-widest animate-pulse">LISTENING...</p>
                        )}
                    </div>
                </div>

                {/* Options (4 Choices) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pb-8">
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
                                    "p-5 md:p-6 text-lg md:text-2xl font-black rounded-2xl md:rounded-[2rem] border-2 transition-all duration-200 active:scale-95 shadow-lg",
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
