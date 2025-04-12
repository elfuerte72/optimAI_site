import { useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Book, Settings2, Network } from "lucide-react";

export default function Home() {
  useEffect(() => {
    document.title = "OptimaAI — Сила в простоте";
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-black dark:to-gray-900 transition-colors duration-500 font-sans">
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center items-center gap-3 mb-8"
        >
          <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
          <span className="text-2xl font-semibold tracking-wide text-gray-800 dark:text-gray-200">OptimaAI</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white hover:text-cyan-500 transition-colors duration-300"
        >
          Сила — в простоте.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 text-lg text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-300"
        >
          Искусственный интеллект, который не мешает, а помогает.
        </motion.p>

        <motion.a
          href="#services"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="inline-block mt-10 px-10 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          Узнать больше
        </motion.a>
      </div>

      <section id="services" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Наши услуги
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-cyan-400/40 dark:hover:shadow-cyan-500/30 transition-all duration-300 text-left group"
          >
            <Book className="w-10 h-10 text-cyan-400 mb-4 group-hover:text-blue-500 transition-colors duration-300" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Обучение без лишнего
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Промптинг, ИИ-инструменты и нейросети — просто, понятно и с нуля.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-cyan-400/40 dark:hover:shadow-cyan-500/30 transition-all duration-300 text-left group"
          >
            <Settings2 className="w-10 h-10 text-cyan-400 mb-4 group-hover:text-blue-500 transition-colors duration-300" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              ИИ под вас
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Настраиваем ассистентов и нейросети под ваши задачи — от генерации текста до автоматизации процессов.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-cyan-400/40 dark:hover:shadow-cyan-500/30 transition-all duration-300 text-left group"
          >
            <Network className="w-10 h-10 text-cyan-400 mb-4 group-hover:text-blue-500 transition-colors duration-300" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Интеграция без боли
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Встраиваем ИИ в ваши сервисы, обучаем команду и сопровождаем до первых результатов.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
