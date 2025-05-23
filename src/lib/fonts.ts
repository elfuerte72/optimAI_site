// Используем системный шрифт по умолчанию
import { GeistSans } from 'geist/font/sans';
import { Noto_Sans_JP } from 'next/font/google'; // Добавляем импорт Noto Sans JP

export const fontSans = GeistSans;

// Настраиваем Noto Sans Japanese
export const notoSansJP = Noto_Sans_JP({
  subsets: ['cyrillic', 'latin', 'latin-ext'], // Изменено: используем доступные и релевантные подмножества
  weight: ['400', '700'],        // Указываем нужные начертания (например, regular и bold)
  display: 'swap',               // Стратегия отображения шрифта
  variable: '--font-noto-sans-jp' // CSS переменная (опционально, но полезно)
});
