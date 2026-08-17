'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
    X,
    Trophy,
    Zap,
    ArrowRight,
    Keyboard,
    ChevronLeft,
    RefreshCcw
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FILL_IN_CATEGORIES, FillInQuestion } from '@/lib/data/fill-in';
import TrainingHUD from '@/components/training/TrainingHUD';
import XPResultsView from '@/components/training/XPResultsView';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}



const QUESTIONS_PER_STAGE = 10;

type LevelInfo = {
    level: number;
    xpInLevel: number;
    xpRequired: number;
    progress: number;
};

type PostGameStats = {
    oldLevelInfo: LevelInfo;
    newLevelInfo: LevelInfo;
};

type FillInProgressItem = {
    level: string;
    stageIndex: number;
    completions: number;
    perfectClears?: number;
    highestScore: number;
};

export default function FillInPage() {
    const router = useRouter();
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [selectedSubStageIndex, setSelectedSubStageIndex] = useState<number | null>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [combo, setCombo] = useState(0);

    const [isGameOver, setIsGameOver] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRetryMode, setIsRetryMode] = useState(false);

    const [stagePerfectClears, setStagePerfectClears] = useState<Record<string, number>>({});
    const [stageHighScores, setStageHighScores] = useState<Record<string, number>>({});
    const [postGameStats, setPostGameStats] = useState<PostGameStats | null>(null);
    const [startTime, setStartTime] = useState<number | null>(null);

    const [gameQuestions, setGameQuestions] = useState<FillInQuestion[]>([]);
    const [wrongAnswers, setWrongAnswers] = useState<FillInQuestion[]>([]);

    // In-game state
    const [inputs, setInputs] = useState<Record<number, string>>({});
    const [showResult, setShowResult] = useState(false);
    const [isOk, setIsOk] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const question = gameQuestions[currentIndex];

    // Load completions from DB on mount
    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (!userId) return;

        const fetchProgress = async () => {
            try {
                const res = await fetch(`/api/training/fill-in?studentId=${userId}`);
                if (res.ok) {
                    const data = await res.json() as FillInProgressItem[];
                    const pClears: Record<string, number> = {};
                    const highScores: Record<string, number> = {};

                    data.forEach((item) => {
                        const key = `${item.level}_${item.stageIndex}`;
                        pClears[key] = item.perfectClears || 0;
                        highScores[key] = item.highestScore;
                    });

                    setStagePerfectClears(pClears);
                    setStageHighScores(highScores);
                }
            } catch (err) {
                console.error("Failed to fetch progress", err);
            }
        };

        fetchProgress();
    }, [isGameOver]);

    const startStage = (categoryId: string, subStageIndex: number) => {
        const category = FILL_IN_CATEGORIES.find(c => c.id === categoryId);
        const allQuestions = category?.questions || [];
        const stageQuestions = allQuestions.slice(subStageIndex * QUESTIONS_PER_STAGE, (subStageIndex + 1) * QUESTIONS_PER_STAGE);

        if (stageQuestions.length === 0) {
            alert('このステージの問題はまだ用意されていません！');
            return;
        }

        // Shuffle questions
        const selected = [...stageQuestions]
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

        setSelectedCategoryId(categoryId);
        setSelectedSubStageIndex(subStageIndex);
        setGameQuestions(selected);
        setCurrentIndex(0);
        setScore(0);
        setCombo(0);
        setWrongAnswers([]);
        setIsGameOver(false);
        setIsRetryMode(false);
        setIsPlaying(true);
        resetGameState();
        setPostGameStats(null);
        setStartTime(Date.now());
    };

    const startWrongAnswersMode = () => {
        const shuffled = [...wrongAnswers]
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
        setStartTime(Date.now());
    };

    const resetGameState = () => {
        setInputs({});
        setShowResult(false);
        setIsOk(false);
        // Focus first input automatically if playing
        setTimeout(() => {
            if (inputRefs.current[0]) {
                inputRefs.current[0].focus();
            }
        }, 100);
    };

    const handleCheck = () => {
        if (!question) return;
        
        let allCorrect = true;
        for (let i = 0; i < question.blanks.length; i++) {
            const userAnswer = (inputs[i] || '').trim().toLowerCase();
            const correctAnswer = question.blanks[i].word.toLowerCase();
            if (userAnswer !== correctAnswer) {
                allCorrect = false;
                break;
            }
        }

        setIsOk(allCorrect);
        setShowResult(true);

        if (allCorrect) {
            setScore(s => s + 500 + (combo * 50));
            setCombo(c => c + 1);
        } else {
            setCombo(0);
            if (!wrongAnswers.includes(question)) {
                setWrongAnswers(prev => [...prev, question]);
            }
        }
    };

    const handleNext = () => {
        if (currentIndex < gameQuestions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            resetGameState();
        } else {
            setIsGameOver(true);
            saveProgress();
        }
    };

    const saveProgress = () => {
        if (selectedSubStageIndex !== null && selectedCategoryId !== null) {
            const isFullClear = !isRetryMode;
            const isPerfectClear = !isRetryMode && wrongAnswers.length === 0;
            const userId = localStorage.getItem('user_id');

            if (userId) {
                fetch('/api/training/fill-in', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        studentId: userId,
                        level: selectedCategoryId,
                        stageIndex: selectedSubStageIndex,
                        score: score,
                        completed: isFullClear,
                        isPerfectClear: isPerfectClear,
                        duration: startTime ? Math.floor((Date.now() - startTime) / 1000) : 0
                    })
                }).then(async res => {
                    if (res.ok) {
                        const data = await res.json();
                        const actualProgress = data.progress;
                        const key = `${actualProgress.level}_${actualProgress.stageIndex}`;
                        setStagePerfectClears(prev => ({ ...prev, [key]: actualProgress.perfectClears || 0 }));
                        setStageHighScores(prev => ({ ...prev, [key]: actualProgress.highestScore }));

                        if (data.studentProgress) {
                            setPostGameStats(data.studentProgress);
                        }
                    }
                }).catch(err => console.error("Failed to save progress", err));
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Enter') {
            if (showResult) {
                handleNext();
            } else {
                // If there are more inputs, focus the next one
                if (index < question.blanks.length - 1) {
                    inputRefs.current[index + 1]?.focus();
                } else {
                    handleCheck();
                }
            }
        }
    };

    const renderSentence = () => {
        if (!question) return null;

        const tokens = question.sentence.split(' ').filter(w => w.length > 0);
        let blankCounter = 0;

        return (
            <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-2 text-2xl md:text-4xl font-bold text-slate-700 leading-relaxed">
                {tokens.map((token, idx) => {
                    if (token.startsWith('[') && token.endsWith(']')) {
                        const currentBlankIndex = blankCounter++;
                        const isIncorrect = showResult && !isOk && (inputs[currentBlankIndex] || '').trim().toLowerCase() !== question.blanks[currentBlankIndex].word.toLowerCase();
                        const isCorrect = showResult && isOk;

                        return (
                            <span key={idx} className="relative mx-1 inline-flex flex-col items-center">
                                <input
                                    ref={el => { inputRefs.current[currentBlankIndex] = el; }}
                                    type="text"
                                    value={inputs[currentBlankIndex] || ''}
                                    onChange={(e) => setInputs(prev => ({ ...prev, [currentBlankIndex]: e.target.value }))}
                                    onKeyDown={(e) => handleKeyDown(e, currentBlankIndex)}
                                    disabled={showResult}
                                    className={cn(
                                        "w-32 md:w-40 border-b-4 border-slate-300 bg-slate-50 text-center focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors rounded-t-lg",
                                        isCorrect && "border-emerald-500 text-emerald-600 bg-emerald-50",
                                        isIncorrect && "border-rose-500 text-rose-500 bg-rose-50"
                                    )}
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="none"
                                    spellCheck="false"
                                />
                                {showResult && isIncorrect && (
                                    <span className="absolute top-full mt-1 text-sm text-rose-500 font-black">
                                        {question.blanks[currentBlankIndex].word}
                                    </span>
                                )}
                            </span>
                        );
                    }
                    return <span key={idx}>{token}</span>;
                })}
            </div>
        );
    };

    if (!selectedCategoryId) {
        const categories = FILL_IN_CATEGORIES;

        return (
            <main className="flex-1 flex flex-col items-center justify-center bg-slate-900 font-sans min-h-screen text-slate-50 relative overflow-hidden p-6 py-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-700/20 via-slate-900 to-slate-950"></div>

                <div className="absolute top-6 left-6 z-20">
                    <button
                        onClick={() => router.push('/training')}
                        className="w-12 h-12 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-full flex items-center justify-center transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="relative z-10 w-full max-w-5xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-emerald-900/40 border border-emerald-500/30 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest text-emerald-200 backdrop-blur-md mb-4">
                            <Keyboard size={16} className="text-emerald-400" />
                            Blank Quest
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-xl tracking-tight mb-4">
                            Word Filler
                        </h1>
                        <p className="text-emerald-100/70 font-medium text-lg">空欄に入る英単語をタイピングして文を完成させよう</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category, i) => {
                            const questionCount = category.questions.length;
                            const isReady = questionCount >= 10;

                            return (
                                <button
                                    key={category.id}
                                    onClick={() => isReady && setSelectedCategoryId(category.id)}
                                    className={cn("group relative block overflow-hidden rounded-3xl bg-slate-800/40 border border-slate-700/50 p-6 text-left transition-all hover:-translate-y-1 hover:bg-slate-800/80",
                                        !isReady && "opacity-60 saturate-50 cursor-not-allowed hover:-translate-y-0"
                                    )}
                                >
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="text-sm font-bold text-emerald-500">CATEGORY {i + 1}</div>
                                            {!isReady && (
                                                <div className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full font-bold">
                                                    作成中
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-black text-white mb-2">{category.title}</h3>
                                        <p className="text-slate-400 text-xs mb-4 font-medium line-clamp-2">{category.description}</p>

                                        <div className="mt-auto flex justify-between items-end">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-bold text-slate-500 bg-slate-800/50 px-2 py-1 rounded inline-block w-max">
                                                    問題数: {questionCount} 問
                                                </span>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                                                <ArrowRight size={16} />
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

    if (selectedCategoryId && !isPlaying && !isGameOver) {
        const category = FILL_IN_CATEGORIES.find(c => c.id === selectedCategoryId);
        const totalSubStages = category ? Math.ceil(category.questions.length / QUESTIONS_PER_STAGE) : 0;

        return (
            <main className="flex-1 flex flex-col items-center justify-center bg-slate-900 font-sans min-h-screen text-slate-50 relative overflow-hidden p-6 py-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-700/20 via-slate-900 to-slate-950"></div>

                <div className="absolute top-6 left-6 z-20">
                    <button
                        onClick={() => setSelectedCategoryId(null)}
                        className="w-12 h-12 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-full flex items-center justify-center transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                </div>

                <div className="relative z-10 w-full max-w-4xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-emerald-900/40 border border-emerald-500/30 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest text-emerald-200 backdrop-blur-md mb-4">
                            <Keyboard size={16} className="text-emerald-400" />
                            {category?.title}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-xl tracking-tight mb-4">
                            ステージ選択
                        </h1>
                        <p className="text-emerald-100/70 font-medium text-lg">10問ごとに区切られたタイピングステージに挑戦しよう</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: totalSubStages }).map((_, i) => {
                            const startNum = i * QUESTIONS_PER_STAGE + 1;
                            const endNum = (i + 1) * QUESTIONS_PER_STAGE;
                            const completionKey = `${selectedCategoryId}_${i}`;
                            const perfectClears = stagePerfectClears[completionKey] || 0;
                            const highScore = stageHighScores[completionKey] || null;
                            const questionCountInChunk = category?.questions.slice(i * QUESTIONS_PER_STAGE, (i + 1) * QUESTIONS_PER_STAGE).length || 0;
                            const isAvailable = questionCountInChunk > 0;

                            return (
                                <button
                                    key={i}
                                    onClick={() => isAvailable && startStage(selectedCategoryId, i)}
                                    className={cn("group relative block overflow-hidden rounded-3xl bg-slate-800/40 border border-slate-700/50 p-6 text-left transition-all hover:-translate-y-1 hover:bg-slate-800/80",
                                        !isAvailable && "opacity-50 saturate-0 cursor-not-allowed hover:-translate-y-0"
                                    )}
                                >
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="text-sm font-bold text-emerald-500">STAGE {i + 1}</div>
                                        </div>
                                        <h3 className="text-2xl font-black text-white mb-4">No. {startNum} - {endNum}</h3>

                                        {isAvailable ? (
                                            <div className="bg-slate-950/40 rounded-xl p-3 border border-emerald-500/10 mb-6">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-1.5">
                                                        <Trophy size={12} className={highScore !== null ? "text-amber-400" : "text-slate-600"} />
                                                        <span className="text-xs font-bold text-slate-300">
                                                            {highScore !== null ? highScore : '-'}
                                                        </span>
                                                    </div>
                                                    <div className="text-[10px] font-black text-amber-400 uppercase tracking-tighter">Score</div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5">
                                                        <Zap size={12} className={perfectClears > 0 ? "text-emerald-400" : "text-slate-600"} />
                                                        <span className="text-xs font-bold text-slate-300">
                                                            {perfectClears} <span className="text-[10px] text-slate-500">Perfect</span>
                                                        </span>
                                                    </div>
                                                    <div className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter">Hits</div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="mb-6 flex">
                                                <span className="text-xs font-bold text-slate-500 bg-slate-900/50 px-2 py-1 rounded">問題未作成</span>
                                            </div>
                                        )}

                                        <div className="mt-auto flex justify-between items-end">
                                            <div>
                                                {isAvailable && questionCountInChunk < QUESTIONS_PER_STAGE && (
                                                    <span className="text-[10px] font-black text-emerald-500/60 uppercase tracking-widest bg-emerald-500/5 px-2 py-1 rounded border border-emerald-500/10">{questionCountInChunk} Questions</span>
                                                )}
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all transform group-hover:rotate-12 group-hover:scale-110 shadow-lg group-hover:shadow-emerald-500/40">
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
                        onRetry={wrongAnswers.length > 0 ? startWrongAnswersMode : () => startStage(selectedCategoryId!, selectedSubStageIndex!)}
                        onBack={() => { setIsGameOver(false); setIsPlaying(false); }}
                        wrongAnswersCount={wrongAnswers.length}
                        levelName={`Word Filler - ${FILL_IN_CATEGORIES.find(c => c.id === selectedCategoryId)?.title}`}
                    />
                ) : (
                    <div className="relative z-10 bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 p-8 md:p-12 rounded-[3rem] text-center max-w-2xl w-full shadow-2xl mt-12 mb-12">
                        <div className="w-12 h-12 border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
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
                onClose={() => { setIsGameOver(false); setIsPlaying(false); }}
            />

            <div className="relative z-10 w-full max-w-4xl px-4 md:px-6 flex flex-col items-center pb-24 mt-20 md:mt-16">
                {/* Japanese translation question */}
                <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-slate-100 w-full mb-8 md:mb-12 text-center relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md shadow-emerald-500/30">
                        Fill the Blank
                    </div>
                    <h2 className="text-xl md:text-3xl font-bold text-slate-700 leading-relaxed mt-1">
                        {question?.translation}
                    </h2>
                </div>

                {/* Answer Area (Typing Inputs) */}
                <div className="w-full mb-8 flex flex-col items-center justify-center p-5 md:p-10 bg-white rounded-[2rem] shadow-sm border border-slate-100 relative">
                    <p className="mb-5 text-[11px] md:text-xs font-black uppercase tracking-widest text-emerald-500">
                        空欄を入力して Enter またはチェック
                    </p>
                    {renderSentence()}
                </div>

                {/* Footer Controls */}
                <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200/60 p-4 md:p-6 flex justify-between items-center z-[60] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] pb-safe-offset-2">
                    <div className="max-w-4xl mx-auto w-full flex justify-between items-center gap-3">
                        <button
                            onClick={resetGameState}
                            disabled={showResult}
                            className="flex items-center justify-center gap-2 px-4 py-3 md:px-6 rounded-xl text-slate-500 font-bold hover:bg-slate-100 transition-colors disabled:opacity-50 text-sm md:text-base whitespace-nowrap"
                        >
                            <RefreshCcw size={18} />
                            <span className="hidden xs:inline">やり直す</span>
                        </button>

                        {!showResult ? (
                            <button
                                onClick={handleCheck}
                                className="flex-1 md:flex-none px-6 md:px-16 py-3.5 md:py-4 rounded-[1rem] md:rounded-[1.25rem] font-black text-sm md:text-lg transition-all flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-500/20 active:scale-95"
                            >
                                チェック！
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className={cn(
                                    "flex-1 md:flex-none px-6 md:px-16 py-3.5 md:py-4 rounded-[1rem] md:rounded-[1.25rem] font-black text-sm md:text-lg shadow-xl transition-transform active:scale-95 flex items-center justify-center gap-2",
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
