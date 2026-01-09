'use client';

import { HelpCircle, Truck, RefreshCcw, CreditCard, Mail } from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
    const faqs = [
        {
            question: "How do I track my order?",
            answer: "You can track your order by going to the 'My Orders' section in your profile. Click on the specific order to see its current status and tracking information."
        },
        {
            question: "What is your return policy?",
            answer: "We accept returns within 30 days of purchase. Items must be unused and in their original packaging. Please contact support to initiate a return."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on the destination."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, Mastercard, American Express) and secure payment methods like Stripe."
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Help Center</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Find answers to common questions and learn how to get the most out of ShopHub.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                    <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Truck className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Shipping & Delivery</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Track orders & shipping info</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                    <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <RefreshCcw className="w-6 h-6 text-green-600 dark:text-green-300" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Returns & Refunds</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Return policy & process</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                    <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Payments</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Billing & payment options</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                    <div className="bg-orange-100 dark:bg-orange-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-6 h-6 text-orange-600 dark:text-orange-300" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Contact Support</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get in touch with us</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Still need help?</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">Our support team is available 24/7 to assist you.</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
}
