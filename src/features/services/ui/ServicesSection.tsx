'use client';

import type React from 'react';

import { useState } from 'react';
import { BookOpen, Cog, Bot } from 'lucide-react';
import { ServiceCard } from '../';

type ServiceItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
  details: string[];
};

const services: ServiceItem[] = [
  {
    id: 'education',
    title: 'Обучение',
    icon: (
      <BookOpen className="h-8 w-8 text-white transition-all duration-500 group-hover:scale-110" />
    ),
    details: [
      'Форматы: Prompting / Метапромптинг',
      'Формат: онлайн/офлайн, индивидуальные и групповые занятия',
      'Ценность: навык эффективной работы с ИИ, экономия времени, повышение продуктивности',
    ],
  },
  {
    id: 'automation',
    title: 'Автоматизация',
    icon: <Cog className="h-8 w-8 text-white transition-all duration-500 group-hover:scale-110" />,
    details: [
      'Внедрение ИИ в CRM, Notion, таблицы, мессенджеры и др.',
      'Адаптация под текущую систему клиента',
      'Постподдержка и обучение',
    ],
  },
  {
    id: 'agents',
    title: 'Создание агентов',
    icon: <Bot className="h-8 w-8 text-white transition-all duration-500 group-hover:scale-110" />,
    details: [
      'ИИ-ассистенты и кастомные LLM',
      'Развёртывание локально (на ресурсах клиента) или через Яндекс/Сбер/другое',
      'Полный цикл: разработка, интеграция, обучение, поддержка',
    ],
  },
];

export default function ServicesSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleDetails = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="bg-black px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-4xl font-light tracking-wide text-gray-300">
          Наши услуги
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              icon={service.icon}
              details={service.details}
              isExpanded={expandedId === service.id}
              onToggle={toggleDetails}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
