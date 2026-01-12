'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store';
import api from '@/lib/api';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '@/components/features/PaymentForm';
import { Loader2 } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

export default function CheckoutPage() {
    const { items, totalAmount } = useCartStore();

    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Address, 2: Payment

    const [formData, setFormData] = useState({
        line1: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
    });

    const handleCreateOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Create Order
            const orderRes = await api.post('/orders', {
                shippingAddress: formData,
                billingAddress: formData, // Simplified for demo
            });

            const orderId = orderRes.data.data.order._id;

            // 2. Create Payment Intent
            const paymentRes = await api.post('/payment/create-intent', {
                orderId,
            });

            setClientSecret(paymentRes.data.clientSecret);
            setStep(2);
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            console.error('Checkout failed', error);
            alert(err.response?.data?.message || 'Failed to process checkout. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return <div className="text-center py-20 text-xl text-gray-400">Your cart is empty</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Validation / Summary */}
                <div>
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
                    <div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                        {items.map(item => (
                            <div key={item.product._id} className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                                <span>{item.product.name} x {item.quantity}</span>
                                <span className="font-medium text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                            <span>Total</span>
                            <span>${(totalAmount * 1.1).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Steps */}
                <div>
                    {step === 1 && (
                        <form onSubmit={handleCreateOrder} className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Shipping Address</h2>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address Line 1</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="123 Main St"
                                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 transition"
                                    value={formData.line1}
                                    onChange={(e) => setFormData({ ...formData, line1: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="New York"
                                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 transition"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="NY"
                                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 transition"
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Postal Code</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="10001"
                                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 transition"
                                        value={formData.postalCode}
                                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="United States"
                                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 transition"
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 flex justify-center mt-6"
                            >
                                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Continue to Payment'}
                            </button>
                        </form>
                    )}

                    {step === 2 && clientSecret && (
                        <div>
                            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Payment</h2>
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <PaymentForm />
                            </Elements>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
