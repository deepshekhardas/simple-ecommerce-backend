'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import ProductCard from '@/components/features/ProductCard';
import { Loader2, Search, SlidersHorizontal, X } from 'lucide-react';

import { Product } from '@/types';

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minRating, setMinRating] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (category) params.append('category', category);
            if (minPrice) params.append('minPrice', minPrice);
            if (maxPrice) params.append('maxPrice', maxPrice);
            if (minRating) params.append('minRating', minRating);
            if (sortBy) params.append('sort', sortBy);

            const res = await api.get(`/products?${params.toString()}`);
            setProducts(res.data.data.products);
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchProducts();
        }, 300);
        return () => clearTimeout(debounceTimer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, search, minPrice, maxPrice, minRating, sortBy]);

    const categories = ['Electronics', 'Fashion', 'Sports', 'Home'];
    const ratings = [
        { value: '4', label: '4+ Stars' },
        { value: '3', label: '3+ Stars' },
        { value: '2', label: '2+ Stars' },
        { value: '1', label: '1+ Stars' },
    ];
    const sortOptions = [
        { value: '', label: 'Default' },
        { value: 'price', label: 'Price: Low to High' },
        { value: '-price', label: 'Price: High to Low' },
        { value: '-createdAt', label: 'Newest First' },
        { value: '-averageRating', label: 'Top Rated' },
    ];

    const clearFilters = () => {
        setSearch('');
        setCategory('');
        setMinPrice('');
        setMaxPrice('');
        setMinRating('');
        setSortBy('');
    };

    const hasActiveFilters = search || category || minPrice || maxPrice || minRating || sortBy;

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-white">All Products</h1>

                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none w-full md:w-64 bg-gray-800 text-white placeholder-gray-400"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                        </div>

                        {/* Filter Toggle Button */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${showFilters ? 'bg-yellow-500 text-gray-900 border-yellow-500' : 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700'
                                }`}
                        >
                            <SlidersHorizontal className="w-5 h-5" />
                            Filters
                        </button>
                    </div>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-white">Filters</h3>
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
                                >
                                    <X className="w-4 h-4" />
                                    Clear All
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Category
                                </label>
                                <select
                                    className="w-full border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none bg-gray-700 text-white"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Min Price
                                </label>
                                <input
                                    type="number"
                                    placeholder="₹0"
                                    min="0"
                                    className="w-full border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none bg-gray-700 text-white placeholder-gray-400"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Max Price
                                </label>
                                <input
                                    type="number"
                                    placeholder="₹99999"
                                    min="0"
                                    className="w-full border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none bg-gray-700 text-white placeholder-gray-400"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                />
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Rating
                                </label>
                                <select
                                    className="w-full border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none bg-gray-700 text-white"
                                    value={minRating}
                                    onChange={(e) => setMinRating(e.target.value)}
                                >
                                    <option value="">Any Rating</option>
                                    {ratings.map((r) => (
                                        <option key={r.value} value={r.value}>{r.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Sort By
                                </label>
                                <select
                                    className="w-full border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none bg-gray-700 text-white"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    {sortOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Products Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-yellow-500" />
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-800 rounded-lg">
                        <p className="text-gray-400 text-lg">No products found.</p>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="mt-4 text-yellow-500 hover:text-yellow-400"
                            >
                                Clear filters to see all products
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
