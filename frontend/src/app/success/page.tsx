'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
            <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
                Thank you for your purchase. We have received your order and are processing it.
            </p>
            <div className="flex gap-4">
                <Link
                    href="/products"
                    className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition"
                >
                    Continue Shopping
                </Link>
                <Link
                    href="/orders"
                    className="bg-gray-100 text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition"
                >
                    View Orders
                </Link>
            </div>
        </div>
    );
}
