'use client';

import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { User, Mail, Phone, LogOut } from 'lucide-react';

export default function ProfilePage() {
    const { user, isAuthenticated, logout } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

            <div className="bg-white shadow rounded-xl overflow-hidden">
                <div className="p-8">
                    <div className="flex items-center justify-center mb-8">
                        <div className="bg-blue-100 p-4 rounded-full">
                            <User className="w-16 h-16 text-blue-600" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center border-b pb-4">
                            <User className="w-5 h-5 text-gray-400 mr-4" />
                            <div>
                                <p className="text-sm text-gray-500">Full Name</p>
                                <p className="font-medium text-gray-900">{user.name}</p>
                            </div>
                        </div>

                        <div className="flex items-center border-b pb-4">
                            <Mail className="w-5 h-5 text-gray-400 mr-4" />
                            <div>
                                <p className="text-sm text-gray-500">Email Address</p>
                                <p className="font-medium text-gray-900">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center border-b pb-4">
                            <Phone className="w-5 h-5 text-gray-400 mr-4" />
                            <div>
                                <p className="text-sm text-gray-500">Role</p>
                                <p className="font-medium text-gray-900 capitalize">{user.role}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            onClick={() => {
                                logout();
                                router.push('/login');
                            }}
                            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
