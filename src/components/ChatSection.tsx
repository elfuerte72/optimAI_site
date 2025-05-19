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
    'Чем занимается компания?',
    'Как связаться с менеджером?',
    'Подробней об услугах компании',
  ];

  return (
    <motion.section
      className="w-full py-16 md:py-24 bg-black text-white flex flex-col items-center justify-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Adjusted viewport amount
      variants={sectionVariants}
    >
      <motion.div
        className="w-full max-w-2xl flex flex-col bg-black rounded-lg shadow-xl overflow-hidden"
        variants={chatContainerVariants}
        initial="collapsed"
        animate={isChatOpen ? 'expanded' : 'collapsed'}
      >
        {/* Content visible in both collapsed and expanded states */} 
        <div className="p-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-white mb-6">
            Спроси помощника
          </h2>

          {/* Input Form */} 
          <form
            onSubmit={handleFormSubmit}
            className="flex items-center bg-neutral-900 rounded-lg p-1 shadow-md mb-4"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Задайте мне интересующий вас вопрос..."
              className="flex-grow p-3 bg-transparent text-white focus:outline-none placeholder-slate-400"
            />
            <button
              type="submit"
              className="p-2 sm:p-3 bg-transparent hover:bg-slate-700 rounded-md transition-colors duration-200 focus:outline-none disabled:opacity-50"
              disabled={!inputValue.trim() && messages.length === 0} // Allow opening with empty input if chat is new
            >
              <PaperAirplaneIcon className="w-5 h-5 sm:w-6 sm:h-6 text-sky-500" />
            </button>
          </form>

          {/* Suggestion Buttons - only show if chat is not open or no messages yet */} 
          {(!isChatOpen || messages.length === 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
