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
        <nav className="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="font-serif text-3xl font-bold text-yellow-400 tracking-tight hover:text-yellow-300 transition-colors duration-300">
                        ShopHub
                    </Link>

                    <div className="flex items-center gap-8">
                        <Link href="/products" className="text-sm font-medium text-white hover:text-yellow-400 transition-colors uppercase tracking-wider">
                            Products
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link href="/cart" className="relative group text-white hover:text-yellow-400 transition-colors">
                                    <ShoppingCart className="w-6 h-6" />
                                    {items.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-gray-900">
                                            {items.length}
                                        </span>
                                    )}
                                </Link>

                                <Link href="/orders" className="text-white hover:text-yellow-400 transition-colors">
                                    <Package className="w-6 h-6" />
                                </Link>

                                <div className="flex items-center gap-4 border-l pl-6 border-gray-600">
                                    <div className="flex flex-col items-end hidden md:flex">
                                        <span className="text-sm font-semibold text-white">{user?.name}</span>
                                        <Link href="/profile" className="text-xs text-yellow-400 hover:underline">View Profile</Link>
                                    </div>
                                    <Link href="/profile" className="p-2 rounded-full bg-gray-700 text-white hover:bg-yellow-400 hover:text-gray-900 transition-all">
                                        <UserIcon className="w-5 h-5" />
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-400 hover:text-red-400 transition"
                                        title="Logout"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/login" className="text-sm font-medium text-white hover:text-yellow-400 transition-colors uppercase tracking-wider">
                                    Login
                                </Link>
                                <Link href="/register" className="bg-yellow-400 text-gray-900 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
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
