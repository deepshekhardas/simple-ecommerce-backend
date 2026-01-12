'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Loader2, Package, ChevronRight } from 'lucide-react';

import { Order } from '@/types';

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get('/orders/my-orders');
                setOrders(res.data.data.orders);
            } catch (error) {
                console.error('Failed to fetch orders', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-xl">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
                    <p className="text-gray-500 mb-6">Start shopping to see your orders here.</p>
                    <Link
                        href="/products"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium border border-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition"
                    >
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Order ID</p>
                                        <p className="font-mono text-sm font-medium text-gray-900">#{order._id.slice(-6).toUpperCase()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Date</p>
                                        <p className="font-medium text-gray-900">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total</p>
                                        <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                                order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                    'bg-blue-100 text-blue-800'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t pt-4 flex justify-between items-center">
                                    <div className="text-sm text-gray-600">
                                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                                    </div>
                                    <Link
                                        href={`/orders/${order._id}`}
                                        className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                                    >
                                        View Details <ChevronRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
