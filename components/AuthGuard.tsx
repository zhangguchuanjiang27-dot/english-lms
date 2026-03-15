'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthGuardProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const userId = localStorage.getItem('user_id');
            const userRole = localStorage.getItem('user_role');

            if (!userId) {
                // Not logged in
                window.location.href = '/login';
                return;
            }

            if (allowedRoles && userRole && !allowedRoles.includes(userRole.toLowerCase())) {
                // Role not allowed
                window.location.href = '/login';
                return;
            }

            setIsAuthorized(true);
        };

        checkAuth();

        // Optional: Listen for storage changes (e.g. logout in another tab)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'user_id' && !e.newValue) {
                window.location.href = '/login';
            }
        };

        // Optional: Periodic check or visibility change check
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                const userId = localStorage.getItem('user_id');
                if (!userId) {
                    window.location.href = '/login';
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [allowedRoles, router, pathname]);

    if (!isAuthorized) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl"></div>
                    <p className="text-slate-400 font-medium animate-bounce text-sm">セッションを確認中...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
