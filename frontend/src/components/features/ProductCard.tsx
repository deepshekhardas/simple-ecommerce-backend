'use client';

import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { motion } from 'framer-motion';

export default function ProductCard({ product }: { product: any }) {
    const { addItem } = useCartStore();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem({
            product,
            quantity: 1,
            price: product.price,
            variant: product.variants?.[0]
        });
    };

    return (
        <Link href={`/products/${product._id}`}>
            <motion.div
                className="group relative bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500"
                whileHover={{ y: -8 }}
            >
                <div className="relative aspect-[4/5] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <Image
                        src={product.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                    <button
                        onClick={handleAddToCart}
                        className="absolute bottom-4 right-4 p-3 bg-white text-midnight rounded-full shadow-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gold hover:text-white z-10"
                        title="Add to Cart"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>

                    {product.category && (
                        <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold tracking-wider uppercase text-midnight rounded-sm">
                            {product.category}
                        </span>
                    )}
                </div>

                <div className="p-5">
                    <h3 className="font-serif text-lg font-bold text-midnight dark:text-white truncate mb-1" title={product.name}>{product.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 font-light" title={product.description}>{product.description}</p>

                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/10 pt-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 uppercase tracking-wider">Price</span>
                            <span className="font-serif text-xl font-bold text-midnight dark:text-gold">${product.price}</span>
                        </div>
                        <span className="text-xs font-medium text-gold hover:underline">View Details</span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
