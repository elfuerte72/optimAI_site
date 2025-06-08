'use client';

import {
  useState,
  FormEvent,
  useEffect,
  useRef,
  createContext,
  useContext,
  useCallback,
} from 'react';
import { Send, ArrowUp } from 'lucide-react';
import { StyledInput } from '@shared/ui';
import { cn } from '@shared/lib';
import './ChatSection.css';
import { Button } from '@shared/ui';
import { Card } from '@shared/ui';
import { ScrollArea } from '@shared/ui';
import { sendMessage, ApiMessage } from '../api/sendMessage';
import eventBus from '../model/eventBus';
import gsap from 'gsap';
import { ChatMessage } from './components';

// Create a context to expose the processAndSendMessage function
export const ChatContext = createContext<{
  processAndSendMessage: (text: string) => Promise<void>;
}>({
  processAndSendMessage: async () => { },
});

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

// Стили для анимации с помощью GSAP
const animationConfig = {
  duration: 0.7, // Увеличено для более плавной анимации
  ease: 'power2.inOut',
};

export default function ChatSection() {
  // Scroll reference for auto-scrolling when new messages come in
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatCardRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputFieldRef = useRef<HTMLDivElement>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [_apiAvailable, _setApiAvailable] = useState<boolean | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Функция для анимации открытия/закрытия чата
  const animateChatWindow = useCallback((expand: boolean) => {
    if (!chatCardRef.current) return;

    if (expand) {
      // Анимация расширения окна
      gsap.to(chatCardRef.current, {
        maxHeight: '75vh',
        border: '1px solid #3b82f6',
        boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)',
        ...animationConfig
      });

      if (scrollAreaRef.current) {
        gsap.to(scrollAreaRef.current, {
          maxHeight: '60vh',
          ...animationConfig
        });
      }
    } else {
      // Анимация уменьшения окна
      gsap.to(chatCardRef.current, {
        maxHeight: '45vh',
        border: '1px solid #1f2937',
        boxShadow: '0 0 10px rgba(31, 41, 55, 0.2)',
        ...animationConfig
      });

      if (scrollAreaRef.current) {
        gsap.to(scrollAreaRef.current, {
          maxHeight: '30vh',
          ...animationConfig
        });
      }
    }

    setIsExpanded(expand);
  }, []);

  // Улучшенная функция автоскроллинга, которая остается в пределах чата
  const scrollToBottom = useCallback(() => {
    // Предотвращаем множественное срабатывание
    if (isScrolling) return;

    setIsScrolling(true);

    if (chatContainerRef.current && messagesEndRef.current) {
      // Используем GSAP для плавного скроллинга внутри контейнера
      gsap.to(chatContainerRef.current, {
        scrollTop: messagesEndRef.current.offsetTop,
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => {
          // Снимаем блокировку скроллинга
          setTimeout(() => setIsScrolling(false), 100);
        }
      });
    } else {
      setIsScrolling(false);
    }
  }, [isScrolling]);

  // Отслеживание добавления новых сообщений для автоскроллинга
  useEffect(() => {
    if (messages.length > 0 && !isScrolling) {
      // Небольшая задержка, чтобы DOM успел обновиться
      const timeoutId = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [messages, isTyping, scrollToBottom, isScrolling]);

  // Отслеживание скролла для показа кнопки "наверх"
  const handleScroll = useCallback(() => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      // Показываем кнопку, если пользователь прокрутил содержимое вверх
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 150;
      setShowScrollTop(!isNearBottom);
    }
  }, []);

  // Анимация поля ввода при фокусе
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    if (inputFieldRef.current) {
      gsap.to(inputFieldRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power1.out'
      });
    }
  }, []);

  // Анимация поля ввода при потере фокуса
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    // Если нет текста в поле ввода, уменьшаем его видимость
    if (inputValue.trim() === '' && inputFieldRef.current) {
      gsap.to(inputFieldRef.current, {
        opacity: 0.7,
        scale: 0.98,
        duration: 0.3,
        ease: 'power1.out'
      });
    }
  }, [inputValue]);

  // Инициализация скрытия поля ввода
  useEffect(() => {
    if (inputFieldRef.current && !isFocused && inputValue.trim() === '') {
      gsap.set(inputFieldRef.current, {
        opacity: 0.7,
        scale: 0.98
      });
    }
  }, [isFocused, inputValue]);

  const processAndSendMessage = useCallback(
    async (text: string) => {
      if (text.trim() === '') return;

      // Автоматически открываем чат при отправке сообщения
      if (!isChatOpen) {
        setIsChatOpen(true);
      }

      // Уменьшаем диалоговое окно при отправке сообщения
      animateChatWindow(false);

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
        // Формируем историю сообщений для API
        const apiMessages: ApiMessage[] = messages
          .filter((msg) => msg.sender === 'user' || msg.sender === 'bot')
          .map((msg) => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text,
          }));

        // Добавляем текущее сообщение пользователя
        apiMessages.push({
          role: 'user',
          content: text,
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

          // Расширяем окно после получения ответа
          setTimeout(() => {
            animateChatWindow(true);
          }, 500);
        } else {
          // В случае проблем с API
          const errorMessage: Message = {
            id: `bot-${Date.now()}`,
            text: 'Извините, возникла ошибка при обработке запроса. Пожалуйста, попробуйте ещё раз или обратитесь в поддержку.',
            sender: 'bot',
          };

          setMessages((prevMessages) => [...prevMessages, errorMessage]);

          // Расширяем окно после получения ответа
          setTimeout(() => {
            animateChatWindow(true);
          }, 500);
        }
      } catch (error) {
        console.error('Error sending message:', error);

        const errorMessage: Message = {
          id: `bot-${Date.now()}`,
          text: 'Произошла ошибка связи с сервером. Пожалуйста, проверьте интернет-соединение и попробуйте снова.',
          sender: 'bot',
        };

        setMessages((prevMessages) => [...prevMessages, errorMessage]);

        // Расширяем окно после получения ответа об ошибке
        setTimeout(() => {
          animateChatWindow(true);
        }, 500);
      } finally {
        setIsTyping(false);
      }
    },
    [messages, isChatOpen, animateChatWindow]
  );

  const _handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
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

  // Инициализация стилей чата при первом рендере
  useEffect(() => {
    if (chatCardRef.current) {
      gsap.set(chatCardRef.current, {
        maxHeight: messages.length > 0 ? '75vh' : '45vh',
        border: messages.length > 0 ? '1px solid #3b82f6' : '1px solid transparent',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out'
      });
    }
  }, [messages.length]);

  return (
    <ChatContext.Provider value={{ processAndSendMessage }}>
      <section className="mx-auto w-full max-w-4xl chat-section" aria-label="Чат с ИИ-ассистентом">
        <Card
          className={cn(
            'mx-auto mt-4 mb-8 overflow-hidden rounded-xl bg-black shadow-lg transition-all duration-300',
            isExpanded ? 'border-blue-500' : 'border-gray-800',
            messages.length > 0 ? 'chat-dialog-expanded' : 'chat-dialog'
          )}
          role="region"
          aria-label="Область чата"
          ref={chatCardRef}
        >
          {isChatOpen && (
            <ScrollArea
              className={cn(
                'flex-grow border-b border-neutral-800 transition-all duration-300 p-3 sm:p-4 chat-scroll-container',
                messages.length > 0 ? 'chat-scroll-area-expanded' : 'chat-scroll-area'
              )}
              role="log"
              aria-live="polite"
              aria-label="История сообщений"
              ref={scrollAreaRef}
            >
              <div
                className="flex-1 space-y-4 overflow-y-auto p-2 md:p-4 messages-container"
                ref={chatContainerRef}
                onScroll={handleScroll}
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <ChatMessage
                      text={msg.text}
                      sender={msg.sender}
                    />
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start typing-indicator" aria-live="polite" aria-label="Ассистент печатает">
                    <div className="rounded-lg bg-neutral-800 border border-blue-500/30 px-4 py-2 text-white">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400" aria-hidden="true"></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
                          style={{ animationDelay: '0.2s' }}
                          aria-hidden="true"
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
                          style={{ animationDelay: '0.4s' }}
                          aria-hidden="true"
                        ></div>
                      </div>
                      <span className="sr-only">Ассистент печатает ответ</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} className="scroll-marker" />
              </div>

              {/* Кнопка для прокрутки к последнему сообщению */}
              {showScrollTop && (
                <Button
                  onClick={scrollToBottom}
                  variant="outline"
                  size="icon"
                  className="scroll-to-bottom-btn"
                  aria-label="Прокрутить к последнему сообщению"
                >
                  <ArrowUp className="h-4 w-4" aria-hidden="true" />
                </Button>
              )}
            </ScrollArea>
          )}

          {/* Форма отправки */}
          <div
            className="border-t border-neutral-800/30 bg-black p-3 sm:p-4 input-container"
            ref={inputFieldRef}
          >
            <form
              onSubmit={(e: FormEvent) => {
                e.preventDefault();
                if (inputValue.trim()) {
                  processAndSendMessage(inputValue);
                  setInputValue('');
                }
              }}
              className="flex w-full items-center space-x-2 border-0"
              aria-label="Отправка сообщения"
            >
              <div className="mr-2 flex-grow">
                <StyledInput
                  value={inputValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputValue(e.target.value)
                  }
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (inputValue.trim()) {
                        processAndSendMessage(inputValue);
                        setInputValue('');
                      }
                    }
                  }}
                  placeholder="Введите сообщение..."
                  aria-label="Введите ваше сообщение"
                  aria-describedby="chat-input-help"
                  className={cn(
                    "compact-input",
                    isExpanded ? "border-blue-500/50 focus:border-blue-500" : "",
                    isFocused ? "focused-input" : ""
                  )}
                />
                <div id="chat-input-help" className="sr-only">
                  Введите ваш вопрос и нажмите Enter или кнопку отправки
                </div>
              </div>
              <Button
                type="submit"
                variant="outline"
                size="icon"
                disabled={!inputValue.trim()}
                className="shrink-0 rounded-lg border-none bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all duration-300 ease-in-out hover:from-blue-500 hover:to-purple-500 hover:text-white focus-visible:ring-white send-button"
                aria-label="Отправить сообщение"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
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
