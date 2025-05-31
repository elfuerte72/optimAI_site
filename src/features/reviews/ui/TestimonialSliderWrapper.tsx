import React from 'react';
import dynamic from 'next/dynamic';
import { Testimonial } from '../';

// Динамический импорт TestimonialSlider с загрузочным скелетоном
const TestimonialSlider = dynamic(() => import('./TestimonialSlider'), {
  ssr: false,
  loading: () => (
    <div className="mx-auto mt-0 flex max-w-2xl flex-col items-center">
      <div className="relative h-auto min-h-[380px] w-full max-w-2xl rounded-xl border border-[#FFFFFF25] bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-6 shadow-2xl md:p-8">
        <div className="flex h-full flex-col text-center">
          <div className="flex flex-1 flex-col justify-center">
            <div className="mb-2 h-6 w-32 animate-pulse rounded bg-gray-700 mx-auto"></div>
            <div className="mb-4 h-4 w-24 animate-pulse rounded bg-gray-600 mx-auto"></div>
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-gray-600"></div>
              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-600 mx-auto"></div>
              <div className="h-4 w-4/6 animate-pulse rounded bg-gray-600 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <div className="h-9 w-9 animate-pulse rounded-full bg-gray-700"></div>
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-2 w-2 animate-pulse rounded-full bg-gray-700"></div>
          ))}
        </div>
        <div className="h-9 w-9 animate-pulse rounded-full bg-gray-700"></div>
      </div>
    </div>
  ),
});

const TestimonialSliderWrapper = () => {
  // Используем те же данные отзывов, что и в оригинальном компоненте
  const testimonials: Testimonial[] = [
    {
      name: 'Катерина Анатольевна',
      text: 'Прошла обучение по промптингу и хочу выразить огромную благодарность! 25 из 25 на итоговой проверке — отличный результат для первого знакомства с ИИ. Благодарю наставников — Максима, Сергея и Григория — за профессионализм и поддержку. Спасибо за возможность расти, развиваться и встречаться с единомышленниками. До новых встреч!',
    },
    {
      name: 'Мария Савенко',
      text: 'Спасибо за обучение! Было интересно, познавательно и вдохновляюще. Радует, что обучение помогло увидеть новые возможности работы с искусственным интеллектом и почувствовать уверенность в применении промптинга в реальных задачах.',
    },
    {
      name: 'Ольга Морозова',
      text: 'Обучение промптингу прошло на одном дыхании! Огромное спасибо за доступную подачу материала, живые примеры и поддержку на каждом этапе. Теперь я уверенно применяю ИИ в работе и вижу реальные результаты.',
    },
  ];

  return <TestimonialSlider testimonials={testimonials} />;
};

export default TestimonialSliderWrapper;
