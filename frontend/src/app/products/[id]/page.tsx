'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/api';
import { useCartStore } from '@/lib/store';
import { Loader2, Star, Minus, Plus, ShoppingCart } from 'lucide-react';

export default function ProductDetailsPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCartStore();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data.data.product);
            } catch (error) {
                console.error('Failed to fetch product', error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        addItem({
            product,
            quantity,
            price: product.price,
            variant: product.variants?.[0]
        });
        alert('Added to cart!');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
                    <Image
                        src={product.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <div className="mb-2">
                        <span className="text-blue-600 font-medium">{product.category}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                    <div className="flex items-center mb-4">
                        <div className="flex items-center text-yellow-400 mr-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < Math.floor(product.ratingsAverage || 0) ? 'fill-current' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                        <span className="text-gray-500 text-sm">({product.ratingsQuantity || 0} reviews)</span>
                    </div>

                    <div className="text-3xl font-bold text-gray-900 mb-6">${product.price}</div>

                    <div className="prose prose-sm text-gray-500 mb-8">
                        <p>{product.description}</p>
                    </div>

                    <div className="border-t border-b border-gray-200 py-6 mb-8">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">Quantity</span>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-2 hover:bg-gray-100 transition"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    className="p-2 hover:bg-gray-100 transition"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
