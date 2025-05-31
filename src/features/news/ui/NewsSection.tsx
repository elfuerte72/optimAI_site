import React from 'react';
import dynamic from 'next/dynamic';
import { pacificoFont } from '@shared/lib';

// Динамические импорты для клиентских компонентов
const ClientNewsSection = dynamic(() => import('./ClientNewsSection'), {
  ssr: false,
  loading: () => (
    <section className="bg-black px-4 py-12 text-center sm:px-6 md:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className={`bg-gradient-to-r from-neutral-50 via-neutral-200 to-neutral-400 bg-clip-text text-2xl leading-relaxed font-bold tracking-tight text-transparent sm:text-3xl ${pacificoFont.className} mb-4 py-2 md:mb-6`}>
          Новости ИИ
        </h2>
        <div className="relative mx-auto max-w-3xl">
          <div className="h-64 bg-gray-800 rounded-lg animate-pulse"></div>
          <div className="mt-6 flex justify-between">
            <div className="h-10 w-10 bg-gray-700 rounded animate-pulse"></div>
            <div className="flex items-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-2 w-2 bg-gray-700 rounded-full animate-pulse"></div>
              ))}
            </div>
            <div className="h-10 w-10 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  ),
});

export default function NewsSection() {
  return <ClientNewsSection />;
}
