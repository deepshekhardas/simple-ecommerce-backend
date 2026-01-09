'use client';

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Privacy Policy</h1>
            <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-300">
                <p className="text-lg">Your privacy is important to us. It is ShopHub's policy to respect your privacy regarding any information we may collect from you across our website.</p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Information We Collect</h2>
                <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used.</p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Data Retention</h2>
                <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Sharing of Data</h2>
                <p>We don't share any personally identifying information publicly or with third-parties, except when required to by law.</p>
            </div>
        </div>
    );
}
