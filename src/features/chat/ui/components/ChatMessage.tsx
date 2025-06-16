'use client';

import React from 'react';

interface ChatMessageProps {
  text: string;
  sender: 'user' | 'bot';
  className?: string;
}

/**
 * Компонент для отображения сообщения чата с автоматическим преобразованием URL в ссылки
 */
export const ChatMessage: React.FC<ChatMessageProps> = ({ text, sender, className = '' }) => {
  // Отладочная информация
  console.log('ChatMessage render:', { text, sender, hasLinks: /https?:\/\//.test(text) });
  
  // Улучшенная функция для обработки ссылок
  const renderTextWithLinks = (inputText: string): React.ReactNode => {
    // Расширенный регекс для различных типов ссылок
    const linkRegex = /(?:https?:\/\/|www\.|@https?:\/\/)?(?:[-\w.]+\.)?(?:t\.me|telegram\.me|twitter\.com|instagram\.com|facebook\.com|vk\.com|youtube\.com|github\.com|linkedin\.com|[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z]{2,}))(?:\/[^\s]*)?/gi;
    
    // Специальный регекс для Telegram ссылок
    const telegramRegex = /(?:@)?(https?:\/\/)?(?:www\.)?(t\.me|telegram\.me)\/([a-zA-Z0-9_]+)/gi;
    
    // Общий регекс для HTTP/HTTPS ссылок
    const httpRegex = /(https?:\/\/[^\s]+)/gi;
    
    let processedText = inputText;
    const links: Array<{ match: string; url: string; start: number; end: number }> = [];
    
    // Находим все ссылки
    let match;
    
    // Сначала обрабатываем Telegram ссылки
    const telegramMatches = [...inputText.matchAll(telegramRegex)];
    telegramMatches.forEach((match) => {
      const fullMatch = match[0];
      let url = fullMatch;
      
      // Если ссылка начинается с @, убираем @
      if (url.startsWith('@')) {
        url = url.substring(1);
      }
      
      // Добавляем https:// если его нет
      if (!url.startsWith('http')) {
        url = 'https://' + url;
      }
      
      links.push({
        match: fullMatch,
        url: url,
        start: match.index!,
        end: match.index! + fullMatch.length
      });
    });
    
    // Затем обрабатываем обычные HTTP ссылки
    const httpMatches = [...inputText.matchAll(httpRegex)];
    httpMatches.forEach((match) => {
      const fullMatch = match[0];
      const start = match.index!;
      const end = start + fullMatch.length;
      
      // Проверяем, не пересекается ли с уже найденными ссылками
      const overlaps = links.some(link => 
        (start >= link.start && start < link.end) || 
        (end > link.start && end <= link.end) ||
        (start <= link.start && end >= link.end)
      );
      
      if (!overlaps) {
        links.push({
          match: fullMatch,
          url: fullMatch,
          start: start,
          end: end
        });
      }
    });
    
    // Сортируем ссылки по позиции
    links.sort((a, b) => a.start - b.start);
    
    if (links.length === 0) {
      return inputText;
    }
    
    // Разбиваем текст на части и создаем элементы
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    
    links.forEach((link, index) => {
      // Добавляем текст перед ссылкой
      if (link.start > lastIndex) {
        parts.push(inputText.substring(lastIndex, link.start));
      }
      
      // Добавляем ссылку
      parts.push(
        <a
          key={`link-${index}`}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200 cursor-pointer"
          aria-label={`Открыть ссылку ${link.match} в новой вкладке`}
          onClick={(e) => {
            // Дополнительная обработка для Telegram ссылок
            if (link.url.includes('t.me') || link.url.includes('telegram.me')) {
              // Пытаемся открыть в Telegram приложении, если доступно
              const telegramAppUrl = link.url.replace('https://t.me/', 'tg://resolve?domain=');
              
              // Создаем временную ссылку для попытки открытия в приложении
              const tempLink = document.createElement('a');
              tempLink.href = telegramAppUrl;
              tempLink.style.display = 'none';
              document.body.appendChild(tempLink);
              
              try {
                tempLink.click();
                // Если приложение не открылось, откроется веб-версия
                setTimeout(() => {
                  if (document.body.contains(tempLink)) {
                    window.open(link.url, '_blank', 'noopener,noreferrer');
                  }
                }, 500);
              } catch (error) {
                // Если не удалось открыть в приложении, открываем в браузере
                window.open(link.url, '_blank', 'noopener,noreferrer');
              } finally {
                document.body.removeChild(tempLink);
              }
              
              e.preventDefault();
            }
          }}
        >
          {link.match}
        </a>
      );
      
      lastIndex = link.end;
    });
    
    // Добавляем оставшийся текст
    if (lastIndex < inputText.length) {
      parts.push(inputText.substring(lastIndex));
    }
    
    return parts;
  };

  return (
    <div
      className={`max-w-[85%] rounded-lg px-4 py-3 transition-all duration-300 message-bubble ${
        sender === 'user'
          ? 'bg-blue-600 text-white'
          : 'bg-neutral-800 text-white border border-blue-500/30'
      } ${className}`}
      role="article"
      aria-label={`Сообщение от ${sender === 'user' ? 'пользователя' : 'ассистента'}`}
    >
      <div className="break-words">
        {renderTextWithLinks(text)}
      </div>
    </div>
  );
};

export default ChatMessage;