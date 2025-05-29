'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import './ChatSection.css';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { sendMessage, Message as ApiMessage, checkApiHealth } from '@/lib/api/chat-api';

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
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null);
  // Удалена функция автоскроллинга по запросу пользователя
  
  // Проверка доступности API при монтировании компонента
  useEffect(() => {
    if (apiAvailable === null) {
      checkApiHealth()
        .then(available => {
          setApiAvailable(available);
          
          // Если API доступен, добавляем приветственное сообщение
          if (available) {
            setMessages([{
              id: `bot-${Date.now()}`,
              text: 'Привет! Я виртуальный помощник OptimaAI. Чем я могу вам помочь сегодня?',
              sender: 'bot'
            }]);
          }
        })
        .catch(() => setApiAvailable(false));
    }
  }, [apiAvailable]);
  
  // Удаляем автоскроллинг как запросил пользователь

  const processAndSendMessage = async (text: string) => {
    if (text.trim() === '') return;

    if (!isChatOpen) {
      setIsChatOpen(true); // Открываем чат, если он был закрыт
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text,
      sender: 'user',
    };
    
    // Добавляем сообщение пользователя
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    // Показываем индикатор набора текста
    setIsTyping(true);
    
    try {
      // Если API недоступен, используем локальный ответ
      if (!apiAvailable) {
        setTimeout(() => {
          const botResponse: Message = {
            id: `bot-${Date.now()}`,
            text: 'Извините, сервер бота в данный момент недоступен. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.',
            sender: 'bot',
          };
          
          setIsTyping(false);
          setMessages((prevMessages) => [...prevMessages, botResponse]);
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
        content: text
      });

      // Отправляем запрос к API
      const response = await sendMessage(apiMessages);
      
      // Добавляем ответ бота в чат
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        text: response.message.content,
        sender: 'bot',
      };
      
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      // Добавляем сообщение об ошибке
      const errorMessage: Message = {
        id: `bot-${Date.now()}`,
        text: 'Произошла ошибка при получении ответа. Пожалуйста, попробуйте еще раз позже.',
        sender: 'bot',
      };
      
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
      // Автоскроллинг удален
    }
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-white'}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-lg px-4 py-2 bg-neutral-800 text-white">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              {/* Ссылка на последний элемент удалена */}
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
              className="border-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white hover:text-white focus-visible:ring-white shrink-0 rounded-lg transition-all duration-300 ease-in-out"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </Card>
    </section>
  );
}
