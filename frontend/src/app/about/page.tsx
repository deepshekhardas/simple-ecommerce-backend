'use client';

import { Users, Package, Clock, Award, Target, Heart, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    const stats = [
        { number: "50K+", label: "Happy Customers", icon: Users },
        { number: "1000+", label: "Products", icon: Package },
        { number: "24/7", label: "Support", icon: Clock },
        { number: "99%", label: "Satisfaction", icon: Award }
    ];

    const values = [
        {
            icon: Target,
            title: "Our Mission",
            description: "To provide customers with a curated selection of premium products at competitive prices, making quality accessible to everyone.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Heart,
            title: "Our Values",
            description: "We believe in quality, transparency, and exceptional customer service. Every product we sell meets our rigorous standards.",
            color: "from-pink-500 to-rose-500"
        },
        {
            icon: Zap,
            title: "Our Vision",
            description: "To become the most trusted e-commerce platform, known for quality products and outstanding customer experience.",
            color: "from-yellow-500 to-orange-500"
        },
        {
            icon: Globe,
            title: "Global Reach",
            description: "We serve customers in over 50 countries, bringing premium products to doorsteps around the world.",
            color: "from-purple-500 to-indigo-500"
        }
    ];

    const team = [
        { name: "Sarah Johnson", role: "CEO & Founder", image: "👩‍💼" },
        { name: "Michael Chen", role: "CTO", image: "👨‍💻" },
        { name: "Emily Davis", role: "Head of Design", image: "👩‍🎨" },
        { name: "James Wilson", role: "Head of Operations", image: "👨‍💼" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
                <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                    <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
                        <Award className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-400 text-sm font-medium">Since 2024</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">ShopHub</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        We are redefining the ecommerce experience by bringing you the best quality products
                        with a seamless shopping journey. Quality meets convenience.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4">
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-4xl font-bold text-white mb-1">{stat.number}</h3>
                                <p className="text-gray-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-3xl blur-xl"></div>
                        <div className="relative bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl h-96 flex items-center justify-center border border-gray-600/50 overflow-hidden">
                            <div className="text-center">
                                <div className="text-8xl mb-4">🛍️</div>
                                <p className="text-gray-400 font-medium">Premium Shopping Experience</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold text-white">Our Story</h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Founded in 2024, ShopHub started with a simple idea: to make online shopping for tech and
                            lifestyle products easier and more reliable. We noticed that customers often struggled to find
                            quality products at fair prices.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Today, we serve over 50,000 happy customers worldwide. Our team of experts carefully curates
                            each product in our catalog, ensuring that every item meets our high standards for quality
                            and value.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <div className="flex -space-x-3">
                                {['🧑', '👩', '👨', '👧'].map((emoji, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-800 text-lg">
                                        {emoji}
                                    </div>
                                ))}
                            </div>
                            <p className="text-gray-400">Join 50K+ satisfied customers</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">What Drives Us</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Our core values shape everything we do, from product selection to customer service.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300"
                        >
                            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.color} mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                <value.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
                    <p className="text-gray-400 text-lg">The passionate people behind ShopHub</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="text-center group"
                        >
                            <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center border-4 border-gray-600/50 group-hover:border-purple-500/50 transition-colors text-5xl">
                                {member.image}
                            </div>
                            <h4 className="text-lg font-bold text-white">{member.name}</h4>
                            <p className="text-gray-400 text-sm">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="relative bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-12 border border-purple-500/30 overflow-hidden text-center">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"></div>

                    <div className="relative">
                        <h3 className="text-3xl font-bold text-white mb-4">Ready to Start Shopping?</h3>
                        <p className="text-gray-300 mb-8 max-w-xl mx-auto text-lg">
                            Join thousands of satisfied customers and discover our curated collection of premium products.
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                        >
                            Browse Products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
