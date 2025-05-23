'use client';
import React from 'react';
import Image from 'next/image';
import { notoSansJP } from '@/lib/fonts'; // Assuming '@/lib/fonts' is the correct path alias for src/lib/fonts
import Navbar from '@/components/layout/Navbar';

const AboutPage: React.FC = () => {
  const initialAnimationState = "opacity-0";
  const fadeInAnimationClass = "animate-fadeIn"; // For header and first section
  const slideInLeftAnimationClass = "animate-slideInLeft"; // For subsequent sections

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className={`${notoSansJP.className} flex-grow px-4 sm:px-6 lg:px-8 pt-16`}>
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out forwards;
          }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-slideInLeft {
            animation: slideInLeft 0.8s ease-out forwards;
          }
          .subheading-gradient {
            /* Tailwind equivalent: bg-gradient-to-r from-cyan-400 to-purple-600 */
            background-image: linear-gradient(to right, #22d3ee, #a855f7); 
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
        `}</style>
        
        <div className="container mx-auto">
        {/* Header: {Logo} - Ближе к будущему */}
        <header 
          className={`flex flex-col items-center mb-16 ${initialAnimationState} ${fadeInAnimationClass} max-w-3xl mx-auto`} 
          style={{ animationDelay: '0.1s' }}
        >
          <div className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            Optima<span className="subheading-gradient">AI</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight subheading-gradient">
            Ближе к будущему
          </h1>
        </header>

        {/* Мы — энтузиасты... Section: Left-aligned text, centered block, fadeIn animation */}
        <section 
          className={`mb-12 ${initialAnimationState} ${fadeInAnimationClass} max-w-3xl mx-auto`} 
          style={{ animationDelay: '0.3s' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-left text-white">
            Мы — энтузиасты в сфере искусственного интеллекта.
          </h2>
          <p className="text-base md:text-lg text-neutral-300 text-left leading-relaxed">
            Обучаем современным техникам промтинга, создаём AI‑решения, помогаем бизнесу и государственным структурам делать технологии доступнее людям.
          </p>
        </section>

        {/* Наша миссия & Наше видение: Left-aligned text, slideInLeft animation */}
        <div className={`space-y-10 mb-12 max-w-3xl mx-auto`}>
          <section 
            className={`${initialAnimationState} ${slideInLeftAnimationClass} text-left`} 
            style={{ animationDelay: '0.5s' }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white">Наша миссия</h3>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
              Объединять людей и технологии.
            </p>
          </section>

          <section 
            className={`${initialAnimationState} ${slideInLeftAnimationClass} text-left`} 
            style={{ animationDelay: '0.7s' }} 
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white">Наше видение</h3>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
              Занять лидирующую позицию в российском AI‑консалтинге и EdTech, оставаясь гибкими, открытыми и постоянно в движении.
            </p>
          </section>
        </div>

        {/* Наши ценности: Left-aligned text, slideInLeft animation */}
        <section 
          className={`mb-12 ${initialAnimationState} ${slideInLeftAnimationClass} max-w-3xl mx-auto`} 
          style={{ animationDelay: '0.9s' }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-left text-white">Наши ценности</h3>
          <div className="space-y-6 border border-white p-6 rounded-md">
            {[
              { title: "Гибкость", description: "подстраиваемся под задачу клиента." },
              { title: "Открытость", description: "делимся знаниями и кодом." },
              { title: "Движение", description: "всегда держим руку на пульсе технологий." },
            ].map((value, index) => (
              <div 
                key={value.title} 
                className={`${initialAnimationState} ${slideInLeftAnimationClass} text-left`} 
                style={{ animationDelay: `${1.1 + index * 0.2}s` }} 
              >
                <h4 className="text-xl font-semibold mb-2 text-white">{value.title}</h4>
                <p className="text-sm md:text-base text-neutral-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Команда основателей: Left-aligned text, slideInLeft animation */}
        <section 
          className={`${initialAnimationState} ${slideInLeftAnimationClass} max-w-3xl mx-auto`} 
          style={{ animationDelay: '1.5s' }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-left text-white">Команда основателей</h3>
          <div className="text-left">
            <ul className="space-y-3 text-base md:text-lg text-neutral-300">
              {[
                "Григорий Таловиков — CEO.",
                "Сергей Щербина — директор промт-инжиниринга и PR.",
                "Максим Пенкин — Технический директор"
              ].map((founder, index) => (
                <li 
                  key={index} 
                  className={`py-2 ${initialAnimationState} ${slideInLeftAnimationClass}`} 
                  style={{ animationDelay: `${1.7 + index * 0.2}s` }} 
                >
                  {founder}
                </li>
              ))}
            </ul>
          </div>
        </section>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
