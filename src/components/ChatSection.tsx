'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ChatSection() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const processAndSendMessage = (text: string) => {
    if (text.trim() === '') return;

    let newMessagesBatch: Message[] = [];

    if (!isChatOpen) {
      setIsChatOpen(true); // Trigger expansion
      newMessagesBatch.push({
        id: 'initial-bot-message',
        text: 'Здравствуйте! Чем могу помочь сегодня?',
        sender: 'bot',
      });
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text,
      sender: 'user',
    };
    newMessagesBatch.push(userMessage);

    const botResponse: Message = {
      id: `bot-${Date.now()}`,
      text: `Вы сказали: "${text}". Я пока простое демо, но скоро стану умнее!`,
      sender: 'bot',
    };
    newMessagesBatch.push(botResponse);

    setMessages((prevMessages) => [...prevMessages, ...newMessagesBatch]);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    processAndSendMessage(inputValue);
    setInputValue('');
  };

  const handleSuggestionClick = (suggestionText: string) => {
    processAndSendMessage(suggestionText);
  };

  const chatContainerVariants = {
    collapsed: {
      height: 'auto',
      opacity: 1,
    },
    expanded: {
      height: '70vh',
      minHeight: '500px',
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  };

  const suggestionButtons = [
    'Чем занимается ваша компания OptimAI?',
    'Какие услуги предоставляет OptimAI?',
    'Расскажите подробнее о внедрении ИИ в бизнес-процессы.',
  ];

  return (
    <motion.section
      className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 bg-black" // <<< OTSTUPY IZMENENY ZDES'
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className={`max-w-3xl mx-auto bg-neutral-900 rounded-xl shadow-2xl flex flex-col transition-all duration-500 ease-in-out overflow-hidden ${isChatOpen ? 'border border-neutral-700' : 'border border-transparent'}`}
        variants={chatContainerVariants}
        initial="collapsed"
        animate={isChatOpen ? 'expanded' : 'collapsed'}
        layout // Enable layout animations for smooth height transition
      >
        {/* Input Area - always visible */} 
        <div className={`p-4 sm:p-6 ${isChatOpen && messages.length > 0 ? 'border-b border-neutral-700' : ''} bg-neutral-900`}>
          <form onSubmit={handleFormSubmit} className="flex items-center space-x-2 sm:space-x-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isChatOpen ? "Спросите что-нибудь..." : "Начните диалог или выберите подсказку..."}
              className="flex-grow px-3 py-2 sm:px-4 sm:py-3 bg-neutral-800 border border-neutral-700 text-neutral-200 placeholder-neutral-500 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors text-sm sm:text-base"
            />
            <button
              type="submit"
              className="p-2 sm:p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!inputValue.trim() && messages.length === 0} // Allow opening with empty input if chat is new
            >
              <PaperAirplaneIcon className="w-5 h-5 sm:w-6 sm:h-6 text-sky-500" />
            </button>
          </form>

          {/* Suggestion Buttons - only show if chat is not open or no messages yet */} 
          {(!isChatOpen || messages.length === 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
              {suggestionButtons.map((suggestion, index) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 transition-colors text-xs sm:text-sm ${ 
                    index === 2 ? 'sm:col-span-2' : ''
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Message Display Area - only when expanded and messages exist */} 
        {isChatOpen && messages.length > 0 && (
          <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-800 border-t border-neutral-700">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] sm:max-w-md lg:max-w-xl px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg shadow ${ 
                    msg.sender === 'user'
                      ? 'bg-neutral-700 text-white'
                      : 'bg-neutral-800 text-neutral-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.section>
  );
}
