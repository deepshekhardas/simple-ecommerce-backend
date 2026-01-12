'use client';

import { HelpCircle, Truck, RefreshCcw, CreditCard, Mail, ChevronDown, Search, MessageCircle, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function HelpPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const categories = [
        {
            icon: Truck,
            title: "Shipping & Delivery",
            description: "Track orders & shipping info",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: RefreshCcw,
            title: "Returns & Refunds",
            description: "Return policy & process",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: CreditCard,
            title: "Payments",
            description: "Billing & payment options",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: Mail,
            title: "Contact Support",
            description: "Get in touch with us",
            color: "from-orange-500 to-red-500"
        }
    ];

    const faqs = [
        {
            question: "How do I track my order?",
            answer: "You can track your order by going to the 'My Orders' section in your profile. Click on the specific order to see its current status and tracking information. You'll also receive email updates at each stage of delivery."
        },
        {
            question: "What is your return policy?",
            answer: "We accept returns within 30 days of purchase. Items must be unused and in their original packaging. Please contact support to initiate a return. Once we receive and inspect the item, your refund will be processed within 5-7 business days."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on the destination. International orders may be subject to customs duties and taxes, which are the responsibility of the recipient."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, Mastercard, American Express) and secure payment methods like Stripe. All transactions are encrypted and secure. We also support Apple Pay and Google Pay for faster checkout."
        },
        {
            question: "How can I cancel my order?",
            answer: "You can cancel your order within 1 hour of placing it by going to 'My Orders' and clicking 'Cancel Order'. After this window, please contact our support team for assistance. Orders that have already shipped cannot be cancelled."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10"></div>
                <div className="absolute top-10 left-20 w-72 h-72 bg-green-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
                        <HelpCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm font-medium">Here to Help 24/7</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Help <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Center</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
                        Find answers to common questions and learn how to get the most out of ShopHub.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search for help..."
                            className="w-full px-6 py-5 pl-14 rounded-2xl bg-gray-800/80 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-lg"
                        />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Category Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            className="group relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:transform hover:-translate-y-2 cursor-pointer text-center"
                        >
                            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${cat.color} mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                <cat.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{cat.title}</h3>
                            <p className="text-sm text-gray-400">{cat.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-400">Quick answers to questions you may have</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-700/30 transition-colors"
                            >
                                <span className="text-lg font-semibold text-white">{faq.question}</span>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-48' : 'max-h-0'}`}>
                                <p className="px-6 pb-5 text-gray-400 leading-relaxed">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="relative bg-gradient-to-r from-gray-800 to-gray-800/50 rounded-3xl p-12 border border-gray-700/50 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>

                    <div className="relative text-center">
                        <div className="inline-flex p-4 bg-green-500/20 rounded-2xl mb-6">
                            <MessageCircle className="w-8 h-8 text-green-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Still need help?</h3>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto text-lg">
                            Our support team is available 24/7 to assist you with any questions or concerns.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                            >
                                <Mail className="w-5 h-5" />
                                Contact Support
                            </Link>
                            <button className="inline-flex items-center justify-center gap-2 bg-gray-700 text-white font-bold px-8 py-4 rounded-xl hover:bg-gray-600 transition-all">
                                <Zap className="w-5 h-5" />
                                Live Chat
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
