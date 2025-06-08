'use client';

import React from 'react';
import Linkify from 'react-linkify';

interface ChatMessageProps {
  text: string;
  sender: 'user' | 'bot';
  className?: string;
}

/**
 * Компонент для отображения сообщения чата с автоматическим преобразованием URL в ссылки
 */
export const ChatMessage: React.FC<ChatMessageProps> = ({ text, sender, className = '' }) => {
  // Кастомный декоратор для ссылок
  const componentDecorator = (decoratedHref: string, decoratedText: string, key: number) => (
    <a
      key={key}
      href={decoratedHref}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
      aria-label={`Открыть ссылку ${decoratedText} в новой вкладке`}
    >
      {decoratedText}
    </a>
  );

  // Fallback функция для случаев, когда react-linkify недоступен
  const renderTextWithLinks = (inputText: string): React.ReactNode => {
    try {
      // Пытаемся использовать react-linkify
      return (
        <Linkify componentDecorator={componentDecorator}>
          {inputText}
        </Linkify>
      );
    } catch (error) {
      console.warn('react-linkify недоступен, используем fallback:', error);
      
      // Fallback: ручная обработка ссылок с помощью регулярных выражений
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const parts = inputText.split(urlRegex);
      
      return parts.map((part, index) => {
        if (urlRegex.test(part)) {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
              aria-label={`Открыть ссылку ${part} в новой вкладке`}
            >
              {part}
            </a>
          );
        }
        return part;
      });
    }
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