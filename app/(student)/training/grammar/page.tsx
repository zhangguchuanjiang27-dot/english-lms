'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    X,
    CheckCircle2,
    RefreshCcw,
    Trophy,
    Zap,
    ArrowRight,
    BrainCircuit,
    Flame,
    Lightbulb,
    ChevronLeft
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { GRAMMAR_CATEGORIES, GrammarCategory, GrammarQuestion } from '@/lib/data/grammar';
import TrainingHUD from '@/components/training/TrainingHUD';
import XPResultsView from '@/components/training/XPResultsView';
import { getLevelInfo } from '@/lib/quest-utils';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type Level = 'jhs1' | 'jhs2' | 'jhs3';

const LEVELS = [
    { id: 'jhs1', name: '中学1年生', sub: 'Level 1', color: 'from-blue-400 to-blue-600', shadow: 'shadow-blue-500/30' },
    { id: 'jhs2', name: '中学2年生', sub: 'Level 2', color: 'from-amber-400 to-amber-600', shadow: 'shadow-amber-500/30' },
    { id: 'jhs3', name: '中学3年生', sub: 'Level 3', color: 'from-rose-400 to-rose-600', shadow: 'shadow-rose-500/30' },
] as const;

const QUESTIONS_PER_STAGE = 10;

export default function SentenceBuilderPage() {
    const router = useRouter();
    const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [selectedSubStageIndex, setSelectedSubStageIndex] = useState<number | null>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [combo, setCombo] = useState(0);

    const [isGameOver, setIsGameOver] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRetryMode, setIsRetryMode] = useState(false);

    const [stageCompletions, setStageCompletions] = useState<Record<string, number>>({});
    const [stagePerfectClears, setStagePerfectClears] = useState<Record<string, number>>({});
    const [stageHighScores, setStageHighScores] = useState<Record<string, number>>({});
    const [preGameStats, setPreGameStats] = useState<any>(null);
    const [postGameStats, setPostGameStats] = useState<any>(null);

    const [gameQuestions, setGameQuestions] = useState<GrammarQuestion[]>([]);
    const [wrongAnswers, setWrongAnswers] = useState<GrammarQuestion[]>([]);

    // In-game state
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [availableWords, setAvailableWords] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [isOk, setIsOk] = useState(false);

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

                const res = await fetch(`/api/training/grammar?studentId=${userId}`);
                if (res.ok) {
                    const data = await res.json();
                    const completions: Record<string, number> = {};
                    const pClears: Record<string, number> = {};
                    const highScores: Record<string, number> = {};

                    data.forEach((item: any) => {
                        const key = `${item.level}_${item.stageIndex}`;
                        completions[key] = item.completions;
                        pClears[key] = item.perfectClears || 0;
                        highScores[key] = item.highestScore;
                    });

                    setStageCompletions(completions);
                    setStagePerfectClears(pClears);
                    setStageHighScores(highScores);
                }
            } catch (err) {
                console.error("Failed to fetch progress", err);
            }
        };

        fetchProgress();
    }, [isGameOver]);

    const startStage = (level: Level, categoryId: string, subStageIndex: number) => {
        const category = GRAMMAR_CATEGORIES[level]?.find(c => c.id === categoryId);
        const allQuestions = category?.questions || [];
        const stageQuestions = allQuestions.slice(subStageIndex * QUESTIONS_PER_STAGE, (subStageIndex + 1) * QUESTIONS_PER_STAGE);

        if (stageQuestions.length === 0) {
            alert('このステージの問題はまだ用意されていません！ AIで問題を生成して追加してね。');
            return;
        }

        // Ensure words are properly shuffled for the initial load AND shuffle the question order
        const selected = stageQuestions.map(q => ({
            ...q,
            words: [...q.words]
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
        }))
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

        setSelectedLevel(level);
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
        resetGameState(selected[0]);
        setPostGameStats(null); // Reset post stats for new game
    };

    const startWrongAnswersMode = () => {
        // Shuffle the wrong answers to retry (both the order of questions and words inside them)
        const shuffled = wrongAnswers.map(q => ({
            ...q,
            words: [...q.words]
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
        }))
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
        resetGameState(shuffled[0]);
        setPostGameStats(null); // Reset post stats for new game
    };

    const resetGameState = (q: GrammarQuestion) => {
        setSelectedWords([]);
        setAvailableWords(q?.words || []);
        setShowResult(false);
        setIsOk(false);
    };

    const handleSelect = (word: string, index: number) => {
        if (showResult) return;
        setSelectedWords([...selectedWords, word]);
        const newAvailable = [...availableWords];
        newAvailable.splice(index, 1);
        setAvailableWords(newAvailable);
    };

    const handleUndo = (word: string, index: number) => {
        if (showResult) return;
        const newSelected = [...selectedWords];
        newSelected.splice(index, 1);
        setSelectedWords(newSelected);
        setAvailableWords([...availableWords, word]);
    };

    const handleCheck = () => {
        if (availableWords.length > 0) return; // Must use all words

        const isCorrect = selectedWords.join(' ') === question.answer.join(' ');
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

    const handleNext = () => {
        if (currentIndex < gameQuestions.length - 1) {
            const nextIdx = currentIndex + 1;
            setCurrentIndex(nextIdx);
            resetGameState(gameQuestions[nextIdx]);
        } else {
            setIsGameOver(true);
            saveProgress();
        }
    };

    const handleReset = () => {
        resetGameState(question);
    };

    const saveProgress = () => {
        if (selectedSubStageIndex !== null && selectedCategoryId !== null && selectedLevel !== null) {
            const isFullClear = !isRetryMode;
            const isPerfectClear = !isRetryMode && wrongAnswers.length === 0;
            const userId = localStorage.getItem('user_id');

            if (userId) {
                fetch('/api/training/grammar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        studentId: userId,
                        level: `${selectedLevel}_${selectedCategoryId}`,
                        stageIndex: selectedSubStageIndex,
                        score: score,
                        completed: isFullClear,
                        isPerfectClear: isPerfectClear
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
    };

    if (!selectedLevel) {
        return (
            <main className="flex-1 flex flex-col items-center justify-center bg-slate-900 font-sans min-h-screen text-slate-50 relative overflow-hidden p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-700/20 via-slate-900 to-slate-950"></div>

                <div className="absolute top-6 left-6 z-20">
                    <button
                        onClick={() => router.push('/training')}
                        className="w-12 h-12 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-full flex items-center justify-center transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="relative z-10 w-full max-w-4xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-amber-900/40 border border-amber-500/30 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest text-amber-200 backdrop-blur-md mb-4">
                            <BrainCircuit size={16} className="text-amber-400" />
                            Grammar Quest
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-xl tracking-tight mb-4">Sentence Builder</h1>
                        <p className="text-amber-100/70 font-medium text-lg">挑戦するレベルを選択してください</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {LEVELS.map((level) => (
                            <button
                                key={level.id}
                                onClick={() => setSelectedLevel(level.id)}
                                className="group relative block overflow-hidden rounded-[2rem] bg-slate-800/40 border border-slate-700/50 p-8 text-left transition-all hover:-translate-y-2 hover:bg-slate-800/80"
                            >
                                <div className={cn("absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity", `bg-gradient-to-br ${level.color}`)}></div>

                                <div className="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
                                    <div>
                                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg", `bg-gradient-to-br ${level.color} ${level.shadow}`)}>
                                            <BrainCircuit size={24} className="text-white" />
                                        </div>
                                        <h3 className="text-3xl font-black text-white mb-2">{level.name}</h3>
                                        <p className="text-slate-400 font-bold">{level.sub}</p>
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-colors">
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

    if (selectedLevel && !selectedCategoryId) {
        const categories = GRAMMAR_CATEGORIES[selectedLevel] || [];

        return (
            <main className="flex-1 flex flex-col items-center justify-center bg-slate-900 font-sans min-h-screen text-slate-50 relative overflow-hidden p-6 py-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-700/20 via-slate-900 to-slate-950"></div>

                <div className="absolute top-6 left-6 z-20">
                    <button
                        onClick={() => setSelectedLevel(null)}
                        className="w-12 h-12 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-full flex items-center justify-center transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                </div>

                <div className="relative z-10 w-full max-w-5xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-amber-900/40 border border-amber-500/30 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest text-amber-200 backdrop-blur-md mb-4">
                            <BrainCircuit size={16} className="text-amber-400" />
                            {LEVELS.find(l => l.id === selectedLevel)?.name}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-xl tracking-tight mb-4">
                            カテゴリー選択
                        </h1>
                        <p className="text-amber-100/70 font-medium text-lg">学習したい文法の単元を選択しよう</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category, i) => {
                            const questionCount = category.questions.length;
                            const isReady = questionCount >= 10;

                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategoryId(category.id)}
                                    className={cn("group relative block overflow-hidden rounded-3xl bg-slate-800/40 border border-slate-700/50 p-6 text-left transition-all hover:-translate-y-1 hover:bg-slate-800/80",
                                        !isReady && "opacity-60 saturate-50"
                                    )}
                                >
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="text-sm font-bold text-amber-500">CATEGORY {i + 1}</div>
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
                                                    用意されている問題: {questionCount} 問
                                                </span>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors shrink-0">
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

    if (selectedLevel && selectedCategoryId && !isPlaying && !isGameOver) {
        const category = GRAMMAR_CATEGORIES[selectedLevel]?.find(c => c.id === selectedCategoryId);
        const totalSubStages = 5; // 50 questions total = 5 substages of 10 questions

        return (
            <main className="flex-1 flex flex-col items-center justify-center bg-slate-900 font-sans min-h-screen text-slate-50 relative overflow-hidden p-6 py-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-700/20 via-slate-900 to-slate-950"></div>

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
                        <div className="inline-flex items-center gap-2 bg-amber-900/40 border border-amber-500/30 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest text-amber-200 backdrop-blur-md mb-4">
                            <BrainCircuit size={16} className="text-amber-400" />
                            {category?.title}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-xl tracking-tight mb-4">
                            ステージ選択
                        </h1>
                        <p className="text-amber-100/70 font-medium text-lg">10問ごとに区切られたステージに挑戦しよう</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: totalSubStages }).map((_, i) => {
                            const startNum = i * QUESTIONS_PER_STAGE + 1;
                            const endNum = (i + 1) * QUESTIONS_PER_STAGE;
                            const completionKey = `${selectedLevel}_${selectedCategoryId}_${i}`;
                            const completions = stageCompletions[completionKey] || 0;
                            const perfectClears = stagePerfectClears[completionKey] || 0;
                            const highScore = stageHighScores[completionKey] || null;
                            const questionCountInChunk = category?.questions.slice(i * QUESTIONS_PER_STAGE, (i + 1) * QUESTIONS_PER_STAGE).length || 0;
                            const isAvailable = questionCountInChunk > 0;

                            return (
                                <button
                                    key={i}
                                    onClick={() => isAvailable && startStage(selectedLevel, selectedCategoryId, i)}
                                    className={cn("group relative block overflow-hidden rounded-3xl bg-slate-800/40 border border-slate-700/50 p-6 text-left transition-all hover:-translate-y-1 hover:bg-slate-800/80",
                                        !isAvailable && "opacity-50 saturate-0 cursor-not-allowed hover:-translate-y-0"
                                    )}
                                >
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="text-sm font-bold text-amber-500">STAGE {i + 1}</div>
                                        </div>
                                        <h3 className="text-2xl font-black text-white mb-4">No. {startNum} - {endNum}</h3>

                                        {isAvailable ? (
                                            <div className="grid grid-cols-2 gap-3 mb-6">
                                                {/* Score Stats */}
                                                <div className="bg-slate-900/40 rounded-xl p-2 border border-slate-500/10">
                                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Score</div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Trophy size={11} className={highScore !== null ? "text-amber-400" : "text-slate-600"} />
                                                        <span className="text-[11px] font-bold text-slate-300">
                                                            {highScore !== null ? highScore : '-'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Perfect Stats */}
                                                <div className="bg-slate-900/40 rounded-xl p-2 border border-slate-500/10">
                                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Perfect</div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Zap size={11} className={perfectClears > 0 ? "text-emerald-400" : "text-slate-600"} />
                                                        <span className="text-[11px] font-bold text-slate-300">
                                                            {perfectClears} <span className="text-[9px] text-slate-500">Hits</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="mb-6 flex">
                                                <span className="text-xs font-bold text-slate-500 bg-slate-900/50 px-2 py-1 rounded">問題が準備されていません</span>
                                            </div>
                                        )}

                                        <div className="mt-auto flex justify-between items-end">
                                            <div>
                                                {isAvailable && questionCountInChunk < QUESTIONS_PER_STAGE && (
                                                    <span className="text-xs font-bold text-amber-500/80 bg-slate-900/40 px-2 py-1 rounded">全 {questionCountInChunk} 問</span>
                                                )}
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
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
                        onRetry={wrongAnswers.length > 0 ? startWrongAnswersMode : () => startStage(selectedLevel!, selectedCategoryId!, selectedSubStageIndex!)}
                        onBack={() => { setIsGameOver(false); setIsPlaying(false); }}
                        wrongAnswersCount={wrongAnswers.length}
                        levelName={`Sentence Builder - ${GRAMMAR_CATEGORIES[selectedLevel!]?.find(c => c.id === selectedCategoryId)?.title}`}
                    />
                ) : (
                    <div className="relative z-10 bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 p-8 md:p-12 rounded-[3rem] text-center max-w-2xl w-full shadow-2xl mt-12 mb-12">
                        <div className="w-12 h-12 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin mx-auto"></div>
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

            <div className="relative z-10 w-full max-w-3xl px-4 md:px-6 flex flex-col items-center pb-24 mt-20 md:mt-16">
                {/* Japanese translation question */}
                <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-slate-100 w-full mb-6 md:mb-10 text-center relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md shadow-amber-500/30">
                        Translate
                    </div>
                    <h2 className="text-xl md:text-3xl font-bold text-slate-700 leading-relaxed mt-1">
                        {question?.translation}
                    </h2>
                </div>

                {/* Answer Area (Selected Words) */}
                <div className={cn("w-full min-h-[100px] md:min-h-[120px] mb-6 md:mb-8 p-3 md:p-4 rounded-2xl md:rounded-3xl border-2 flex flex-wrap gap-2 md:gap-3 items-center justify-center transition-all",
                    showResult && isOk ? "bg-emerald-50 border-emerald-200" :
                        showResult && !isOk ? "bg-rose-50 border-rose-200" :
                            "bg-slate-100 border-dashed border-slate-300"
                )}>
                    {selectedWords.length === 0 && <span className="text-slate-400 font-bold opacity-50 text-xs md:text-base text-center">下のブロックをタップして並べよう！</span>}
                    {selectedWords.map((word, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleUndo(word, idx)}
                            className={cn(
                                "px-4 py-3 md:px-6 md:py-4 text-base md:text-xl font-bold rounded-xl md:rounded-2xl shadow-sm transition-transform active:scale-95",
                                showResult && isOk ? "bg-white text-emerald-600 border border-emerald-200" :
                                    showResult && !isOk ? "bg-white text-rose-500 border border-rose-200" : "bg-white text-slate-800 border-b-4 border-slate-200 hover:-translate-y-1"
                            )}
                            disabled={showResult}
                        >
                            {word}
                        </button>
                    ))}
                </div>

                {/* Show correct answer if wrong */}
                {showResult && !isOk && (
                    <div className="w-full bg-rose-50 text-rose-600 rounded-2xl p-4 font-bold text-center mb-6 animate-pulse">
                        正解: {question?.answer.join(' ')}
                    </div>
                )}

                {/* Word Pool (Available Words) */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 w-full min-h-[80px] md:min-h-[100px]">
                    {availableWords.map((word, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleSelect(word, idx)}
                            disabled={showResult}
                            className={cn(
                                "px-4 py-3 md:px-6 md:py-4 bg-white text-amber-900 border-2 border-amber-200 border-b-4 rounded-xl md:rounded-2xl text-base md:text-xl font-black shadow-sm transition-all hover:bg-amber-50 active:translate-y-0 active:border-b-2 hover:shadow-md",
                                showResult && "opacity-50 cursor-not-allowed transform-none shadow-none"
                            )}
                        >
                            {word}
                        </button>
                    ))}
                </div>

                {/* Footer Controls */}
                <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200/60 p-4 md:p-6 flex justify-between items-center z-[60] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] pb-safe-offset-2">
                    <div className="max-w-3xl mx-auto w-full flex justify-between items-center gap-3">
                        <button
                            onClick={handleReset}
                            disabled={showResult}
                            className="flex items-center justify-center gap-2 px-4 py-3 md:px-6 rounded-xl text-slate-500 font-bold hover:bg-slate-100 transition-colors disabled:opacity-50 text-sm md:text-base whitespace-nowrap"
                        >
                            <RefreshCcw size={18} />
                            <span className="hidden xs:inline">やり直す</span>
                        </button>

                        {!showResult ? (
                            <button
                                onClick={handleCheck}
                                disabled={availableWords.length > 0}
                                className={cn(
                                    "flex-1 md:flex-none px-6 md:px-12 py-3.5 md:py-4 rounded-[1rem] md:rounded-[1.25rem] font-black text-sm md:text-lg transition-all flex items-center justify-center gap-2",
                                    availableWords.length === 0
                                        ? "bg-amber-500 hover:bg-amber-400 text-white shadow-xl shadow-amber-500/20 active:scale-95"
                                        : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                                )}
                            >
                                チェック！
                            </button>
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
