'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import BookIcon from '@/images/book.svg';
import AutoIcon from '@/images/auto.svg';
import AgentIcon from '@/images/agent.svg';

// Типы для наших сервисов
interface ServiceDetail {
  title: string;
  items: string[];
}

interface Service {
  id: string;
  title: string;
  icon: string;
  details: ServiceDetail[];
}

export default function Services() {
  // Состояние для отслеживания открытых деталей
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    document.title = "Услуги — OptimaAI";
  }, []);

  // Данные о сервисах
  const services: Service[] = [
    {
      id: 'training',
      title: 'Обучение',
      icon: BookIcon,
      details: [
        { 
          title: 'Форматы',
          items: ['Промптинг / Метапромптинг']
        },
        {
          title: 'Формат',
          items: ['онлайн/офлайн, индивидуальные и групповые занятия']
        },
        {
          title: 'Стоимость',
          items: ['от 20 000 ₽ за человека']
        },
        {
          title: 'Ценность',
          items: ['навык эффективной работы с ИИ, экономия времени, повышение продуктивности']
        }
      ]
    },
    {
      id: 'automation',
      title: 'Автоматизация',
      icon: AutoIcon,
      details: [
        {
          title: 'Интеграция',
          items: ['Внедрение ИИ в CRM, Notion, таблицы, мессенджеры и др.']
        },
        {
          title: 'Адаптация',
          items: ['Адаптация под текущую систему клиента']
        },
        {
          title: 'Поддержка',
          items: ['Постподдержка и обучение']
        }
      ]
    },
    {
      id: 'agents',
      title: 'Создание агентов',
      icon: AgentIcon,
      details: [
        {
          title: 'Разработка',
          items: ['ИИ-ассистенты и кастомные LLM']
        },
        {
          title: 'Развёртывание',
          items: ['Локально (на ресурсах клиента) или через Яндекс/Сбер/другое']
        },
        {
          title: 'Процесс',
          items: ['Полный цикл: разработка, интеграция, обучение, поддержка']
        }
      ]
    }
  ];

  // Функция для переключения видимости деталей
  const toggleDetails = (serviceId: string) => {
    setExpandedServices(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="flex flex-col pt-24 px-6 max-w-4xl mx-auto">
        <h1 
          className="text-3xl md:text-4xl font-bold text-white mb-12 mt-8"
          style={{ fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em' }}
        >
          
        </h1>

        <ul className="space-y-12">
          {services.map((service) => (
            <li 
              key={service.id}
              className="border border-gray-800 rounded-lg p-6 transition-all"
            >
              <div className="flex items-start gap-6">
                <div className="bg-gray-900 p-3 rounded-lg flex-shrink-0">
                  <Image 
                    src={service.icon} 
                    alt={service.title}
                    width={32} 
                    height={32} 
                    className="w-8 h-8"
                    style={{ filter: 'invert(1)' }}
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h2 className="text-xl font-medium text-white">{service.title}</h2>
                    
                    <button
                      onClick={() => toggleDetails(service.id)}
                      className="text-sm text-gray-400 hover:text-white px-3 py-1 rounded-md border border-gray-700 hover:border-gray-500 transition-all"
                      aria-expanded={!!expandedServices[service.id]}
                      style={{ 
                        transform: expandedServices[service.id] ? 'scale(0.98)' : 'scale(1)',
                        opacity: expandedServices[service.id] ? '0.9' : '1'
                      }}
                    >
                      {expandedServices[service.id] ? 'Скрыть' : 'Подробнее'}
                    </button>
                  </div>
                  
                  <div 
                    className="overflow-hidden transition-all"
                    style={{ 
                      maxHeight: expandedServices[service.id] ? '500px' : '0px', 
                      opacity: expandedServices[service.id] ? 1 : 0,
                      marginTop: expandedServices[service.id] ? '16px' : '0px',
                      transitionProperty: 'max-height, opacity, margin',
                      transitionDuration: '300ms',
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <div className="space-y-4">
                      {service.details.map((detail, index) => (
                        <div key={index} className="border-t border-gray-800 pt-4 first:border-0 first:pt-0">
                          <h3 className="text-sm font-medium text-gray-400 mb-1">{detail.title}</h3>
                          <ul className="space-y-1">
                            {detail.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-white text-sm">{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
