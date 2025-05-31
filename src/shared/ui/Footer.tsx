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
    <footer className="mt-auto w-full bg-black py-12">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Логотип и краткое описание */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="mb-4 block">
              <Image
                src="/images/logo-updated.png"
                alt="OptimaAI Logo"
                width={150}
                height={50}
                className="pointer-events-none h-8 w-auto select-none"
                draggable="false"
                priority
              />
            </Link>
            <p className="text-sm text-gray-400">
              Ваш надежный партнер в мире искусственного интеллекта
            </p>
          </div>

          {/* Контакты и соцсети */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="mb-4 font-medium text-white">Контакты</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <a href="mailto:optimaai@yandex.ru" className="transition-colors hover:text-white">
                  optimaai@yandex.ru
                </a>
              </li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a
                href="https://t.me/optimaai_tg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12S5.373 24 12 24 24 18.627 24 12 18.627 0 12 0Zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394a.754.754 0 0 1-.6.3l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L8.32 13.617l-2.96-.924c-.64-.202-.653-.64.135-.954l11.566-4.46c.538-.196 1.006.128.832.941Z" />
                </svg>
              </a>
              <a
                href="https://vk.com/club230289399?from=groups"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VKontakte"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.596-.19 1.365 1.26 2.182 1.818.616.422 1.084.33 1.084.33l2.17-.03s1.137-.071.598-.964c-.044-.073-.314-.661-1.618-1.869-1.366-1.267-1.182-1.062.462-3.253.999-1.333 1.398-2.146 1.273-2.496-.12-.331-.855-.244-.855-.244l-2.442.015s-.181-.025-.315.055c-.132.078-.216.26-.216.26s-.387 1.028-.903 1.9c-1.088 1.85-1.52 1.95-1.696 1.835-.413-.267-.31-1.075-.31-1.648 0-1.793.273-2.54-.531-2.733-.267-.065-.463-.107-1.146-.115-.874-.007-1.615.003-2.033.208-.279.135-.493.44-.363.457.162.022.528.099.722.363.252.341.243 1.105.243 1.105s.145 2.102-.337 2.362c-.33.18-.783-.187-1.755-1.866-.498-.859-.874-1.81-.874-1.81s-.072-.176-.201-.272c-.156-.115-.375-.152-.375-.152l-2.322.015s-.347.01-.475.161c-.112.134-.01.412-.01.412s1.826 4.272 3.895 6.423c1.899 1.976 4.054 1.845 4.054 1.845l1.327-.02Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Навигация */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="mb-4 font-medium text-white">Навигация</h3>
            <div className="flex space-x-6">
              <Link href="/" className="text-gray-400 transition-colors hover:text-white">
                Главная
              </Link>
              <Link href="/services" className="text-gray-400 transition-colors hover:text-white">
                Услуги
              </Link>
              <Link href="/about" className="text-gray-400 transition-colors hover:text-white">
                О нас
              </Link>
            </div>
          </div>
        </div>

        {/* Разделитель */}
        <div className="my-8 border-t border-gray-800"></div>

        {/* Нижняя часть футера */}
        <div className="flex flex-col items-center justify-between text-sm text-gray-400 md:flex-row">
          <div className="mb-4 md:mb-0">&copy; {currentYear} OptimaAI. Все права защищены.</div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
