'use client';

import { ShoppingCart, Heart, Eye, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
    const { addItem } = useCartStore();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem({
            product,
            quantity: 1,
            price: product.price,
            variant: product.variants?.[0]
        });
    };

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <Link href={`/products/${product._id}`}>
            <motion.div
                onMouseMove={handleMouseMove}
                className="group relative bg-gray-900 rounded-3xl overflow-hidden border border-white/5 shadow-lg transition-all duration-300"
                whileHover={{ y: -10, scale: 1.02 }}
            >
                {/* Spotlight Effect */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                            650px circle at ${mouseX}px ${mouseY}px,
                            rgba(255,255,255,0.1),
                            transparent 80%
                            )
                        `,
                    }}
                />

                {/* Image Container */}
                <div className="relative aspect-[4/5] bg-gray-950 overflow-hidden rounded-t-3xl">
                    <Image
                        src={product.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-3 translate-x-12 group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)]">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full hover:bg-white hover:text-red-500 transition-colors shadow-lg"
                        >
                            <Heart className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full hover:bg-white hover:text-blue-500 transition-colors shadow-lg delay-75"
                        >
                            <Eye className="w-5 h-5" />
                        </motion.button>
                    </div>

                    {/* Add to Cart - Float Up */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform z-20">
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-4 bg-white text-gray-900 font-bold rounded-2xl shadow-xl hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                        >
                            <ShoppingCart className="w-5 h-5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                            Add to Cart
                        </button>
                    </div>

                    {/* Category Label */}
                    <div className="absolute top-4 left-4 z-10">
                        {product.category && (
                            <div className="px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg flex items-center gap-1.5">
                                <Sparkles className="w-3 h-3 text-yellow-400" />
                                <span className="text-xs font-bold tracking-wider uppercase text-white/90">
                                    {product.category}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 relative z-10">
                    <h3 className="text-lg font-bold text-white truncate mb-2 group-hover:text-blue-400 transition-colors" title={product.name}>
                        {product.name}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-4 font-light leading-relaxed" title={product.description}>
                        {product.description}
                    </p>

                    <div className="flex items-end justify-between border-t border-white/5 pt-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Price</span>
                            <span className="text-2xl font-bold text-white tracking-tight">${product.price}</span>
                        </div>
                        <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-colors">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 group-hover:bg-blue-400 transition-colors"></div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
