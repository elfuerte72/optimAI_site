'use client';

import { motion } from 'framer-motion';

interface FutureProjectProps {
  title: string;
  description: string;
}

const FutureProjects: FutureProjectProps[] = [
  {
    title: 'Optima Singularity',
    description: 'Головной центр агентов ИИ, доступных на аутсорсе',
  },
  {
    title: 'Optima Connect',
    description: 'Социальная сеть с ИИ-тестированием и подбором команды',
  },
];

export default function FutureSection() {
  return (
    <section className="mx-auto w-full max-w-5xl py-16">
      <h2 className="mb-8 text-center text-3xl font-bold text-white">Будущее</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {FutureProjects.map((project, index) => (
          <motion.div
            key={index}
            className="rounded-lg border border-gray-800 bg-gray-900 p-6"
            whileHover={{
              scale: 1.03,
              borderColor: '#3B82F6',
              transition: { duration: 0.2 },
            }}
          >
            <h3 className="mb-2 text-xl font-semibold text-white">{project.title}</h3>
            <p className="text-gray-300">{project.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
