'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleOvalLeftEllipsisIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid'; // Иконки

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  useEffect(() => {
    // Приветственное сообщение от бота при первом открытии (если чат пуст)
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now(), 
          text: 'Здравствуйте! Чем могу помочь?', 
          sender: 'bot',
          timestamp: new Date() 
        }]);
      }, 500);
    }
  }, [isOpen]);


  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Мок-ответ от бота
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: 'Спасибо за ваше сообщение! Мы скоро свяжемся с вами.', 
        sender: 'bot',
        timestamp: new Date()
      }]);
    }, 1200);
  };
  
  const widgetVariants = {
    closed: { opacity: 0, y: 20, scale: 0.95 },
    open: { opacity: 1, y: 0, scale: 1 },
  };

  const fabVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 20, delay: 0.5 } },
  }

  return (
    <>
      {/* FAB Button */}
      <motion.button
        variants={fabVariants}
        initial="initial"
        animate="animate"
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-zinc-800 text-white p-4 rounded-full shadow-xl hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-opacity-50 transition-colors z-50"
        aria-label={isOpen ? 'Закрыть чат' : 'Открыть чат'}
      >
        {isOpen ? <XMarkIcon className="h-7 w-7" /> : <ChatBubbleOvalLeftEllipsisIcon className="h-7 w-7" />}
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
            className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-black border border-zinc-700 rounded-xl shadow-2xl flex flex-col overflow-hidden z-40"
          >
            {/* Header */}
            <div className="bg-black p-4 flex items-center justify-between border-b border-zinc-800">
              <h3 className="text-lg font-medium text-white">Поддержка OptimaAI</h3>
              <button onClick={toggleChat} className="text-zinc-400 hover:text-white transition-colors">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-grow p-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-black">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-lg shadow ${
                      msg.sender === 'user'
                        ? 'bg-zinc-700 text-white rounded-br-none'
                        : 'bg-zinc-800 text-zinc-200 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm leading-snug">{msg.text}</p>
                    <p className="text-xs opacity-60 mt-1.5 text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-black p-3 border-t border-zinc-800">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Напишите сообщение..."
                  className="flex-grow bg-zinc-900 text-white border border-zinc-700 rounded-lg p-2.5 focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500 outline-none transition-colors text-sm placeholder-zinc-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2.5 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={!inputValue.trim()}
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 