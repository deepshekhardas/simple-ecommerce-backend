'use client';

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About ShopHub</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    We are redefining the ecommerce experience by bringing you the best quality products with a seamless shopping journey.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-80 w-full flex items-center justify-center">
                    {/* Placeholder for About Image */}
                    <span className="text-gray-400 dark:text-gray-500 font-medium">Our Story Image</span>
                </div>
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
                    <p>
                        At ShopHub, our mission is to provide customers with a curated selection of premium products at competitive prices. We believe in quality, transparency, and exceptional customer service.
                    </p>
                    <p>
                        Founded in 2024, we started with a simple idea: to make online shopping for tech and lifestyle products easier and more reliable. Today, we serve thousands of happy customers worldwide.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                    <h3 className="text-4xl font-bold text-blue-600 mb-2">10k+</h3>
                    <p className="text-gray-600 dark:text-gray-400">Happy Customers</p>
                </div>
                <div className="p-6">
                    <h3 className="text-4xl font-bold text-blue-600 mb-2">500+</h3>
                    <p className="text-gray-600 dark:text-gray-400">Products</p>
                </div>
                <div className="p-6">
                    <h3 className="text-4xl font-bold text-blue-600 mb-2">24/7</h3>
                    <p className="text-gray-600 dark:text-gray-400">Support</p>
                </div>
            </div>
        </div>
    );
}
