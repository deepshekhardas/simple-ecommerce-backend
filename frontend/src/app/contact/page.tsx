'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, MessageSquare, Clock, Headphones } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const contactCards = [
        {
            icon: Mail,
            title: "Email Us",
            info: "support@shophub.com",
            subInfo: "We reply within 24 hours",
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-500/10"
        },
        {
            icon: Phone,
            title: "Call Us",
            info: "+1 (555) 123-4567",
            subInfo: "Mon-Fri 9am-6pm EST",
            color: "from-green-500 to-emerald-500",
            bgColor: "bg-green-500/10"
        },
        {
            icon: MapPin,
            title: "Visit Us",
            info: "123 Commerce St.",
            subInfo: "New York, NY 10012",
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-500/10"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
                <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
                        <MessageSquare className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 text-sm font-medium">We&apos;re here to help</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Touch</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Have questions about our products or your order? We&apos;re here to help.
                        Send us a message and we&apos;ll respond as soon as possible.
                    </p>
                </div>
            </div>

            {/* Contact Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {contactCards.map((card, index) => (
                        <div
                            key={index}
                            className="group relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:transform hover:-translate-y-2"
                        >
                            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${card.color} mb-6 shadow-lg`}>
                                <card.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                            <p className="text-lg text-gray-200 font-medium">{card.info}</p>
                            <p className="text-sm text-gray-400 mt-1">{card.subInfo}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Side - Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">Let&apos;s start a conversation</h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Whether you have a question about products, pricing, or anything else, our team is ready to answer all your questions.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
                                <div className="p-3 bg-yellow-500/20 rounded-lg">
                                    <Clock className="w-6 h-6 text-yellow-400" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">Fast Response</h4>
                                    <p className="text-gray-400">Average response time under 2 hours</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
                                <div className="p-3 bg-green-500/20 rounded-lg">
                                    <Headphones className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">24/7 Support</h4>
                                    <p className="text-gray-400">We&apos;re available around the clock</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
                        {success ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/25">
                                    <CheckCircle className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-gray-400 mb-8">Thank you for reaching out. We&apos;ll get back to you shortly.</p>
                                <button
                                    onClick={() => setSuccess(false)}
                                    className="text-blue-400 hover:text-blue-300 font-medium"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-4 rounded-xl border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-4 rounded-xl border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-4 rounded-xl border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                        placeholder="How can we help?"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        className="w-full px-4 py-4 rounded-xl border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg hover:shadow-blue-500/25"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Send Message</>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
