'use client';

import {
    LayoutDashboard,
    Calendar,
    BookOpen,
    User,
    Swords,
    MessageCircle,
    Award,
    Library
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
    { icon: LayoutDashboard, label: 'ホーム', href: '/dashboard' },
    { icon: Calendar, label: '予約', href: '/schedule' },
    { icon: MessageCircle, label: '連絡', href: '/messages' },
    { icon: BookOpen, label: 'カルテ', href: '/karte' },
    { icon: Award, label: '成績', href: '/achievements' },
    { icon: Library, label: '教材', href: '/courses' },
    { icon: Swords, label: 'トレ', href: '/training' },
    { icon: User, label: 'プロフ', href: '/profile' },
];

export default function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="md:hidden fixed bottom-1 left-4 right-4 bg-white/90 backdrop-blur-xl border border-slate-200 z-50 rounded-3xl shadow-2xl shadow-indigo-200/50 pb-safe overflow-hidden">
            <div className="overflow-x-auto scrollbar-hide py-2 px-1">
                <div className="flex items-center min-w-max gap-1 px-2">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center justify-center px-4 py-2 relative min-w-[70px]"
                            >
                                <div className={cn(
                                    "flex flex-col items-center transition-all duration-300 relative z-10",
                                    isActive ? "text-indigo-600 scale-105" : "text-slate-400"
                                )}>
                                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="text-[10px] font-black mt-1 uppercase tracking-tighter">{item.label}</span>
                                </div>
                                {isActive && (
                                    <motion.div
                                        layoutId="mobile-nav-indicator"
                                        className="absolute inset-0 bg-indigo-50 rounded-2xl"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
            {/* Added a subtle gradient to indicate scrollability if needed */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/30 to-transparent pointer-events-none md:hidden"></div>
        </nav>
    );
}
