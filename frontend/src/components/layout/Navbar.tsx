'use client';

import Link from 'next/link';
import { useAuthStore, useCartStore } from '@/lib/store';
import { ShoppingCart, LogOut, Package, User as UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuthStore();
    const { items } = useCartStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <nav className="fixed top-0 w-full z-50 glass transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="font-serif text-3xl font-bold text-midnight dark:text-white tracking-tight hover:text-gold transition-colors duration-300">
                        ShopHub
                    </Link>

                    <div className="flex items-center gap-8">
                        <Link href="/products" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors uppercase tracking-wider">
                            Products
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link href="/cart" className="relative group text-gray-700 dark:text-gray-300 hover:text-gold transition-colors">
                                    <ShoppingCart className="w-6 h-6" />
                                    {items.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-gold text-midnight text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white dark:border-gray-900">
                                            {items.length}
                                        </span>
                                    )}
                                </Link>

                                <Link href="/orders" className="text-gray-700 dark:text-gray-300 hover:text-gold transition-colors">
                                    <Package className="w-6 h-6" />
                                </Link>

                                <div className="flex items-center gap-4 border-l pl-6 border-gray-200 dark:border-gray-700">
                                    <div className="flex flex-col items-end hidden md:flex">
                                        <span className="text-sm font-semibold text-midnight dark:text-white">{user?.name}</span>
                                        <Link href="/profile" className="text-xs text-gold hover:underline">View Profile</Link>
                                    </div>
                                    <Link href="/profile" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-midnight dark:text-white hover:bg-gold hover:text-white transition-all">
                                        <UserIcon className="w-5 h-5" />
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-400 hover:text-red-600 transition"
                                        title="Logout"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gold transition-colors uppercase tracking-wider">
                                    Login
                                </Link>
                                <Link href="/register" className="bg-midnight dark:bg-white text-white dark:text-midnight px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gold hover:text-midnight dark:hover:bg-gold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
