'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Order } from '@/types';

export default function OrderDetailsPage() {
    const { id } = useParams();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await api.get(`/orders/${id}`);
                setOrder(res.data.data.order);
            } catch (error) {
                console.error('Failed to fetch order', error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!order) {
        return <div className="text-center py-20">Order not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-6">
                <Link href="/orders" className="text-gray-500 hover:text-gray-900 flex items-center mb-4">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Orders
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
            </div>

            <div className="bg-white border rounded-xl shadow-sm overflow-hidden mb-8">
                <div className="p-6 border-b bg-gray-50 flex flex-col md:flex-row justify-between gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Order ID</p>
                        <p className="font-mono font-medium">#{order._id}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Date Placed</p>
                        <p className="font-medium">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold
               ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                            {order.status}
                        </span>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Items</h3>
                        <div className="space-y-4">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center py-2 border-b last:border-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-md"></div> {/* Placeholder for image if not in order item snapshot */}
                                        <div>
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-medium">${item.price.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
                            <div className="text-gray-600 text-sm space-y-1">
                                <p>{order.shippingAddress.line1}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                <p>{order.shippingAddress.country}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Payment Summary</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>${order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax</span>
                                    <span>${order.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                    <span>Total</span>
                                    <span>${order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
