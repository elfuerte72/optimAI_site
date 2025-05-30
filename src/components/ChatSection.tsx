'use client';

import { useState, FormEvent, useEffect, useRef, createContext, useContext } from 'react';
import { Send, Loader2 } from 'lucide-react';
import StyledInput from '@/components/StyledInput';
import { cn } from '@/lib/utils';
import './ChatSection.css';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { sendMessage, Message as ApiMessage, checkApiHealth } from '@/lib/api/chat-api';
import eventBus from '@/lib/eventBus';

// Create a context to expose the processAndSendMessage function
export const ChatContext = createContext<{
  processAndSendMessage: (text: string) => Promise<void>;
}>({ 
  processAndSendMessage: async () => {} 
});

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

// Удалены варианты анимаций, так как они вызывали ошибку

export default function ChatSection() {
  // Scroll reference for auto-scrolling when new messages come in
  const messagesEndRef = useRef<HTMLDivElement>(null);
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
          // Приветственное сообщение удалено по запросу пользователя
        })
        .catch(() => setApiAvailable(false));
    }
  }, [apiAvailable]);
  
  // Автоскроллинг удален по запросу пользователя

  const processAndSendMessage = async (text: string) => {
    if (text.trim() === '') return;

    // Автоматически открываем чат при отправке сообщения
    if (!isChatOpen) {
      setIsChatOpen(true);
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
          
          setMessages((prevMessages) => [...prevMessages, botResponse]);
          setIsTyping(false);
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
      
      if (response && response.message) {
        // Добавляем ответ от бота
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          text: response.message.content,
          sender: 'bot',
        };
        
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        // В случае проблем с API
        const errorMessage: Message = {
          id: `bot-${Date.now()}`,
          text: 'Извините, возникла ошибка при обработке запроса. Пожалуйста, попробуйте еще раз позже.',
          sender: 'bot',
        };
        
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: `bot-${Date.now()}`,
        text: 'Извините, возникла ошибка при отправке сообщения. Пожалуйста, проверьте ваше соединение и попробуйте снова.',
        sender: 'bot',
      };
      
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
      // Автоскроллинг после получения ответа удален по запросу пользователя
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    processAndSendMessage(inputValue);
    setInputValue('');
  };
  
  // Подписываемся на события отправки сообщений из кнопок
  useEffect(() => {
    const handleQuickQuestion = (question: string) => {
      console.log('Получено сообщение от кнопки:', question);
      processAndSendMessage(question);
    };
    
    // Подписываемся на события от Event Bus
    eventBus.on('send_message', handleQuickQuestion);
    
    // Отписываемся при уничтожении компонента
    return () => {
      eventBus.off('send_message', handleQuickQuestion);
    };
  }, [processAndSendMessage]);

  // Функция обработки клика по кнопкам удалена

  // Используем более сложные варианты анимации из общего набора выше

  // Удалены кнопки-подсказки

  return (
    <ChatContext.Provider value={{ processAndSendMessage }}>
      <section className="w-full max-w-4xl mx-auto">
        <Card className={cn(
          "mt-4 mb-8 mx-auto bg-black border-0 overflow-hidden rounded-xl shadow-lg",
          messages.length > 0 ? "chat-dialog-expanded" : "chat-dialog"
        )}>
          {isChatOpen && (
            <ScrollArea className={cn(
              "flex-grow p-4 sm:p-6 border-b border-neutral-800",
              messages.length > 0 ? "chat-scroll-area-expanded" : "chat-scroll-area"
            )}>
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
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          )}

          {/* Форма отправки */}
          <div className="p-4 sm:p-6 bg-black border-0">
            <form 
              onSubmit={(e: FormEvent) => {
                e.preventDefault();
                if (inputValue.trim()) {
                  processAndSendMessage(inputValue);
                  setInputValue('');
                }
              }}
              className="flex w-full items-center space-x-2 border-0"
            >
              <div className="flex-grow mr-2">
                <StyledInput 
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
                  label="Сообщение"
                />
              </div>
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
    </ChatContext.Provider>
  );
}

// Hook to use the chat context
export const useChatContext = () => useContext(ChatContext);
