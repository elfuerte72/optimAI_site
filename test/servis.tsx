import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Book, Settings2, Network } from 'lucide-react';

export default function Home() {
  useEffect(() => {
    document.title = 'OptimaAI — Сила в простоте';
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 font-sans transition-colors duration-500 dark:from-black dark:to-gray-900">
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8 flex items-center justify-center gap-3"
        >
          <Sparkles className="h-8 w-8 animate-pulse text-cyan-400" />
          <span className="text-2xl font-semibold tracking-wide text-gray-800 dark:text-gray-200">
            OptimaAI
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-gray-900 transition-colors duration-300 hover:text-cyan-500 md:text-6xl dark:text-white"
        >
          Сила — в простоте.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 text-lg text-gray-600 transition-colors duration-300 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
        >
          Искусственный интеллект, который не мешает, а помогает.
        </motion.p>

        <motion.a
          href="#services"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10 inline-block transform rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-10 py-3 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-cyan-600 hover:to-blue-600 hover:shadow-2xl"
        >
          Узнать больше
        </motion.a>
      </div>

      <section id="services" className="container mx-auto px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
          Наши услуги
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <motion.div
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className="group rounded-2xl bg-white p-8 text-left shadow-md transition-all duration-300 hover:shadow-cyan-400/40 dark:bg-gray-800 dark:hover:shadow-cyan-500/30"
          >
            <Book className="mb-4 h-10 w-10 text-cyan-400 transition-colors duration-300 group-hover:text-blue-500" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Обучение без лишнего
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Промптинг, ИИ-инструменты и нейросети — просто, понятно и с нуля.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className="group rounded-2xl bg-white p-8 text-left shadow-md transition-all duration-300 hover:shadow-cyan-400/40 dark:bg-gray-800 dark:hover:shadow-cyan-500/30"
          >
            <Settings2 className="mb-4 h-10 w-10 text-cyan-400 transition-colors duration-300 group-hover:text-blue-500" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">ИИ под вас</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Настраиваем ассистентов и нейросети под ваши задачи — от генерации текста до
              автоматизации процессов.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className="group rounded-2xl bg-white p-8 text-left shadow-md transition-all duration-300 hover:shadow-cyan-400/40 dark:bg-gray-800 dark:hover:shadow-cyan-500/30"
          >
            <Network className="mb-4 h-10 w-10 text-cyan-400 transition-colors duration-300 group-hover:text-blue-500" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
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
