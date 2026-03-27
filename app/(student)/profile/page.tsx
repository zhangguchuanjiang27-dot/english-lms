'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getStudentProfile, updateStudentProfile } from '@/lib/actions/student';
import { Student } from '@/lib/data-store';
import { User, Mail, Phone, Target, FileText, School, Lock, Pencil, Eye, EyeOff, Camera } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function StudentProfilePage() {
    const [student, setStudent] = useState<Student | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<Student>>({});
    const [showPassword, setShowPassword] = useState(false);

    const compressImage = (file: File, maxWidth: number, maxHeight: number): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);
                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
                    resolve(compressedBase64);
                };
                img.onerror = (err) => reject(err);
            };
            reader.onerror = (err) => reject(err);
        });
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'cover') => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                // Resize based on type. Avatar can be smaller.
                const maxWidth = type === 'avatar' ? 400 : 1200;
                const maxHeight = type === 'avatar' ? 400 : 800;
                
                const base64String = await compressImage(file, maxWidth, maxHeight);
                
                if (type === 'avatar') {
                    setFormData(prev => ({ ...prev, avatarUrl: base64String }));
                } else {
                    setFormData(prev => ({ ...prev, coverUrl: base64String }));
                }
            } catch (error) {
                console.error('Failed to process image:', error);
                alert('画像の処理に失敗しました。別の画像をお試しください。');
            }
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            window.location.href = '/login';
            return;
        }

        getStudentProfile(userId).then(data => {
            if (data) {
                setStudent(data as unknown as Student);
                setFormData(data as unknown as Student);
            }
        });
    }, []);

    if (!student) return null;

    const handleSave = async () => {
        if (student) {
            const result = await updateStudentProfile(student.id, formData);
            if (result.success) {
                setStudent(result.student as unknown as Student);
                setIsEditing(false);
                alert('プロフィールを更新しました。');
            } else {
                alert(result.error || '更新に失敗しました。');
            }
        }
    };

    return (
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-50/50">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
                    
                    {/* Left Column: Identity Card */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden relative group">
                            {/* Cover Image */}
                            <div className="h-32 w-full relative overflow-hidden group/cover">
                                <img 
                                    src={formData.coverUrl || student.coverUrl || "/profile_cover.png"} 
                                    alt="Cover" 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-indigo-900/10 blur-[2px]" />
                                
                                {isEditing && (
                                    <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 transition-opacity cursor-pointer">
                                        <Camera className="text-white drop-shadow-md mb-1" size={32} />
                                        <span className="text-white font-bold text-sm drop-shadow-md">背景を変更</span>
                                        <input 
                                            type="file" 
                                            className="hidden" 
                                            accept="image/*" 
                                            onChange={(e) => handleImageChange(e, 'cover')} 
                                        />
                                    </label>
                                )}
                            </div>

                            {/* Profile Info Section */}
                            <div className="px-8 pb-8 pt-0 relative flex flex-col items-center">
                                {/* Overlapping Avatar */}
                                <div className="relative -mt-12 mb-4 group/avatar">
                                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                                        <img 
                                            src={formData.avatarUrl || student.avatarUrl || "/student_avatar.png"} 
                                            alt="Avatar" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    
                                    {isEditing && (
                                        <label className="absolute inset-0 rounded-full flex flex-col items-center justify-center bg-black/50 transition-opacity cursor-pointer border-4 border-white">
                                            <Camera className="text-white drop-shadow-md" size={24} />
                                            <span className="text-white font-bold text-[10px] drop-shadow-md mt-0.5">変更</span>
                                            <input 
                                                type="file" 
                                                className="hidden" 
                                                accept="image/*" 
                                                onChange={(e) => handleImageChange(e, 'avatar')} 
                                            />
                                        </label>
                                    )}

                                    {/* Removed online status indicator */}
                                </div>

                                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{student.name}</h2>
                                <p className="text-slate-400 text-xs font-bold mt-1 flex items-center gap-1">
                                    <Lock size={12} className="opacity-50" />
                                    ログインID: {student.loginId}
                                </p>

                                <div className="w-full mt-8">
                                    <button
                                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                        className={cn(
                                            "w-full py-4 rounded-2xl font-black text-sm transition-all duration-300 flex items-center justify-center gap-2 border-2",
                                            isEditing
                                                ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700"
                                                : "bg-white border-slate-100 text-slate-600 hover:border-indigo-600 hover:text-indigo-600 shadow-sm"
                                        )}
                                    >
                                        {isEditing ? (
                                            <>保存する</>
                                        ) : (
                                            <>プロフィールを編集</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Detailed Cards */}
                    <div className="space-y-8">
                        {/* Card 1: Basic Information */}
                        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm space-y-10">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                                    <User size={20} className="stroke-[2.5]" />
                                </div>
                                <h3 className="text-xl font-black text-slate-800 tracking-tight">基本情報</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                <ProfileField
                                    icon={School} label="学年 / 学校名" value={formData.occupation}
                                    isEditing={isEditing}
                                    onChange={(v: string) => setFormData({ ...formData, occupation: v })}
                                    placeholder="例：高校2年生"
                                />
                                <ProfileField
                                    icon={Mail} label="メールアドレス" value={formData.email}
                                    isEditing={isEditing}
                                    onChange={(v: string) => setFormData({ ...formData, email: v })}
                                    placeholder="example@mail.com"
                                />
                                <ProfileField
                                    icon={Phone} label="電話番号" value={formData.phone}
                                    isEditing={isEditing}
                                    onChange={(v: string) => setFormData({ ...formData, phone: v })}
                                    placeholder="090-0000-0000"
                                />
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                                        <Target size={12} className="stroke-[3]" />
                                        大きな目標
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold"
                                            value={formData.target || ''}
                                            onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                                            placeholder="例：英検準2級合格！ TOEIC 600点を目指す"
                                        />
                                    ) : (
                                        <div className="flex flex-wrap gap-2 pt-1 font-bold text-slate-700">
                                            {formData.target || (
                                                <p className="text-sm font-bold text-slate-300">目標が設定されていません</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Security Section (Bottom of Card 1) */}
                            <div className="pt-8 mt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
                                    <button 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="flex items-center justify-center sm:justify-start gap-3 text-slate-500 hover:text-indigo-600 transition-colors text-sm sm:text-xs font-bold group bg-slate-50 hover:bg-slate-100 sm:hover:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-white sm:bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors shadow-sm sm:shadow-none">
                                            {showPassword ? <EyeOff size={16} className="stroke-[2.5]" /> : <Eye size={16} className="stroke-[2.5]" />}
                                        </div>
                                        パスワードを確認する
                                    </button>
                                    {showPassword && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-base sm:text-sm font-black text-indigo-700 tracking-widest bg-indigo-50 border border-indigo-100 px-4 py-3 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-lg text-center shadow-inner break-all"
                                        >
                                            {student.password}
                                        </motion.div>
                                    )}
                                </div>
                                <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest text-center sm:text-right w-full sm:w-auto mt-2 sm:mt-0">Privacy Protected</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}

function ProfileField(
    { icon: Icon, label, value, isEditing, onChange, isReadonly = false, placeholder }: 
    { icon: any, label: string, value: string | undefined | null, isEditing: boolean, onChange?: (v: string) => void, isReadonly?: boolean, placeholder?: string }
) {
    return (
        <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 leading-none">
                <Icon size={12} className="stroke-[3]" />
                {label}
                {isReadonly && <Lock size={10} className="text-slate-300 ml-1" />}
            </label>
            {isEditing && !isReadonly ? (
                <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold placeholder:text-slate-300"
                    value={value || ''}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    placeholder={placeholder}
                />
            ) : (
                <div className="flex items-center gap-3 py-1 group/field">
                    <p className={cn(
                        "font-black text-slate-700 tracking-tight",
                        !value && "text-slate-300 font-bold"
                    )}>
                        {value || '未設定'}
                    </p>
                </div>
            )}
        </div>
    )
}


