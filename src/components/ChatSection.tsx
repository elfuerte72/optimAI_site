'use client';

import { useState, FormEvent } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import './ChatSection.css';
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
    <section className="w-full max-w-4xl mx-auto">
      <Card className="bg-black border-neutral-800 overflow-hidden">
        {isChatOpen && (
          <ScrollArea className="flex-grow h-96 p-4 sm:p-6 border-b border-neutral-800">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`px-4 py-3 rounded-2xl ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-200'}`}
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

        {/* Форма отправки */}
        <div className="p-4 sm:p-6 bg-black">
          <form onSubmit={handleFormSubmit} className="flex w-full items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (inputValue.trim()) {
                    processAndSendMessage(inputValue);
                    setInputValue('');
                  }
                }
              }}
              placeholder={isChatOpen ? "Спросите что-нибудь..." : "Начните диалог"}
              style={{ outline: 'none', boxShadow: 'none' }}
              className={cn(
                "chat-input",
                "flex-grow h-9 w-full px-3 py-1 text-base",
                "bg-neutral-800 text-white border-neutral-800 rounded-lg", 
                "placeholder-neutral-500",
                "outline-none focus:outline-none focus-visible:outline-none",
                "border border-neutral-800 focus:border-neutral-800 hover:border-neutral-800",
                "shadow-none focus:shadow-none",
                "ring-0 focus:ring-0 focus-visible:ring-0 ring-offset-0 focus:ring-offset-0 focus-visible:ring-offset-0"
              )}
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
      </Card>
    </section>
  );
}
