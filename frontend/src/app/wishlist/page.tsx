'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import api from '@/lib/api';
import ProductCard from '@/components/features/ProductCard';
import { Product } from '@/types';

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const res = await api.get('/wishlist');
                setWishlist(res.data.data.wishlist);
            } catch (error) {
                console.error('Failed to fetch wishlist', error);
            } finally {
                setLoading(false);
            }
        };
        fetchWishlist();
    }, []);

    const removeFromWishlist = (productId: string) => {
        setWishlist((prev) => prev.filter((p) => p._id !== productId));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

    if (wishlist.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Wishlist is Empty</h2>
                <p className="text-gray-500">Start exploring products and save your favorites!</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Wishlist</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlist.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
}
