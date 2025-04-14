'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, UserCheck, BarChart3, FileText, LineChart, Copy, X } from "lucide-react";
import Navbar from '@/components/layout/Navbar';

export default function Services() {
  // Состояние для отслеживания открытых деталей услуг
  const [openService, setOpenService] = useState<number | null>(null);

  useEffect(() => {
    // Устанавливаем заголовок страницы при загрузке
    document.title = "Услуги — OptimaAI";
  }, []);

  // Функция для переключения открытого/закрытого состояния услуги
  const toggleService = (index: number) => {
    setOpenService(openService === index ? null : index);
  };

  // Массив данных услуг
  const services = [
    {
      title: "Автоматизация процессов с ИИ",
      description: "Анализ рабочих процессов на предмет автоматизации",
      details: [
        "Внедрение ИИ-ассистентов в отделы продаж, поддержки, HR, документооборот",
        "Интеграция с корпоративными системами (CRM, ERP, СЭД, 1С, SAP и др.)"
      ],
      icon: <Bot className="w-10 h-10 text-blue-400 mb-4 group-hover:text-blue-500 transition-colors duration-300" />
    },
    {
      title: "ИИ-ассистенты для сотрудников",
      description: "Персональные помощники для решения ежедневных задач",
      details: [
        "Обработка писем, создание отчетов, генерация документов",
        "Голосовые интерфейсы и ассистенты"
      ],
      icon: <UserCheck className="w-10 h-10 text-blue-400 mb-4 group-hover:text-blue-500 transition-colors duration-300" />
    },
    {
      title: "Работа с большими данными",
      description: "Предиктивная аналитика и прогнозирование",
      details: [
        "Обнаружение аномалий в данных",
        "Автоматическая генерация отчетов и визуализация"
      ],
      icon: <BarChart3 className="w-10 h-10 text-blue-400 mb-4 group-hover:text-blue-500 transition-colors duration-300" />
    },
    {
      title: "Цифровизация документооборота",
      description: "Распознавание и структурирование документов",
      details: [
        "Автоматическая маршрутизация и классификация",
        "Проверка на соответствие шаблонам и нормативам"
      ],
      icon: <FileText className="w-10 h-10 text-blue-400 mb-4 group-hover:text-blue-500 transition-colors duration-300" />
    },
    {
      title: "Контроль качества и KPI (AI Monitoring)",
      description: "Этичный мониторинг процессов и показателей",
      details: [
        "Анализ эффективности команд и выявление узких мест",
        "Уведомления о перегрузках, снижении активности, рисках"
      ],
      icon: <LineChart className="w-10 h-10 text-blue-400 mb-4 group-hover:text-blue-500 transition-colors duration-300" />
    },
    {
      title: "Цифровой двойник организации",
      description: "Моделирование процессов и решений",
      details: [
        "Симуляция сценариев развития и цифровое планирование",
        "Создание обученных ИИ-моделей для внутренних нужд"
      ],
      icon: <Copy className="w-10 h-10 text-blue-400 mb-4 group-hover:text-blue-500 transition-colors duration-300" />
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-32 pb-20 container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
        >
          Наши услуги
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              className={`bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-blue-400/20 transition-all duration-300 text-left group relative ${openService === index ? 'border border-blue-400' : 'hover:border hover:border-blue-400'}`}
            >
              {service.icon}
              <h3 className="text-xl font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-300 mb-4">
                {service.description}
              </p>
              
              <button 
                onClick={() => toggleService(index)}
                className="px-4 py-2 text-sm rounded-md bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/40 transition-all duration-300"
              >
                {openService === index ? 'Скрыть' : 'Подробнее'}
              </button>
              
              <AnimatePresence>
                {openService === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-700 relative"
                  >
                    <ul className="space-y-2 text-gray-300 list-disc pl-5">
                      {service.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => setOpenService(null)}
                      className="absolute top-4 right-0 p-1 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
                      aria-label="Закрыть"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
