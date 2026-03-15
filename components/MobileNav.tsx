'use client';

import {
    LayoutDashboard,
    Calendar,
    BookOpen,
    User,
    Swords
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
    { icon: Swords, label: 'トレ', href: '/training' },
    { icon: BookOpen, label: 'カルテ', href: '/karte' },
    { icon: User, label: 'プロフ', href: '/profile' },
];

export default function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200 z-50 pb-safe">
            <div className="flex justify-around items-center h-16 px-2">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex flex-col items-center justify-center flex-1 py-1 relative"
                        >
                            <div className={cn(
                                "flex flex-col items-center transition-all duration-300",
                                isActive ? "text-indigo-600 scale-110" : "text-slate-400"
                            )}>
                                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="text-[10px] font-black mt-1 uppercase tracking-tighter">{item.label}</span>
                            </div>
                            {isActive && (
                                <motion.div
                                    layoutId="mobile-nav-indicator"
                                    className="absolute -top-1 w-12 h-1 bg-indigo-600 rounded-full"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
