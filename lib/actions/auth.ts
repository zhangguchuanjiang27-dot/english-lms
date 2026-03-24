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
        return { success: false, error: `サーバーエラーが発生しました: ${errorMessage}` };
    }
}
