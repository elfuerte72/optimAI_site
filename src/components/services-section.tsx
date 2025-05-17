"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, Cog, Bot } from "lucide-react"

type ServiceItem = {
  id: string
  title: string
  icon: React.ReactNode
  details: string[]
}

const services: ServiceItem[] = [
  {
    id: "education",
    title: "Обучение",
    icon: <BookOpen className="h-8 w-8 text-white transition-all duration-500 group-hover:scale-110" />,
    details: [
      "Форматы: Prompting / Метапромптинг",
      "Формат: онлайн/офлайн, индивидуальные и групповые занятия",
      "Ценность: навык эффективной работы с ИИ, экономия времени, повышение продуктивности",
    ],
  },
  {
    id: "automation",
    title: "Автоматизация",
    icon: <Cog className="h-8 w-8 text-white transition-all duration-500 group-hover:scale-110" />,
    details: [
      "Внедрение ИИ в CRM, Notion, таблицы, мессенджеры и др.",
      "Адаптация под текущую систему клиента",
      "Постподдержка и обучение",
    ],
  },
  {
    id: "agents",
    title: "Создание агентов",
    icon: <Bot className="h-8 w-8 text-white transition-all duration-500 group-hover:scale-110" />,
    details: [
      "ИИ-ассистенты и кастомные LLM",
      "Развёртывание локально (на ресурсах клиента) или через Яндекс/Сбер/другое",
      "Полный цикл: разработка, интеграция, обучение, поддержка",
    ],
  },
]

export default function ServicesSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleDetails = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section className="bg-black py-20 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-4xl font-light tracking-wide text-gray-300">Наши услуги</h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="group relative overflow-hidden rounded-lg bg-zinc-900 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-[1.02] hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex h-full flex-col p-8">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800 transition-all duration-300 group-hover:bg-zinc-700">
                    {service.icon}
                  </div>
                </div>

                <h3 className="mb-6 text-center text-2xl font-medium text-white">{service.title}</h3>

                <button
                  onClick={() => toggleDetails(service.id)}
                  className="mt-auto self-center rounded border border-white/70 px-6 py-3 text-sm text-white transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                  aria-expanded={expandedId === service.id}
                  aria-controls={`details-${service.id}`}
                >
                  {expandedId === service.id ? "Скрыть" : "Подробнее"}
                </button>

                <motion.div
                  id={`details-${service.id}`}
                  className="mt-4 overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedId === service.id ? "auto" : 0,
                    opacity: expandedId === service.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ul className="py-4">
                    {service.details.map((detail, i) => (
                      <li key={i} className="relative pl-6 py-2 text-gray-300 text-sm">
                        <span className="absolute left-0 top-2.5 text-white">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
