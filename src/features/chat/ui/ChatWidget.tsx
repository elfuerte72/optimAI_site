'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { sendMessage, ApiMessage, checkApiHealth } from '../api/sendMessage';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatWidgetProps {
  initialMessage?: string;
  apiAvailable?: boolean;
}

export default function ChatWidget({
  initialMessage,
  apiAvailable: propApiAvailable,
}: ChatWidgetProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(propApiAvailable ?? null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  // Проверка доступности API при монтировании компонента
  useEffect(() => {
    if (apiAvailable === null) {
      checkApiHealth()
        .then((available) => {
          setApiAvailable(available);

          // Если API доступен и есть начальное сообщение, добавляем его как сообщение от бота
          if (available && initialMessage) {
            setMessages([
              {
                id: Date.now(),
                text: initialMessage,
                sender: 'bot',
                timestamp: new Date(),
              },
            ]);
          }
        })
        .catch(() => setApiAvailable(false));
    }
  }, [apiAvailable, initialMessage]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Если API недоступен, используем локальный ответ
      if (!apiAvailable) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              text: 'Извините, сервер бота в данный момент недоступен. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.',
              sender: 'bot',
              timestamp: new Date(),
            },
          ]);
          setIsLoading(false);
        }, 1000);
        return;
      }

      // Формируем историю сообщений для API
      const apiMessages: ApiMessage[] = messages
        .filter((msg) => msg.sender === 'user' || msg.sender === 'bot')
        .map((msg) => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
        }));

      // Добавляем текущее сообщение пользователя
      apiMessages.push({
        role: 'user',
        content: userMessage.text,
      });

      // Отправляем запрос к API
      const response = await sendMessage(apiMessages);

      // Добавляем ответ бота в чат
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: response.message.content,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      // Добавляем сообщение об ошибке
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: 'Произошла ошибка при получении ответа. Пожалуйста, попробуйте еще раз позже.',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const widgetVariants = {
    closed: { opacity: 0, y: 20, scale: 0.95 },
    open: { opacity: 1, y: 0, scale: 1 },
  };

  const fabVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 260, damping: 20, delay: 0.5 },
    },
  };

  return (
    <>
      {/* FAB Button */}
      <motion.button
        variants={fabVariants}
        initial="initial"
        animate="animate"
        onClick={toggleChat}
        className="focus:ring-opacity-50 fixed right-6 bottom-6 z-50 rounded-full bg-zinc-800 p-4 text-white shadow-xl transition-colors hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-500 focus:outline-none"
        aria-label={isOpen ? 'Закрыть чат' : 'Открыть чат'}
      >
        {isOpen ? (
          <XMarkIcon className="h-7 w-7" />
        ) : (
          <motion.div
            whileHover={{ scale: 1.15, rotate: 10 }}
            className="flex items-center justify-center"
          >
            {' '}
            {/* Added hover animation and centering */}
            <img
              src="/images/robot-svgrepo-com.svg"
              alt="Открыть чат"
              className="h-7 w-7 object-contain"
            />{' '}
            {/* New icon */}
          </motion.div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={widgetVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed right-6 bottom-24 z-40 flex h-[500px] w-80 flex-col overflow-hidden rounded-xl border border-zinc-700 bg-black shadow-2xl md:w-96"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 bg-black p-4">
              <h3 className="text-lg font-medium text-white">Поддержка OptimaAI</h3>
              <button
                onClick={toggleChat}
                className="text-zinc-400 transition-colors hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-black flex-grow space-y-3 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg p-3 shadow ${msg.sender === 'user'
                        ? 'rounded-br-none bg-zinc-700 text-white'
                        : 'rounded-bl-none bg-zinc-800 text-zinc-200'
                      }`}
                  >
                    <p className="text-sm leading-snug">{msg.text}</p>
                    <p className="mt-1.5 text-right text-xs opacity-60">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-zinc-800 bg-black p-3">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Напишите сообщение..."
                  className="flex-grow rounded-lg border border-zinc-700 bg-zinc-900 p-2.5 text-sm text-white placeholder-zinc-500 transition-colors outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="rounded-lg border-none bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 text-white transition-all duration-300 ease-in-out hover:from-blue-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={!inputValue.trim() || isLoading}
                >
                  {isLoading ? (
                    <svg
                      className="h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <PaperAirplaneIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
