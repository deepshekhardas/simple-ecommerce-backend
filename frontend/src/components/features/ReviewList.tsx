'use client';

import { useEffect, useState, useCallback } from 'react';
import { Star } from 'lucide-react';
import api from '@/lib/api';
import dayjs from 'dayjs';

interface Review {
    _id: string;
    rating: number;
    comment: string;
    user: {
        _id: string;
        name: string;
    };
    createdAt: string;
}

interface ReviewListProps {
    productId: string;
    refreshTrigger: number;
}

export default function ReviewList({ productId, refreshTrigger }: ReviewListProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = useCallback(async () => {
        try {
            const res = await api.get(`/products/${productId}/reviews`);
            setReviews(res.data.data.reviews);
        } catch (error) {
            console.error('Failed to fetch reviews', error);
        } finally {
            setLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews, refreshTrigger]);

    if (loading) return <div className="text-gray-500">Loading reviews...</div>;

    if (reviews.length === 0) {
        return <div className="text-gray-500 italic">No reviews yet. Be the first to review!</div>;
    }

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <div key={review._id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                                {review.user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <span className="font-bold text-gray-900 dark:text-white">{review.user?.name || 'Anonymous'}</span>
                        </div>
                        <span className="text-sm text-gray-500">{dayjs(review.createdAt).format('MMM D, YYYY')}</span>
                    </div>
                    <div className="flex items-center mb-2 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                </div>
            ))}
        </div>
    );
}
