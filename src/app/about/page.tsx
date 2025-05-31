import React from 'react';
import dynamic from 'next/dynamic';
import { pacificoFont } from '@shared/lib';

// Клиентский компонент (по умолчанию ssr: true)
const ClientAboutPage = dynamic(() => import('./ClientAboutPage'), {
  loading: () => (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <div className="mx-auto w-full max-w-3xl space-y-16 px-4 pt-16 pb-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="text-white">Optima</span>
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">AI</span>
          </h1>
          <h2 className={`text-xl font-light tracking-tight text-neutral-200 sm:text-2xl lg:text-3xl ${pacificoFont.className} mt-4`}>
            Ближе к будущему
          </h2>
        </div>
      </div>
    </div>
  ),
});

const AboutPage: React.FC = () => {
  return <ClientAboutPage />;
};

export default AboutPage;