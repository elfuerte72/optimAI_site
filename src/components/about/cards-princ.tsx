"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"

const values = [
  {
    id: "flexibility",
    title: "Гибкость",
    subtitle: "Умение адаптироваться",
    content:
      "Мы подстраиваемся под любую задачу клиента: быстро перестраиваем дорожную карту, меняем угол зрения и технологический стек по ходу проекта, интегрируемся в процессы без лишней бюрократии.",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: "openness",
    title: "Открытость",
    subtitle: "Делиться знаниями и опытом",
    content:
      "Делимся знаниями и кодом: публикуем полезные репозитории на GitHub, проводим открытые вебинары и митапы, честно рассказываем о факапах и находках. Прозрачная коммуникация — основа доверия.",
    color: "from-green-400 to-green-600",
  },
  {
    id: "innovation",
    title: "Инновации",
    subtitle: "Держать руку на пульсе технологических изменений в мире",
    content:
      "Всегда держим руку на пульсе технологий: тестируем ранние версии моделей, проводим внутренний R&D-спринт каждую неделю, экспериментируем, чтобы первым приносить клиентам свежие AI-возможности.",
    color: "from-purple-400 to-purple-600",
  },
]

export function BookCards() {
  const [currentPage, setCurrentPage] = useState(0)
  const bookRef = useRef<HTMLDivElement>(null)
  const pageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    // Enhanced page turn animation
    pageRefs.current.forEach((page, index) => {
      if (!page) return

      if (index === currentPage) {
        gsap.to(page, {
          opacity: 1,
          rotateY: 0,
          scale: 1,
          z: 0,
          duration: 0.8,
          ease: "power3.out",
        })
      } else {
        const direction = index < currentPage ? -1 : 1
        gsap.to(page, {
          opacity: 0,
          rotateY: direction * 90,
          scale: 0.9,
          z: -100,
          duration: 0.8,
          ease: "power3.out",
        })
      }
    })
  }, [currentPage])

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % values.length)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + values.length) % values.length)
  }

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto">
      {/* Book Container */}
      <div ref={bookRef} className="relative w-full max-w-md h-64 perspective-1000" style={{ perspective: "1200px" }}>
        {values.map((value, index) => (
          <div
            key={value.id}
            ref={(el) => {
              pageRefs.current[index] = el
            }}
            className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-xl border border-[#FFFFFF15] p-5 shadow-2xl backdrop-blur-sm"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="h-full flex flex-col text-center">
              <div className="flex-1 flex flex-col justify-center">
                <h3
                  className={`text-xl font-medium mb-2 bg-gradient-to-r ${value.color} bg-clip-text text-transparent`}
                >
                  {value.title}
                </h3>
                <p className="text-xs text-[#FFFFFF70] mb-4 font-light italic">{value.subtitle}</p>
                <p className="text-sm leading-relaxed text-[#F5F5F5] font-light">{value.content}</p>
              </div>

              {/* Page number */}
              <div className="text-center text-xs text-[#FFFFFF40] mt-3">
                {index + 1} / {values.length}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={prevPage}
          className="w-9 h-9 rounded-full bg-[#FFFFFF08] border border-[#FFFFFF15] flex items-center justify-center hover:bg-[#FFFFFF15] hover:scale-110 transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous page"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>

        {/* Page indicators */}
        <div className="flex gap-2">
          {values.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                index === currentPage
                  ? "bg-gradient-to-r from-blue-400 to-purple-500 scale-125 shadow-lg"
                  : "bg-[#FFFFFF25] hover:bg-[#FFFFFF40] hover:scale-110"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextPage}
          className="w-9 h-9 rounded-full bg-[#FFFFFF08] border border-[#FFFFFF15] flex items-center justify-center hover:bg-[#FFFFFF15] hover:scale-110 transition-all duration-300 backdrop-blur-sm"
          aria-label="Next page"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  )
}
