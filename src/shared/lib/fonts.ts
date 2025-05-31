// Используем системный шрифт по умолчанию
import { GeistSans } from 'geist/font/sans';
import { Noto_Sans_JP, Pacifico, Roboto_Condensed } from 'next/font/google';

export const fontSans = GeistSans;

// Настраиваем Noto Sans Japanese
export const notoSansJP = Noto_Sans_JP({
  subsets: ['cyrillic', 'latin', 'latin-ext'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

// Настраиваем Pacifico
export const pacificoFont = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-pacifico',
});

// Настраиваем Roboto Condensed
export const robotoCondensedFont = Roboto_Condensed({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-roboto-condensed',
});
