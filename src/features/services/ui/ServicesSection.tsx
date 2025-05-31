import React from 'react';
import dynamic from 'next/dynamic';

// Динамический импорт клиентского компонента
const ClientServicesSection = dynamic(() => import('./ClientServicesSection'), {
  ssr: false,
  loading: () => (
    <section className="bg-black px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-4xl font-light tracking-wide text-gray-300">
          Наши услуги
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800 p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="flex items-center space-x-4">
                <div className="h-8 w-8 bg-gray-600 rounded animate-pulse"></div>
                <div className="h-6 w-24 bg-gray-600 rounded animate-pulse"></div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-600 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
});

export default function ServicesSection() {
  return <ClientServicesSection />;
}
