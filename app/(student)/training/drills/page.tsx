'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
    X,
    RefreshCcw,
    Trophy,
    Zap,
    ArrowRight,
    Wrench,
    ChevronLeft,
    Keyboard,
    Star
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { VERB_DRILL_DATA, DrillQuestion } from '@/lib/data/drills';
import TrainingHUD from '@/components/training/TrainingHUD';
import XPResultsView from '@/components/training/XPResultsView';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function DrillMasterPage() {
    const router = useRouter();
    const [selectedStageIndex, setSelectedStageIndex] = useState<number | null>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [combo, setCombo] = useState(0);

    const [isGameOver, setIsGameOver] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRetryMode, setIsRetryMode] = useState(false);

    const [stageCompletions, setStageCompletions] = useState<Record<string, number>>({});
    const [stagePerfects, setStagePerfects] = useState<Record<string, number>>({});
    const [stageHighScores, setStageHighScores] = useState<Record<string, number>>({});
    const [postGameStats, setPostGameStats] = useState<any>(null);

    const [gameQuestions, setGameQuestions] = useState<DrillQuestion[]>([]);
    const [wrongAnswers, setWrongAnswers] = useState<DrillQuestion[]>([]);

    // In-game state
    const [inputPast, setInputPast] = useState('');
    const [inputParticiple, setInputParticiple] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [isOk, setIsOk] = useState(false);

    const pastInputRef = useRef<HTMLInputElement>(null);
    const participleInputRef = useRef<HTMLInputElement>(null);

    const question = gameQuestions[currentIndex];
    
    // Calculate stages based on 10 items per stage
    const QUESTIONS_PER_STAGE = 10;
    const totalStages = Math.ceil(VERB_DRILL_DATA.length / QUESTIONS_PER_STAGE);

    // Load completions from DB
    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (!userId) return;

        const fetchProgress = async () => {
            try {
                const res = await fetch(`/api/training/drills?studentId=${userId}`);
                if (res.ok) {
                    const data = await res.json();
                    const completions: Record<string, number> = {};
                    const perfects: Record<string, number> = {};
                    const highScores: Record<string, number> = {};

                    data.forEach((item: any) => {
                        // We use 'verbs' as the level and 'stage_X' as categoryId
                        if (item.level === 'verbs' && item.categoryId.startsWith('stage_')) {
                            const sIdx = parseInt(item.categoryId.replace('stage_', '')) - 1;
                            completions[sIdx] = item.completions;
                            perfects[sIdx] = item.perfectClears || 0;
                            highScores[sIdx] = item.highestScore;
                        }
                    });

                    setStageCompletions(completions);
                    setStagePerfects(perfects);
                    setStageHighScores(highScores);
                }
            } catch (err) {
                console.error("Failed to fetch drill progress", err);
            }
        };

        fetchProgress();
    }, [isGameOver]);

    const startStage = (stageIdx: number) => {
        const start = stageIdx * QUESTIONS_PER_STAGE;
        const end = start + QUESTIONS_PER_STAGE;
        const stageQuestions = VERB_DRILL_DATA.slice(start, end);

        if (stageQuestions.length === 0) {
            alert('このステージの問題はありません。');
            return;
        }

        // Shuffle within the stage
        const shuffled = stageQuestions
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

        setSelectedStageIndex(stageIdx);
        setGameQuestions(shuffled);
        setCurrentIndex(0);
        setScore(0);
        setCombo(0);
        setWrongAnswers([]);
        setIsGameOver(false);
        setIsRetryMode(false);
        setIsPlaying(true);
        resetGameState();
        setPostGameStats(null);
    };

    const startWrongAnswersMode = () => {
        const shuffled = wrongAnswers
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

        setGameQuestions(shuffled);
        setCurrentIndex(0);
        setScore(0);
        setCombo(0);
        setWrongAnswers([]);
        setIsGameOver(false);
        setIsRetryMode(true);
        setIsPlaying(true);
        resetGameState();
        setPostGameStats(null);
    };

    const resetGameState = () => {
        setInputPast('');
        setInputParticiple('');
        setShowResult(false);
        setIsOk(false);
        setTimeout(() => pastInputRef.current?.focus(), 100);
    };

    const handleCheck = () => {
        if (!inputPast.trim() || !inputParticiple.trim()) return;

        const correctPast = question.past.toLowerCase().trim();
        const correctParticiple = question.participle.toLowerCase().trim();
        const typedPast = inputPast.toLowerCase().trim();
        const typedParticiple = inputParticiple.toLowerCase().trim();

        const isCorrect = typedPast === correctPast && typedParticiple === correctParticiple;
        setIsOk(isCorrect);
        setShowResult(true);

        if (isCorrect) {
            setScore(s => s + 100 + (combo * 10)); // Combo bonus
            setCombo(c => c + 1);
        } else {
            setCombo(0);
            if (!wrongAnswers.includes(question)) {
                setWrongAnswers(prev => [...prev, question]);
            }
        }
    };

    const handleDontKnow = () => {
        setIsOk(false);
        setShowResult(true);
        setCombo(0);
        if (!wrongAnswers.includes(question)) {
            setWrongAnswers(prev => [...prev, question]);
        }
    };

    const handleNext = () => {
        if (currentIndex < gameQuestions.length - 1) {
            const nextIdx = currentIndex + 1;
            setCurrentIndex(nextIdx);
            resetGameState();
        } else {
            setIsGameOver(true);
            saveProgress();
        }
    };

    const saveProgress = () => {
        if (selectedStageIndex !== null) {
            const isFullClear = !isRetryMode;
            const isPerfectClear = !isRetryMode && wrongAnswers.length === 0;
            const userId = localStorage.getItem('user_id');

            if (userId) {
                fetch('/api/training/drills', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        studentId: userId,
                        level: 'verbs',
                        categoryId: `stage_${selectedStageIndex + 1}`,
                        score: score,
                        completed: isFullClear,
                        isPerfectClear: isPerfectClear
                    })
                }).then(async res => {
                    if (res.ok) {
                        const data = await res.json();
                        if (data.studentProgress) {
                            setPostGameStats(data.studentProgress);
                        }
                    }
                }).catch(err => console.error("Failed to save drill progress", err));
            }
        }
    };

    if (!isPlaying && !isGameOver) {
        return (
            <main className="flex-1 flex flex-col items-center justify-center bg-slate-900 font-sans min-h-screen text-slate-50 relative overflow-hidden p-6 py-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900 to-slate-950"></div>

                <div className="absolute top-6 left-6 z-20">
                    <button
                        onClick={() => router.push('/training')}
                        className="w-12 h-12 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-full flex items-center justify-center transition-colors shadow-lg"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="relative z-10 w-full max-w-4xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-indigo-900/40 border border-indigo-500/30 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest text-indigo-200 backdrop-blur-md mb-4 shadow-xl">
                            <Keyboard size={16} className="text-indigo-400" />
                            Verb Conjugation Drill
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-xl tracking-tight mb-4 uppercase">Skill<span className="text-indigo-400"> Drills</span></h1>
                        <p className="text-slate-400 font-medium text-lg">動詞の三活用をマスターしてレベルアップせよ</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {Array.from({ length: totalStages }).map((_, i) => {
                            const startNum = i * QUESTIONS_PER_STAGE + 1;
                            const endNum = Math.min((i + 1) * QUESTIONS_PER_STAGE, VERB_DRILL_DATA.length);
                            const perfectsCount = stagePerfects[i] || 0;
                            const highScore = stageHighScores[i] || 0;

                            return (
                                <button
                                    key={i}
                                    onClick={() => startStage(i)}
                                    className="group relative block overflow-hidden rounded-[2rem] bg-slate-800/40 border-2 border-slate-700/50 p-6 text-left transition-all hover:-translate-y-2 hover:bg-slate-800/80 hover:border-indigo-500/50"
                                >
                                    <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[40px] opacity-10 bg-indigo-500 group-hover:opacity-30 transition-opacity"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="text-sm font-bold text-indigo-400">STAGE {i + 1}</div>
                                        </div>
                                        
                                        <h3 className="text-2xl font-black text-white mb-4">No. {startNum} - {endNum}</h3>

                                        <div className="bg-indigo-950/40 rounded-xl p-3 border border-indigo-500/10 mb-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-1.5">
                                                    <Trophy size={12} className={highScore > 0 ? "text-amber-400" : "text-slate-600"} />
                                                    <span className="text-xs font-bold text-slate-300">
                                                        {highScore || '-'}
                                                    </span>
                                                </div>
                                                <div className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">Score</div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1.5">
                                                    <Zap size={12} className={perfectsCount > 0 ? "text-emerald-400" : "text-slate-600"} />
                                                    <span className="text-xs font-bold text-slate-300">
                                                        {perfectsCount} <span className="text-[10px] text-slate-500">Perfect</span>
                                                    </span>
                                                </div>
                                                <div className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter">Hits</div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center pt-4 border-t border-slate-700/50">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">規則・不規則混合</span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all transform group-hover:rotate-12 group-hover:scale-110 shadow-lg group-hover:shadow-indigo-500/40">
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
            <main className="flex-1 p-6 flex flex-col items-center justify-start bg-slate-900 font-sans min-h-screen text-slate-50 relative overflow-y-auto">
                <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] opacity-5 pointer-events-none fixed"></div>

                {postGameStats ? (
                    <XPResultsView
                        score={score}
                        oldLevelInfo={postGameStats.oldLevelInfo}
                        newLevelInfo={postGameStats.newLevelInfo}
                        onRetry={wrongAnswers.length > 0 ? startWrongAnswersMode : () => startStage(selectedStageIndex!)}
                        onBack={() => { setIsGameOver(false); setIsPlaying(false); setSelectedStageIndex(null); }}
                        wrongAnswersCount={wrongAnswers.length}
                        levelName={`Skill Drill - Stage ${selectedStageIndex! + 1}`}
                    />
                ) : (
                    <div className="relative z-10 bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 p-8 md:p-12 rounded-[3rem] text-center max-w-2xl w-full shadow-2xl mt-12 mb-12">
                        <div className="w-12 h-12 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
                        <p className="mt-4 text-slate-400">成果を記録中...</p>
                    </div>
                )}
            </main>
        );
    }

    return (
        <main className="flex-1 flex flex-col items-center justify-center bg-slate-50 font-sans min-h-screen text-slate-800 relative overflow-hidden">
            
            <TrainingHUD
                theme="light"
                score={score}
                combo={combo}
                currentStep={currentIndex + 1}
                totalSteps={gameQuestions.length}
                onClose={() => { setIsGameOver(false); setIsPlaying(false); setSelectedStageIndex(null); }}
            />

            <div className="relative z-10 w-full max-w-2xl px-4 md:px-6 flex flex-col items-center pb-24 mt-20 md:mt-16">
                
                {/* Prompt block */}
                <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-sm border border-slate-100 w-full mb-8 md:mb-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 opacity-20"></div>
                    <div className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">Present (現在形)</div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-700 leading-relaxed">
                        {question?.base}
                    </h2>
                    <p className="text-slate-400 font-bold mt-2">{question?.prompt}</p>
                </div>

                {/* Typing Area */}
                <div className="w-full space-y-4 md:space-y-6">
                    
                    {/* Past Input */}
                    <div className={cn("group transition-all duration-300 transform", showResult ? (inputPast.toLowerCase().trim() === question.past.toLowerCase().trim() ? "translate-x-0" : "translate-x-2") : "")}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Past (過去形)</span>
                            {showResult && (inputPast.toLowerCase().trim() === question.past.toLowerCase().trim() ? 
                                <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1"><Zap size={10} fill="currentColor" /> Correct</span> : 
                                <span className="text-[10px] font-black text-rose-500">Oops!</span>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                ref={pastInputRef}
                                type="text"
                                value={inputPast}
                                onChange={(e) => setInputPast(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') participleInputRef.current?.focus();
                                }}
                                disabled={showResult}
                                placeholder="過去形を入力..."
                                className={cn(
                                    "w-full bg-white border-2 rounded-2xl px-6 py-4 md:py-5 text-xl md:text-2xl font-black outline-none transition-all shadow-sm",
                                    showResult ? (
                                        inputPast.toLowerCase().trim() === question.past.toLowerCase().trim() 
                                            ? "border-emerald-500 text-emerald-600 bg-emerald-50/20" 
                                            : "border-rose-300 text-rose-500 bg-rose-50/20"
                                    ) : "border-slate-100 focus:border-indigo-400 focus:shadow-md text-slate-700 placeholder:text-slate-200"
                                )}
                                autoCapitalize="off"
                                autoComplete="off"
                                autoCorrect="off"
                            />
                            {showResult && inputPast.toLowerCase().trim() !== question.past.toLowerCase().trim() && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-500 font-black text-lg">
                                    {question.past}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Participle Input */}
                    <div className={cn("group transition-all duration-300 transform", showResult ? (inputParticiple.toLowerCase().trim() === question.participle.toLowerCase().trim() ? "translate-x-0" : "translate-x-2") : "")}>
                         <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Past Participle (過去分詞系)</span>
                            {showResult && (inputParticiple.toLowerCase().trim() === question.participle.toLowerCase().trim() ? 
                                <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1"><Zap size={10} fill="currentColor" /> Correct</span> : 
                                <span className="text-[10px] font-black text-rose-500">Oops!</span>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                ref={participleInputRef}
                                type="text"
                                value={inputParticiple}
                                onChange={(e) => setInputParticiple(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleCheck();
                                }}
                                disabled={showResult}
                                placeholder="過去分詞形を入力..."
                                className={cn(
                                    "w-full bg-white border-2 rounded-2xl px-6 py-4 md:py-5 text-xl md:text-2xl font-black outline-none transition-all shadow-sm",
                                    showResult ? (
                                        inputParticiple.toLowerCase().trim() === question.participle.toLowerCase().trim() 
                                            ? "border-emerald-500 text-emerald-600 bg-emerald-50/20" 
                                            : "border-rose-300 text-rose-500 bg-rose-50/20"
                                    ) : "border-slate-100 focus:border-indigo-400 focus:shadow-md text-slate-700 placeholder:text-slate-200"
                                )}
                                autoCapitalize="off"
                                autoComplete="off"
                                autoCorrect="off"
                            />
                             {showResult && inputParticiple.toLowerCase().trim() !== question.participle.toLowerCase().trim() && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-500 font-black text-lg">
                                    {question.participle}
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Footer Controls */}
                <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200/60 p-4 md:p-6 flex justify-between items-center z-[60] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] pb-safe-offset-2">
                    <div className="max-w-3xl mx-auto w-full flex justify-between items-center gap-3">
                        <div className="hidden md:flex flex-col">
                            <div className="text-[10px] font-black uppercase text-slate-400">Shortcut</div>
                            <div className="text-[11px] font-bold text-slate-500">Press ENTER to Submit</div>
                        </div>

                        {!showResult ? (
                            <div className="flex gap-2 w-full md:w-auto">
                                <button
                                    onClick={handleDontKnow}
                                    className="px-4 md:px-6 py-3.5 md:py-4 rounded-[1rem] md:rounded-[1.25rem] font-black text-sm md:text-lg transition-all bg-slate-100 hover:bg-slate-200 text-slate-500 border border-slate-200 active:scale-95 whitespace-nowrap"
                                >
                                    わからない
                                </button>
                                <button
                                    onClick={handleCheck}
                                    disabled={!inputPast.trim() || !inputParticiple.trim()}
                                    className={cn(
                                        "flex-1 md:flex-none px-6 md:px-12 py-3.5 md:py-4 rounded-[1rem] md:rounded-[1.25rem] font-black text-sm md:text-lg transition-all flex items-center justify-center gap-2",
                                        (inputPast.trim() && inputParticiple.trim())
                                            ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-500/20 active:scale-95"
                                            : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                                    )}
                                >
                                    チェック！
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleNext}
                                className={cn(
                                    "flex-1 md:flex-none px-6 md:px-12 py-3.5 md:py-4 rounded-[1rem] md:rounded-[1.25rem] font-black text-sm md:text-lg shadow-xl transition-transform active:scale-95 flex items-center justify-center gap-2",
                                    isOk ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/30" : "bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/30"
                                )}
                            >
                                {isOk ? "次へ進む" : "次へ進む"} <ArrowRight size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
