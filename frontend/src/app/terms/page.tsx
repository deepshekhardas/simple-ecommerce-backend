'use client';

import { Shield, FileText, Scale, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function TermsPage() {
    const sections = [
        {
            icon: Shield,
            title: "Use License",
            content: "Permission is granted to temporarily download one copy of the materials (information or software) on ShopHub's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: AlertCircle,
            title: "Disclaimer",
            content: "The materials on ShopHub's website are provided on an 'as is' basis. ShopHub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.",
            color: "from-orange-500 to-red-500"
        },
        {
            icon: Scale,
            title: "Limitations",
            content: "In no event shall ShopHub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ShopHub's website.",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: FileText,
            title: "Revisions",
            content: "ShopHub may revise these terms of service at any time without notice. By using this website, you agree to be bound by the then current version of these terms of service. We encourage you to periodically review this page.",
            color: "from-green-500 to-emerald-500"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-purple-500/10"></div>
                <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-2 mb-6">
                        <FileText className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 text-sm font-medium">Legal Documentation</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Service</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Welcome to ShopHub. By accessing our website, you agree to be bound by these terms of service,
                        all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span>Last updated: January 2026</span>
                    </div>
                </div>
            </div>

            {/* Terms Sections */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:transform hover:-translate-y-1"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${section.color} mb-6`}>
                                <section.icon className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">{index + 1}. {section.title}</h2>
                            <p className="text-gray-400 leading-relaxed">{section.content}</p>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-16 text-center bg-gradient-to-r from-gray-800 to-gray-800/50 rounded-3xl p-12 border border-gray-700/50">
                    <h3 className="text-2xl font-bold text-white mb-4">Questions about our terms?</h3>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        If you have any questions regarding our terms of service, please don&apos;t hesitate to reach out to our legal team.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
}
