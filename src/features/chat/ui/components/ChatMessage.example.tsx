/**
 * Примеры использования компонента ChatMessage
 * Этот файл демонстрирует различные сценарии использования
 */

import React from 'react';
import { ChatMessage } from './ChatMessage';

export const ChatMessageExamples: React.FC = () => {
  const examples = [
    {
      title: 'Обычное сообщение без ссылок',
      text: 'Привет! Как дела? Это обычное сообщение.',
      sender: 'user' as const,
    },
    {
      title: 'Сообщение с одной ссылкой',
      text: 'Посетите наш сайт: https://example.com',
      sender: 'bot' as const,
    },
    {
      title: 'Telegram контакт менеджера',
      text: 'Contact manager: https://t.me/serg_scherbina',
      sender: 'bot' as const,
    },
    {
      title: 'Несколько ссылок в одном сообщении',
      text: 'Полезные ресурсы: https://google.com и https://github.com для разработки',
      sender: 'bot' as const,
    },
    {
      title: 'HTTP и HTTPS ссылки',
      text: 'HTTP: http://example.com и HTTPS: https://secure.example.com',
      sender: 'bot' as const,
    },
    {
      title: 'Ссылка с параметрами',
      text: 'Поиск: https://google.com/search?q=react+linkify&hl=ru',
      sender: 'bot' as const,
    },
    {
      title: 'Ссылка с фрагментом',
      text: 'Документация: https://reactjs.org/docs/getting-started.html#installation',
      sender: 'bot' as const,
    },
    {
      title: 'Длинное сообщение с ссылкой',
      text: 'Это очень длинное сообщение, которое содержит много текста и одну ссылку https://verylongdomainname.example.com/very/long/path/to/resource?with=many&query=parameters#and-fragment в середине текста.',
      sender: 'bot' as const,
    },
  ];

  return (
    <div className="space-y-6 p-6 bg-black min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-8">
        Примеры использования ChatMessage
      </h1>
      
      {examples.map((example, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-lg font-semibold text-blue-400">
            {example.title}
          </h3>
          <div className="bg-neutral-900 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">
              Исходный текст: "{example.text}"
            </p>
            <div className="flex justify-start">
              <ChatMessage
                text={example.text}
                sender={example.sender}
              />
            </div>
          </div>
        </div>
      ))}
      
      <div className="mt-8 p-4 bg-neutral-900 rounded-lg">
        <h3 className="text-lg font-semibold text-green-400 mb-2">
          Особенности компонента:
        </h3>
        <ul className="text-white space-y-1 text-sm">
          <li>✅ Автоматическое обнаружение HTTP/HTTPS ссылок</li>
          <li>✅ Безопасное открытие в новой вкладке (target="_blank", rel="noopener noreferrer")</li>
          <li>✅ Поддержка accessibility с ARIA-атрибутами</li>
          <li>✅ Fallback функциональность при недоступности react-linkify</li>
          <li>✅ Корректная обработка длинных URL с переносом строк</li>
          <li>✅ Поддержка множественных ссылок в одном сообщении</li>
          <li>✅ Стилизация с помощью Tailwind CSS</li>
        </ul>
      </div>
    </div>
  );
};

export default ChatMessageExamples;