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
import { Send } from 'lucide-react';
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

// Удалены варианты анимаций, так как они вызывали ошибку

export default function ChatSection() {
  // Scroll reference for auto-scrolling when new messages come in
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [_apiAvailable, _setApiAvailable] = useState<boolean | null>(null);
  // Удалена функция автоскроллинга по запросу пользователя

  // Приветственное сообщение удалено по запросу пользователя

  // Автоскроллинг удален по запросу пользователя

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
        // Автоскроллинг после получения ответа удален по запросу пользователя
      }
    },
    [messages, isChatOpen]
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

  // Функция обработки клика по кнопкам удалена

  // Используем более сложные варианты анимации из общего набора выше

  // Удалены кнопки-подсказки

  return (
    <ChatContext.Provider value={{ processAndSendMessage }}>
      <section className="mx-auto w-full max-w-4xl" aria-label="Чат с ИИ-ассистентом">
        <Card
          className={cn(
            'mx-auto mt-4 mb-8 overflow-hidden rounded-xl border-0 bg-black shadow-lg',
            messages.length > 0 ? 'chat-dialog-expanded' : 'chat-dialog'
          )}
          role="region"
          aria-label="Область чата"
        >
          {isChatOpen && (
            <ScrollArea
              className={cn(
                'flex-grow border-b border-neutral-800 p-4 sm:p-6',
                messages.length > 0 ? 'chat-scroll-area-expanded' : 'chat-scroll-area'
              )}
              role="log"
              aria-live="polite"
              aria-label="История сообщений"
            >
              <div className="flex-1 space-y-4 overflow-y-auto p-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    role="article"
                    aria-label={`Сообщение от ${msg.sender === 'user' ? 'пользователя' : 'ассистента'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-white'}`}
                    >
                      {msg.text}
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
          )}

          {/* Форма отправки */}
          <div className="border-0 bg-black p-4 sm:p-6">
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
                  aria-label="Введите ваше сообщение"
                  aria-describedby="chat-input-help"
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
                className="shrink-0 rounded-lg border-none bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all duration-300 ease-in-out hover:from-blue-500 hover:to-purple-500 hover:text-white focus-visible:ring-white"
                aria-label="Отправить сообщение"
              >
                <Send className="h-5 w-5" aria-hidden="true" />
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
