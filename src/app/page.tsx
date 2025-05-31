import React from 'react';
import dynamic from 'next/dynamic';
import { pacificoFont } from '@shared/lib';
import '@shared/ui/StyledButton.css'; // Import the CSS for styled buttons

// Динамический импорт клиентского компонента
const ClientHomePage = dynamic(() => import('./ClientHomePage'), {
  loading: () => (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Статический контент для загрузки */}
      <div className="h-16 bg-black" /> {/* Navbar placeholder */}
      
      {/* Hero Section placeholder */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-black px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="relative z-10 flex flex-col items-center">
          <div style={{ height: 80 }} /> {/* LogoAnimation placeholder */}
          <h1 className="font-press-start-hero text-center text-2xl font-normal tracking-tight text-white sm:text-3xl md:text-4xl mt-4">
            Ваш проводник в мир искусственного интеллекта
          </h1>
        </div>
      </section>
      
      {/* Chat Section placeholder */}
      <div className="h-32 bg-black" />
      
      {/* Quick Questions placeholder */}
      <div className="h-16 bg-black" />
      
      {/* News Section placeholder */}
      <section className="bg-black px-4 py-12 text-center sm:px-6 md:py-16 lg:px-8">
        <h2 className={`bg-gradient-to-r from-neutral-50 via-neutral-200 to-neutral-400 bg-clip-text text-2xl leading-relaxed font-bold tracking-tight text-transparent sm:text-3xl ${pacificoFont.className} mb-4 py-2 md:mb-6`}>
          Новости ИИ
        </h2>
        <div className="h-64 bg-gray-800 rounded-lg mx-auto max-w-3xl" />
      </section>
      
      {/* Testimonials placeholder */}
      <section className="bg-black px-4 py-12 text-center sm:px-6 md:py-16 lg:px-8">
        <h2 className={`bg-gradient-to-r from-neutral-50 via-neutral-200 to-neutral-400 bg-clip-text text-2xl leading-relaxed font-bold tracking-tight text-transparent sm:text-3xl ${pacificoFont.className} mb-4 py-2 md:mb-6`}>
          Отзывы наших клиентов
        </h2>
        <div className="h-96 bg-gray-800 rounded-lg mx-auto max-w-2xl" />
      </section>
      
      {/* CTA Section */}
      <section className="bg-black py-12 text-center md:py-16">
        <div className="px-6 py-3 text-xl font-medium text-gray-400">
          Связаться с нами
        </div>
      </section>
    </div>
  ),
});

export default function HomePage() {
  return <ClientHomePage />;
}
