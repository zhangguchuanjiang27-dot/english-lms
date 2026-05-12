'use server';

import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function login(role: string, loginId: string, password?: string) {
    try {
        if (role === 'admin' || role === 'teacher') {
            const user = await prisma.teacher.findUnique({
                where: { loginId },
            });

            if (user && user.password === password) {
                // In a real app, generate a JWT or use NextAuth session
                // For now, we simulate success
                return { success: true, user: { id: user.id, name: user.name, role: user.role.toLowerCase() } };
            }
        } else {
            const user = await prisma.student.findUnique({
                where: { loginId },
            });

            if (user && user.password === password) {
                return { success: true, user: { id: user.id, name: user.name, role: 'student' } };
            }
        }

        return { success: false, error: 'IDまたはパスワードが正しくありません' };
    } catch (error) {
        console.error('Login error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        
        // Database connection fallback
        const isConnError = errorMessage.includes('Can\'t reach database server') || 
                            errorMessage.includes('PrismaClientInitializationError') ||
                            errorMessage.includes('database server is running');
        
        if (isConnError) {
            console.warn('Database offline, using Mock Auth Fallback.');
            const mockTeachers = [
                { id: 'admin', name: '管理者', role: 'admin', password: 'password123', loginId: 'admin' },
                { id: 'sarah', name: 'Sarah Wilson', role: 'teacher', password: 'password123', loginId: 'sarah' }
            ];
            const mockStudents = [
                { id: 'karat', name: 'Karat Student', role: 'student', password: 'password123', loginId: 'karat' },
                { id: 'yukukumo', name: '游雲 (yukukumo)', role: 'student', password: 'password123', loginId: 'yukukumo' }
            ];
            
            if (role === 'admin' || role === 'teacher') {
                const matched = mockTeachers.find(t => t.loginId === loginId && t.password === password);
                if (matched) {
                    return { success: true, user: { id: matched.id, name: matched.name, role: matched.role } };
                }
            } else {
                const matched = mockStudents.find(s => s.loginId === loginId && s.password === password);
                if (matched) {
                    return { success: true, user: { id: matched.id, name: matched.name, role: matched.role } };
                }
            }
            return { success: false, error: 'IDまたはパスワードが正しくありません(オフライン・モック)' };
        }
        
        return { success: false, error: `サーバーエラーが発生しました: ${errorMessage}` };
    }
}
