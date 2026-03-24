import { X, Trophy, Flame } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface TrainingHUDProps {
    onClose: () => void;
    combo: number;
    score: number;
    currentStep: number;
    totalSteps: number;
    theme?: 'light' | 'dark';
}

export default function TrainingHUD({
    onClose,
    combo,
    score,
    currentStep,
    totalSteps,
    theme = 'dark'
}: TrainingHUDProps) {
    const isDark = theme === 'dark';

    return (
        <header className="absolute top-4 left-4 right-4 flex justify-between items-center z-[60] max-w-5xl mx-auto w-[calc(100%-2rem)]">
            <button
                onClick={onClose}
                className={cn(
                    "w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 shrink-0",
                    isDark
                        ? "bg-indigo-900/50 hover:bg-indigo-800 text-indigo-100 border border-indigo-700/50 backdrop-blur-md"
                        : "bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-600 border border-slate-100"
                )}
            >
                <X size={18} />
            </button>

            <div className={cn(
                "px-3 py-2 md:px-5 md:py-3 rounded-full flex items-center gap-3 md:gap-5 backdrop-blur-md transition-all",
                isDark
                    ? "bg-indigo-900/50 border border-indigo-500/30 text-indigo-100 shadow-[0_0_20px_rgba(79,70,229,0.2)]"
                    : "bg-white border-2 border-amber-100 text-slate-700 shadow-sm"
            )}>
                {/* Score */}
                <div className="flex items-center gap-1.5 md:gap-2 pr-2 md:pr-4 relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-[1px] md:after:w-[2px] after:h-5 after:bg-slate-300 dark:after:bg-indigo-500/30">
                    <Trophy size={16} className={cn("shrink-0", isDark ? "text-amber-400" : "text-emerald-500")} />
                    <span className={cn("font-black text-xs md:text-base leading-none", isDark ? "text-white" : "text-emerald-600")}>
                        {score} <span className={cn("hidden md:inline text-[10px] md:text-xs", isDark ? "text-indigo-300" : "text-emerald-500")}>EXP</span>
                    </span>
                </div>

                {/* Combo */}
                <div className="flex items-center gap-1.5 md:gap-2 pr-2 md:pr-4 relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-[1px] md:after:w-[2px] after:h-5 after:bg-slate-300 dark:after:bg-indigo-500/30">
                    <Flame
                        size={16}
                        className={cn(
                            "shrink-0 transition-colors",
                            combo > 2 ? (isDark ? "text-amber-500 animate-bounce" : "text-rose-500 animate-bounce") : (isDark ? "text-slate-400" : "text-amber-400")
                        )}
                    />
                    <span className={cn(
                        "font-black text-xs md:text-base leading-none",
                        combo > 2 ? (isDark ? "text-amber-400" : "text-rose-600") : (isDark ? "text-slate-300" : "text-slate-500")
                    )}>
                        x{combo}
                    </span>
                </div>

                {/* Progress */}
                <div className="text-[10px] md:text-sm font-bold flex items-center gap-1 shrink-0">
                    <span className={cn("hidden md:inline uppercase tracking-widest", isDark ? "text-indigo-400" : "text-slate-400")}>Step</span>
                    <span className={cn(isDark ? "text-indigo-100" : "text-slate-700")}>{currentStep}</span>
                    <span className={cn("mx-0.5", isDark ? "text-indigo-500" : "text-slate-300")}>/</span>
                    <span className={cn(isDark ? "text-indigo-300" : "text-slate-500")}>{totalSteps}</span>
                </div>
            </div>
        </header>
    );
}
