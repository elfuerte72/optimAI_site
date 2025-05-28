"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Noto_Sans_JP } from "next/font/google"

const notoSansJapanese = Noto_Sans_JP({ subsets: ['latin'] })

const values = [
  {
    id: "flexibility",
    title: "Гибкость",
    subtitle: "Умение адаптироваться",
    content: "Гибкость — подстраиваемся под задачу клиента.",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: "openness",
    title: "Открытость",
    subtitle: "Делиться знаниями и опытом",
    content: "Открытость — делимся знаниями и кодом.",
    color: "from-green-400 to-green-600",
  },
  {
    id: "innovation",
    title: "Инновации",
    subtitle: "Держать руку на пульсе технологических изменений в мире",
    content: "Движение — всегда держим руку на пульсе технологий.",
    color: "from-purple-400 to-purple-600",
  },
]

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

export function BookCards() {
  const [currentPage, setCurrentPage] = useState(0)
  const bookRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pageRefs = useRef<(HTMLDivElement | null)[]>([])

  // Эффект для анимации переворачивания страниц
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
  
  // Эффект для анимации скроллинга
  useEffect(() => {
    if (!containerRef.current || !bookRef.current) return
    
    // Начальное состояние - невидимый и смещенный вниз
    gsap.set(containerRef.current, {
      opacity: 0,
      y: 50,
    })
    
    // Создаем анимацию скроллинга
    const scrollAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // Начинаем анимацию, когда верх элемента достигает 80% высоты экрана
        end: "bottom 20%",
        toggleActions: "play none none reverse", // play при входе, reverse при выходе
        markers: false, // Для отладки можно установить true
      }
    })
    
    // Анимация появления
    scrollAnimation.to(containerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    
    // Анимация книги с небольшой задержкой
    scrollAnimation.from(bookRef.current, {
      scale: 0.95,
      opacity: 0.9,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.4")
    
    // Очистка при размонтировании
    return () => {
      if (scrollAnimation.scrollTrigger) {
        scrollAnimation.scrollTrigger.kill()
      }
      scrollAnimation.kill()
    }
  }, [])

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % values.length)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + values.length) % values.length)
  }

  return (
    <div ref={containerRef} className="flex flex-col items-center max-w-2xl mx-auto mt-0">
      {/* Book Container */}
      <div ref={bookRef} className="relative w-full max-w-md h-64 perspective-1000" style={{ perspective: "1200px" }}>
        {values.map((value, index) => (
          <div
            key={value.id}
            ref={(el) => {
              pageRefs.current[index] = el
            }}
            className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-xl border border-[#FFFFFF25] p-5 shadow-2xl"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="h-full flex flex-col text-center">
              <div className="flex-1 flex flex-col justify-center">
                <h3
                  className={`text-xl font-semibold mb-2 bg-gradient-to-r ${value.color} bg-clip-text text-transparent`}
                >
                  {value.title}
                </h3>
                <p className="text-xs text-white mb-4 font-light italic">{value.subtitle}</p>
                <p className={`text-sm leading-relaxed text-white font-light ${notoSansJapanese.className}`}>{value.content}</p>
              </div>

              {/* Page number */}
              <div className="text-center text-xs text-[#FFFFFF70] mt-3">
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
          className="w-9 h-9 rounded-full bg-[#FFFFFF15] border border-[#FFFFFF25] flex items-center justify-center hover:bg-[#FFFFFF25] hover:scale-110 transition-all duration-300"
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
          className="w-9 h-9 rounded-full bg-[#FFFFFF15] border border-[#FFFFFF25] flex items-center justify-center hover:bg-[#FFFFFF25] hover:scale-110 transition-all duration-300"
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
