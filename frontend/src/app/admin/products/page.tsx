'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Plus, Edit, Trash2, Search, Loader2 } from 'lucide-react';

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data.data.products);
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await api.delete(`/products/${id}`);
            // Optimistic update or refetch
            setProducts(products.filter(p => p._id !== id));
        } catch (error) {
            console.error('Failed to delete product', error);
            alert('Failed to delete product');
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <Link
                    href="/admin/products/new"
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex items-center">
                    <div className="relative max-w-md w-full">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-gray-900"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm uppercase">
                                <th className="px-6 py-4 font-semibold">Product</th>
                                <th className="px-6 py-4 font-semibold">Price</th>
                                <th className="px-6 py-4 font-semibold">Stock</th>
                                <th className="px-6 py-4 font-semibold">Category</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProducts.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0 rounded-lg overflow-hidden border bg-gray-100 mr-4">
                                                {product.images && product.images[0] ? (
                                                    <img src={product.images[0]} alt="" className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{product.name}</div>
                                                <div className="text-xs text-gray-500 font-mono">{product.sku}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 font-medium">${product.price.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                            ${product.stock > 10 ? 'bg-green-100 text-green-800' :
                                                product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'}`}>
                                            {product.stock} in stock
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{product.category}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded" title="Edit (Coming Soon)">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No products found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
}
