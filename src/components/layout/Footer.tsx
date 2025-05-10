'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Footer() {
  // Используем useState и useEffect для избежания несоответствия SSR и CSR
  const [currentYear, setCurrentYear] = useState(2024);
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  return (
    <footer className="bg-black py-12 mt-auto w-full">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Логотип и краткое описание */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="block mb-4">
              <Image 
                src="/images/logo-updated.png" 
                alt="OptimaAI Logo" 
                width={180} 
                height={60} 
                className="w-auto h-auto select-none"
                draggable="false"
                style={{ pointerEvents: 'none' }}
              />
            </Link>
            <p className="text-gray-400 text-sm">
              Ваш надежный партнер в мире искусственного интеллекта
            </p>
          </div>

          {/* Услуги */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4">Услуги</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Обучение
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Автоматизация
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Создание агентов
                </Link>
              </li>
            </ul>
          </div>

          {/* Компания */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4">Компания</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white transition-colors">
                  Новости
                </Link>
              </li>
              <li>
                <Link href="/academy" className="text-gray-400 hover:text-white transition-colors">
                  Академия
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты и соцсети */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <a href="mailto:optimaai@yandex.ru" className="hover:text-white transition-colors">
                optimaai@yandex.ru
                </a>
              </li>
              <li className="text-gray-400">
                <a href="tel:+79957728193" className="hover:text-white transition-colors">
                +79957728193
                </a>
              </li>
            </ul>
            <div className="mt-6 flex space-x-4">
              <a href="https://t.me/optimaai_tg" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12S5.373 24 12 24 24 18.627 24 12 18.627 0 12 0Zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394a.754.754 0 0 1-.6.3l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L8.32 13.617l-2.96-.924c-.64-.202-.653-.64.135-.954l11.566-4.46c.538-.196 1.006.128.832.941Z" />
                </svg>
              </a>
              <a href="https://vk.com/club230289399?from=groups" target="_blank" rel="noopener noreferrer" aria-label="VKontakte" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.596-.19 1.365 1.26 2.182 1.818.616.422 1.084.33 1.084.33l2.17-.03s1.137-.071.598-.964c-.044-.073-.314-.661-1.618-1.869-1.366-1.267-1.182-1.062.462-3.253.999-1.333 1.398-2.146 1.273-2.496-.12-.331-.855-.244-.855-.244l-2.442.015s-.181-.025-.315.055c-.132.078-.216.26-.216.26s-.387 1.028-.903 1.9c-1.088 1.85-1.52 1.95-1.696 1.835-.413-.267-.31-1.075-.31-1.648 0-1.793.273-2.54-.531-2.733-.267-.065-.463-.107-1.146-.115-.874-.007-1.615.003-2.033.208-.279.135-.493.44-.363.457.162.022.528.099.722.363.252.341.243 1.105.243 1.105s.145 2.102-.337 2.362c-.33.18-.783-.187-1.755-1.866-.498-.859-.874-1.81-.874-1.81s-.072-.176-.201-.272c-.156-.115-.375-.152-.375-.152l-2.322.015s-.347.01-.475.161c-.112.134-.01.412-.01.412s1.826 4.272 3.895 6.423c1.899 1.976 4.054 1.845 4.054 1.845l1.327-.02Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Разделитель */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Нижняя часть футера */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div className="mb-4 md:mb-0">
            &copy; {currentYear} OptimaAI. Все права защищены.
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 