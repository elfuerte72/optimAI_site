'use client';

import { useState, FormEvent } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

// Удалены варианты анимаций, так как они вызывали ошибку

export default function ChatSection() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Удаляем автоскроллинг как запросил пользователь

  const processAndSendMessage = (text: string) => {
    if (text.trim() === '') return;

    if (!isChatOpen) {
      setIsChatOpen(true); // Trigger expansion
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text,
      sender: 'user',
    };
    
    // Add user message immediately
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        text: `Вы сказали: "${text}". Я пока простое демо, но скоро стану умнее!`,
        sender: 'bot',
      };
      
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1500); // Typing delay simulation
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    processAndSendMessage(inputValue);
    setInputValue('');
  };

  // Функция обработки клика по кнопкам удалена

  // Используем более сложные варианты анимации из общего набора выше

  // Удалены кнопки-подсказки

  return (
    <section className="max-w-2xl mx-auto w-full px-4 sm:px-6 mb-12 sm:mb-16">
      <Card className="border border-neutral-800 bg-black shadow-2xl overflow-hidden rounded-xl">
        <div 
          className="flex flex-col overflow-hidden chat-container"
          style={{ minHeight: '200px', height: isChatOpen ? '70vh' : 'auto' }}
        >
          {isChatOpen && (
            <ScrollArea className="flex-grow h-full p-1 border-b border-neutral-800">
              <div className="p-4 sm:p-6 space-y-5">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] sm:max-w-md lg:max-w-xl px-4 py-3 rounded-2xl ${message.sender === 'user' ? 'bg-neutral-700 text-white' : 'bg-neutral-800 text-white'}`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="px-4 py-3 rounded-2xl bg-neutral-800 text-neutral-200 flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 text-neutral-400 animate-spin" />
                      <span className="text-sm text-neutral-400">Печатает...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}

          {/* Отдельная карточка для формы отправки */}
          <div className="p-4 sm:p-6 bg-black border-b border-neutral-800">
            <form onSubmit={handleFormSubmit} className="flex w-full items-center space-x-2">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (inputValue.trim()) {
                      processAndSendMessage(inputValue);
                      setInputValue('');
                    }
                  }
                }}
                placeholder={isChatOpen ? "Спросите что-нибудь..." : "Начните диалог или выберите подсказку..."}
                className="flex-grow placeholder-neutral-500 text-white bg-neutral-800 border-neutral-800 focus-visible:ring-white focus-visible:border-white rounded-lg focus:border-white"
              />
              <Button
                type="submit"
                variant="outline"
                size="icon"
                disabled={!inputValue.trim()}
                className="border-neutral-800 bg-neutral-800 hover:bg-neutral-700 text-white hover:text-white focus-visible:ring-white shrink-0 rounded-lg"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
          
          {/* Кнопки-подсказки удалены */}
        </div>
      </Card>
    </section>
  );
}
