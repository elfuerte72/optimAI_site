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
      // Initial bot message "Здравствуйте! Чем могу помочь сегодня?" is confirmed removed
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
    'Какие услуги вы предоставляете?',
    'Как я могу начать использовать ваши решения?',
  ];

  return (
    <motion.section
      className="max-w-2xl mx-auto w-full px-4 sm:px-6 mb-12 sm:mb-16"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <motion.div
        className="bg-neutral-900 rounded-lg shadow-2xl flex flex-col overflow-hidden chat-container"
        layout
        variants={chatContainerVariants}
        initial="collapsed"
        animate={isChatOpen ? 'expanded' : 'collapsed'}
      >
        {/* Message Display Area - MOVED HERE (ABOVE INPUT) */}
        {isChatOpen && messages.length > 0 && (
          <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-800 border-b border-neutral-700">
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

        {/* Input and Suggestions Area - NOW BELOW MESSAGES */}
        <div className="p-4 sm:p-6 bg-neutral-850 rounded-b-lg shadow-xl">
          <form onSubmit={handleFormSubmit} className="flex items-center space-x-2 sm:space-x-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleFormSubmit(e);
                }
              }}
              placeholder={isChatOpen ? "Спросите что-нибудь..." : "Начните диалог или выберите подсказку..."}
              className="flex-grow bg-neutral-800 border border-neutral-700 rounded-l-lg p-3 text-sm sm:text-base placeholder-neutral-500 text-neutral-200 focus:outline-none transition-all"
              rows={1} 
            />
            <button
              type="submit"
              className="p-3 rounded-r-lg bg-sky-600 hover:bg-sky-500 transition-colors disabled:bg-neutral-700 disabled:text-neutral-500 disabled:opacity-50"
              disabled={!inputValue.trim() && messages.length === 0}
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
      </motion.div>
    </motion.section>
  );
}
