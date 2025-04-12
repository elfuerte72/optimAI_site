'use client';

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Book, Settings2, Network } from "lucide-react";
import Navbar from '@/components/layout/Navbar';

export default function Services() {
  useEffect(() => {
    // Устанавливаем заголовок страницы при загрузке
    document.title = "Услуги — OptimaAI";
  }, []);

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

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-blue-400/20 transition-all duration-300 text-left group"
          >
            <Book className="w-10 h-10 text-blue-400 mb-4 group-hover:text-blue-500 transition-colors duration-300" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Обучение без лишнего
            </h3>
            <p className="text-gray-300">
              Промптинг, ИИ-инструменты и нейросети — просто, понятно и с нуля.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-blue-400/20 transition-all duration-300 text-left group"
          >
            <Settings2 className="w-10 h-10 text-blue-400 mb-4 group-hover:text-blue-500 transition-colors duration-300" />
            <h3 className="text-xl font-semibold text-white mb-2">
              ИИ под вас
            </h3>
            <p className="text-gray-300">
              Настраиваем ассистентов и нейросети под ваши задачи — от генерации текста до автоматизации процессов.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-blue-400/20 transition-all duration-300 text-left group"
          >
            <Network className="w-10 h-10 text-blue-400 mb-4 group-hover:text-blue-500 transition-colors duration-300" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Интеграция без боли
            </h3>
            <p className="text-gray-300">
              Встраиваем ИИ в ваши сервисы, обучаем команду и сопровождаем до первых результатов.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
