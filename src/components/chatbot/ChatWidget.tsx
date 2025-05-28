'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { sendMessage, Message as ApiMessage, checkApiHealth } from '@/lib/api/chat-api';

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

export default function ChatWidget({ initialMessage, apiAvailable: propApiAvailable }: ChatWidgetProps = {}) {
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
        .then(available => {
          setApiAvailable(available);
          
          // Если API доступен и есть начальное сообщение, добавляем его как сообщение от бота
          if (available && initialMessage) {
            setMessages([{
              id: Date.now(),
              text: initialMessage,
              sender: 'bot',
              timestamp: new Date()
            }]);
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
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Если API недоступен, используем локальный ответ
      if (!apiAvailable) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            id: Date.now() + 1, 
            text: 'Извините, сервер бота в данный момент недоступен. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.', 
            sender: 'bot',
            timestamp: new Date()
          }]);
          setIsLoading(false);
        }, 1000);
        return;
      }

      // Формируем историю сообщений для API
      const apiMessages: ApiMessage[] = messages
        .filter(msg => msg.sender === 'user' || msg.sender === 'bot')
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));
      
      // Добавляем текущее сообщение пользователя
      apiMessages.push({
        role: 'user',
        content: userMessage.text
      });

      // Отправляем запрос к API
      const response = await sendMessage(apiMessages);
      
      // Добавляем ответ бота в чат
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: response.message.content, 
        sender: 'bot',
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      // Добавляем сообщение об ошибке
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: 'Произошла ошибка при получении ответа. Пожалуйста, попробуйте еще раз позже.', 
        sender: 'bot',
        timestamp: new Date()
      }]);
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
        {isOpen ? <XMarkIcon className="h-7 w-7" /> : (
          <motion.div whileHover={{ scale: 1.15, rotate: 10 }} className="flex items-center justify-center"> {/* Added hover animation and centering */}
            <img src="/images/robot-svgrepo-com.svg" alt="Открыть чат" className="h-7 w-7 object-contain" /> {/* New icon */}
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
                  className="flex-grow bg-zinc-900 text-white border border-zinc-700 rounded-lg p-2.5 outline-none transition-colors text-sm placeholder-zinc-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2.5 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={!inputValue.trim() || isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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