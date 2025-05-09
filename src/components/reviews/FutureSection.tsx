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
    <section className="max-w-5xl mx-auto w-full py-16">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Будущее
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FutureProjects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-gray-900 rounded-lg p-6 border border-gray-800"
            whileHover={{ 
              scale: 1.03,
              borderColor: '#3B82F6',
              transition: { duration: 0.2 }
            }}
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-gray-300">
              {project.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}