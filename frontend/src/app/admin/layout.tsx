'use client';

import { useAuthStore } from '@/lib/store';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    LogOut,
    Home,
    Loader2
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated, logout } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (hasMounted) {
            if (!isAuthenticated) {
                router.push('/login');
            } else if (user && user.role !== 'admin') {
                router.push('/');
            }
        }
    }, [isAuthenticated, user, router, hasMounted]);

    if (!hasMounted || !user || user.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    const navItems = [
        { href: '/admin/products', label: 'Products', icon: Package },
        { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex flex-col fixed inset-y-0 z-10">
                <div className="p-6 border-b">
                    <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <LayoutDashboard className="w-6 h-6 text-blue-600" />
                        Admin Panel
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                  ${isActive
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t space-y-2">
                    <Link
                        href="/"
                        className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Home className="w-5 h-5 mr-3 text-gray-400" />
                        Back to Site
                    </Link>
                    <button
                        onClick={() => {
                            logout();
                            router.push('/login');
                        }}
                        className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
