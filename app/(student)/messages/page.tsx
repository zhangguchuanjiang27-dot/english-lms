'use client';

import { MessageSquare, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function StudentMessagesPage() {
    return (
        <main className="flex-1 flex items-center justify-center p-6 bg-slate-50/50 min-h-screen">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Visual Element */}
                <div className="relative">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-32 h-32 bg-white rounded-[2.5rem] shadow-xl shadow-indigo-100 flex items-center justify-center mx-auto relative z-10 border border-slate-50"
                    >
                        <MessageSquare size={48} className="text-indigo-600 stroke-[1.5]" />
                    </motion.div>
                    
                    {/* Decorative Elements */}
                    <motion.div 
                        animate={{ 
                            rotate: 360,
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-100/40 rounded-full blur-3xl -z-10"
                    />
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-indigo-600">
                        <Clock size={18} className="animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-[0.3em]">Under Development</span>
                    </div>
                    
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">
                        Coming Soon!
                    </h1>
                    
                    <p className="text-slate-500 font-bold leading-relaxed">
                        メッセージ機能は現在準備中です。<br />
                        講師と直接やり取りできる新機能のリリースまで、<br />
                        もうしばらくお待ちください。
                    </p>
                </div>

                {/* Action */}
                <div className="pt-6">
                    <Link 
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl font-black text-sm hover:border-indigo-600 hover:text-indigo-600 hover:shadow-lg hover:shadow-indigo-50 transition-all group"
                    >
                        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                        ダッシュボードに戻る
                    </Link>
                </div>
            </div>
        </main>
    );
}
