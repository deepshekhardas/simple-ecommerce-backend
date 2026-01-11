'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Loader2, Package, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/orders'); // Admin view
            setOrders(res.data.data.orders);
        } catch (error) {
            console.error('Failed to fetch orders', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            await api.patch(`/orders/${id}/status`, { status: newStatus });
            // Optimistic update
            setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
        } catch (error) {
            console.error('Failed to update status', error);
            alert('Failed to update status');
        }
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const styles = {
            'PENDING': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
            'PAID': { bg: 'bg-blue-100', text: 'text-blue-800', icon: CheckCircle },
            'DELIVERED': { bg: 'bg-green-100', text: 'text-green-800', icon: Package },
            'CANCELLED': { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
        };
        const config = styles[status as keyof typeof styles] || styles['PENDING'];
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                <Icon className="w-3 h-3 mr-1" />
                {status}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm uppercase">
                                <th className="px-6 py-4 font-semibold">Order ID</th>
                                <th className="px-6 py-4 font-semibold">User</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Total</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-sm">#{order._id.slice(-6).toUpperCase()}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        <div className="font-medium">{order.user?.name || 'Unknown'}</div>
                                        <div className="text-xs text-gray-500">{order.user?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={order.status} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            value={order.status}
                                            onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                        >
                                            <option value="PENDING">Pending</option>
                                            <option value="PAID">Paid</option>
                                            <option value="DELIVERED">Delivered</option>
                                            <option value="CANCELLED">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {orders.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No orders found.
                    </div>
                )}
            </div>
        </div>
    );
}
