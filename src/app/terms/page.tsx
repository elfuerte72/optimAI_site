import React from 'react';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

// Динамический импорт клиентского компонента
const ClientTermsPage = dynamic(() => import('./ClientTermsPage'), {
    loading: () => (
        <div className="flex min-h-screen flex-col bg-black text-white">
            <div className="h-16 bg-black" />
            <main className="flex-grow">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="mb-8 h-12 w-3/4 rounded bg-gray-700"></div>
                        <div className="space-y-4">
                            <div className="h-4 w-full rounded bg-gray-700"></div>
                            <div className="h-4 w-5/6 rounded bg-gray-700"></div>
                            <div className="h-4 w-4/5 rounded bg-gray-700"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    ),
});

export const metadata: Metadata = {
    title: 'Условия использования',
    description: 'Условия использования сайта OptimaAI - правила и порядок использования интернет-ресурса',
};

const TermsPage: React.FC = () => {
    return <ClientTermsPage />;
};

export default TermsPage; 