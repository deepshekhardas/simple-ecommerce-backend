'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';
import { ArrowLeft, Loader2, Save } from 'lucide-react';

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        image: '',
        sku: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/products', {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                images: [formData.image] // Simple single image handling for now
            });
            router.push('/admin/products');
        } catch (error) {
            console.error('Failed to create product', error);
            alert('Failed to create product. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center mb-6">
                <Link href="/admin/products" className="mr-4 text-gray-500 hover:text-gray-900">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-6 space-y-6">

                {/* Basic Info */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            required
                            name="name"
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            required
                            name="description"
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Pricing & Stock */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                        <input
                            required
                            name="price"
                            type="number"
                            step="0.01"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                        <input
                            required
                            name="stock"
                            type="number"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                            value={formData.stock}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Category & SKU */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            required
                            name="category"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="">Select Category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Sports">Sports</option>
                            <option value="Home">Home</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">SKU</label>
                        <input
                            required
                            name="sku"
                            type="text"
                            placeholder="PROD-001"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                            value={formData.sku}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Image */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        required
                        name="image"
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        value={formData.image}
                        onChange={handleChange}
                    />
                    <p className="mt-1 text-xs text-gray-500">Provide a direct link to an image (e.g., Unsplash)</p>
                </div>

                <div className="pt-4 border-t flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium disabled:opacity-70"
                    >
                        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        <Save className="w-4 h-4 mr-2" />
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    );
}
