'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';

// Типы сообщений
type Message = {
  id: string;
  text: string;
  isBot: boolean;
};

// Компонент чата с ИИ
const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Скролл к последнему сообщению при добавлении нового
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Автоматическая регулировка высоты текстового поля
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = '24px';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 150)}px`;
    }
  }, [inputValue]);

  // Обработка отправки сообщения
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Добавляем сообщение пользователя
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowChat(true);
    
    // Имитация ответа от бота (в реальном проекте здесь будет запрос к API)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Спасибо за ваше сообщение! В полной версии здесь будет ответ от ИИ на ваш запрос: "${userMessage.text}"`,
        isBot: true,
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      
      // Фокус на поле ввода после ответа
      inputRef.current?.focus();
    }, 1000);
  };

  // Регулировка высоты textarea при нажатии Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim()) {
        handleSendMessage(e as unknown as React.FormEvent);
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-black flex flex-col rounded-lg overflow-hidden">
      {/* Область сообщений и чата */}
      <div className="flex-grow">
        {!showChat ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center px-4 pt-28"
          >
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-4xl text-white font-bold mb-4 text-center"
            >
              Чем я могу помочь?
            </motion.h2>
            
            {/* Форма ввода сразу после заголовка */}
            <div className="w-full max-w-2xl mt-2">
              <form onSubmit={handleSendMessage} className="relative bg-gray-900 rounded-xl shadow-lg border border-gray-800">
                <div className="px-3 py-2 flex items-end">
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Спросите что-нибудь..."
                    className="flex-1 bg-transparent border-0 resize-none focus:ring-0 focus:outline-none text-white py-1 px-2 max-h-[150px] overflow-y-auto"
                    disabled={isLoading}
                    style={{ height: '24px' }}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className={`p-1 rounded-md ${inputValue.trim() ? 'text-white bg-gradient-to-r from-cyan-500 to-purple-500' : 'text-gray-400'}`}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          <div className="h-[500px] overflow-y-auto py-4 px-6 bg-black">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`py-5 ${message.isBot ? 'bg-black' : 'bg-gray-950 border-t border-b border-gray-800'}`}
                >
                  <div className="max-w-3xl mx-auto flex">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${message.isBot ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-gray-700'}`}>
                      {message.isBot ? 'A' : 'В'}
                    </div>
                    <div className="flex-1">
                      <p className="text-white">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-5 bg-black"
                >
                  <div className="max-w-3xl mx-auto flex">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mr-4">
                      A
                    </div>
                    <div className="flex space-x-2 items-center">
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-100"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-200"></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          </div>
        )}
      </div>
      
      {/* Форма отправки сообщения (показывается только в режиме чата) */}
      {showChat && (
        <div className="p-3 mt-auto bg-black">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSendMessage} className="relative bg-gray-900 rounded-xl shadow-lg border border-gray-800">
              <div className="px-3 py-2 flex items-end">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Спросите что-нибудь..."
                  className="flex-1 bg-transparent border-0 resize-none focus:ring-0 focus:outline-none text-white py-1 px-2 max-h-[150px] overflow-y-auto"
                  disabled={isLoading}
                  style={{ height: '24px' }}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className={`p-1 rounded-md ${inputValue.trim() ? 'text-white bg-gradient-to-r from-cyan-500 to-purple-500' : 'text-gray-400'}`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
