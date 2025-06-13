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
import { Send, X, MessageCircle } from 'lucide-react';
import { StyledInput } from '@shared/ui';
import { cn } from '@shared/lib';
import './ChatSection.css';
import { Button } from '@shared/ui';
import { Card } from '@shared/ui';
import { ScrollArea } from '@shared/ui';
import { sendMessage, ApiMessage } from '../api/sendMessage';
import eventBus from '../model/eventBus';

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

// Typewriter animation component
const TypewriterText = ({ text, speed = 30, onComplete }: { text: string; speed?: number; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);

        // Прокручиваем каждые 50 символов для длинных сообщений
        if (currentIndex > 0 && currentIndex % 50 === 0) {
          setTimeout(() => {
            const messagesContainer = document.querySelector('.chat-modal-messages');
            if (messagesContainer) {
              messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
          }, 50);
        }
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentIndex === text.length && onComplete) {
      // Вызываем callback когда печать завершена
      const timer = setTimeout(() => {
        onComplete();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed, onComplete]);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  return <span>{displayedText}</span>;
};

export default function ChatSection() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);

  // Smooth scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  }, []);

  // Auto scroll when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        scrollToBottom();
      }, 200); // Increased delay to ensure content is rendered
      return () => clearTimeout(timer);
    }
  }, [messages, scrollToBottom]);

  const processAndSendMessage = useCallback(
    async (text: string) => {
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
          // Добавляем ответ от бота с typewriter эффектом
          const botMessage: Message = {
            id: `bot-${Date.now()}`,
            text: response.message.content,
            sender: 'bot',
          };

          setTypingMessageId(botMessage.id);
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        } else {
          // В случае проблем с API
          const errorMessage: Message = {
            id: `bot-${Date.now()}`,
            text: 'Извините, возникла ошибка при обработке запроса. Пожалуйста, попробуйте ещё раз или обратитесь в поддержку.',
            sender: 'bot',
          };

          setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
      } catch (error) {
        console.error('Error sending message:', error);

        const errorMessage: Message = {
          id: `bot-${Date.now()}`,
          text: 'Произошла ошибка связи с сервером. Пожалуйста, проверьте интернет-соединение и попробуйте снова.',
          sender: 'bot',
        };

        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    },
    [messages, isChatOpen]
  );

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

    eventBus.on('send_message', handleQuickQuestion);

    return () => {
      eventBus.off('send_message', handleQuickQuestion);
    };
  }, [processAndSendMessage]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isChatOpen) {
        setIsChatOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isChatOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isChatOpen]);

  return (
    <ChatContext.Provider value={{ processAndSendMessage }}>
      <section className="mx-auto w-full max-w-4xl" aria-label="Чат с ИИ-ассистентом">
        {/* Chat trigger input */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <StyledInput
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
              placeholder="Задайте вопрос ИИ-ассистенту..."
              onFocus={() => setIsChatOpen(true)}
              label="Сообщение"
              aria-label="Введите ваше сообщение для открытия чата"
            />
          </div>
        </div>

        {/* Modal overlay */}
        {isChatOpen && (
          <div
            className="chat-modal-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsChatOpen(false);
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-modal-title"
          >
            <Card className="chat-modal-content">
              {/* Modal header */}
              <div className="chat-modal-header">
                <h2 id="chat-modal-title" className="text-lg font-semibold text-white">
                  ИИ Ассистент
                </h2>
                <Button
                  onClick={() => setIsChatOpen(false)}
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                  aria-label="Закрыть чат"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Quick question buttons inside modal */}
              <div className="border-b border-neutral-800 p-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button
                    onClick={() => processAndSendMessage('Чем занимается компания?')}
                    variant="outline"
                    size="sm"
                    className="text-xs bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
                  >
                    Чем занимается компания?
                  </Button>
                  <Button
                    onClick={() => processAndSendMessage('Подробнее об услугах компании')}
                    variant="outline"
                    size="sm"
                    className="text-xs bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
                  >
                    Подробнее об услугах компании
                  </Button>
                  <Button
                    onClick={() => processAndSendMessage('Как связаться с менеджером?')}
                    variant="outline"
                    size="sm"
                    className="text-xs bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
                  >
                    Как связаться с менеджером?
                  </Button>
                </div>
              </div>

              {/* Messages area */}
              <ScrollArea
                className="chat-modal-messages"
                role="log"
                aria-live="polite"
                aria-label="История сообщений"
              >
                <div className="space-y-4 p-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      role="article"
                      aria-label={`Сообщение от ${msg.sender === 'user' ? 'пользователя' : 'ассистента'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-neutral-800 text-white'
                          }`}
                      >
                        {msg.sender === 'bot' && typingMessageId === msg.id ? (
                          <TypewriterText
                            text={msg.text}
                            onComplete={() => {
                              setTimeout(() => {
                                scrollToBottom();
                              }, 100);
                            }}
                          />
                        ) : (
                          msg.text
                        )}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start" aria-live="polite" aria-label="Ассистент печатает">
                      <div className="rounded-lg bg-neutral-800 px-4 py-2 text-white">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" aria-hidden="true"></div>
                          <div
                            className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                            style={{ animationDelay: '0.2s' }}
                            aria-hidden="true"
                          ></div>
                          <div
                            className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                            style={{ animationDelay: '0.4s' }}
                            aria-hidden="true"
                          ></div>
                        </div>
                        <span className="sr-only">Ассистент печатает ответ</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input area */}
              <div className="chat-modal-input">
                <form
                  onSubmit={handleFormSubmit}
                  className="flex w-full items-center gap-2"
                  aria-label="Отправка сообщения"
                >
                  <div className="flex-grow">
                    <StyledInput
                      value={inputValue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setInputValue(e.target.value)
                      }
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
                      label="Сообщение"
                      aria-label="Введите ваше сообщение"
                      aria-describedby="chat-input-help"
                      className="w-full"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="outline"
                    size="icon"
                    disabled={!inputValue.trim()}
                    className="shrink-0 h-10 w-10 rounded-lg border-none bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all duration-300 ease-in-out hover:from-blue-500 hover:to-purple-500 hover:text-white focus-visible:ring-white"
                    aria-label="Отправить сообщение"
                  >
                    <Send className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </form>
              </div>

              {/* Scroll to bottom button */}
              <Button
                onClick={scrollToBottom}
                className="chat-scroll-button"
                variant="ghost"
                size="icon"
                aria-label="Прокрутить к последнему сообщению"
              >
                ↓
              </Button>
            </Card>
          </div>
        )}
      </section>
    </ChatContext.Provider>
  );
}

// Hook to use the chat context
export const useChatContext = () => useContext(ChatContext);
