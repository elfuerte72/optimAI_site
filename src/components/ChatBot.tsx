'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// Типы сообщений
type Message = {
  id: string;
  text: string;
  isBot: boolean;
};

// Новый тип для ответа API
interface ApiChatResponse {
  reply: string;
}

// Новый тип для ошибки API
interface ApiChatError {
  error: string;
}

// Компонент для формы ввода сообщения
interface MessageInputFormProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  inputRef: React.Ref<HTMLTextAreaElement>;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const MessageInputForm: React.FC<MessageInputFormProps> = ({
  inputValue,
  onInputChange,
  onSubmit,
  isLoading,
  inputRef,
  onKeyDown,
  placeholder = "Задайте мне интересующий вас вопрос..."
}) => {
  // Автоматическая регулировка высоты текстового поля
  useEffect(() => {
    const currentInputRef = typeof inputRef === 'function' ? null : inputRef?.current;
    if (currentInputRef) {
      currentInputRef.style.height = '24px'; // Сброс высоты для пересчета
      currentInputRef.style.height = `${Math.min(currentInputRef.scrollHeight, 150)}px`;
    }
  }, [inputValue, inputRef]);

  return (
    <form onSubmit={onSubmit} className="relative bg-gray-900 rounded-xl shadow-lg border border-gray-800">
      <div className="px-3 py-2 flex items-end">
        <textarea
          ref={inputRef}
          rows={1}
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-0 resize-none focus:ring-0 focus:outline-none text-white py-1 px-2 max-h-[150px] overflow-y-auto"
          disabled={isLoading}
          style={{ height: '24px' }} // Начальная высота, будет изменена useEffect
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className={`p-1 rounded-md ${inputValue.trim() ? 'text-white' : 'text-gray-400'}`}
        >
          <Image 
            src="/images/send_message_icon.svg" 
            alt="Отправить" 
            width={24} 
            height={24} 
            className="w-6 h-6"
          />
        </button>
      </div>
    </form>
  );
};

// Компонент чата с ИИ
const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null); // Состояние для ошибок API
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Готовые вопросы для быстрого выбора
  const quickQuestions = [
    "Чем занимается компания?",
    "Как связаться с менеджером?",
    "Подробней об услугах компании"
  ];

  // Скролл к последнему сообщению при добавлении нового
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Обработка отправки сообщения
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    setApiError(null); // Сброс предыдущей ошибки
    
    const userMessageText = inputValue;
    // Добавляем сообщение пользователя
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userMessageText,
      isBot: false,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue(''); // Очищаем поле ввода сразу
    setIsLoading(true);
    if (!showChat) setShowChat(true); // Показываем чат, если он был скрыт
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessageText }),
      });

      if (!response.ok) {
        let errorText = `Ошибка API: ${response.status}`;
        try {
          const errorData: ApiChatError | { detail?: string } = await response.json();
          if (typeof errorData === 'object' && errorData !== null) {
            if ('error' in errorData && typeof errorData.error === 'string') {
              errorText = errorData.error;
            } else if ('detail' in errorData && typeof errorData.detail === 'string') {
              errorText = errorData.detail;
            }
          }
        } catch (jsonError) {
          // Ошибка парсинга JSON, используем стандартный текст ошибки
        }
        throw new Error(errorText);
      }

      const data: ApiChatResponse = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        isBot: true,
      };
      
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
      const errorMessage = error instanceof Error ? error.message : "Не удалось получить ответ от бота. Пожалуйста, попробуйте позже.";
      setApiError(errorMessage);
      const botErrorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMessage,
        isBot: true,
      };
      setMessages(prev => [...prev, botErrorMessage]);
    } finally {
      setIsLoading(false);
      // Фокус на поле ввода после ответа
      inputRef.current?.focus();
    }
  };

  // Обработка быстрого вопроса
  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    // Имитация отправки формы
    const event = { preventDefault: () => {} } as React.FormEvent;
    handleSendMessage(event);
  };

  // Регулировка высоты textarea при нажатии Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim()) {
        handleSendMessage(e as unknown as React.FormEvent);
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-black flex flex-col rounded-lg overflow-hidden">
      {/* Область сообщений и чата */}
      <div className="flex-grow">
        {!showChat ? (
          <div className="flex flex-col items-center px-4 pt-20">
            <h2 className="text-2xl md:text-4xl text-white font-bold mb-4 text-center">
              Спроси помощника
            </h2>
            
            {/* Форма ввода сразу после заголовка */}
            <div className="w-full max-w-2xl mt-2">
              <MessageInputForm
                inputValue={inputValue}
                onInputChange={setInputValue}
                onSubmit={handleSendMessage}
                isLoading={isLoading}
                inputRef={inputRef}
                onKeyDown={handleKeyDown}
                placeholder="Задайте мне интересующий вас вопрос..."
              />
              
              {/* Готовые вопросы */}
              <div className="flex flex-wrap gap-2 justify-center mt-8">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="py-2.5 px-4 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors border border-gray-700"
                    disabled={isLoading}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[600px] overflow-y-auto py-4 px-6 bg-black">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`py-5 ${message.isBot ? 'bg-black' : 'bg-gray-950 border-t border-b border-gray-800'}`}
              >
                <div className="max-w-3xl mx-auto flex items-start">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 ${message.isBot ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-gray-700'}`}>
                    {message.isBot ? 
                      <Image src="/images/logo-updated.png" alt="AI" width={20} height={20} /> :
                       'В'}
                  </div>
                  <div className="flex-1">
                    <p className="text-white whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {apiError && (
              <div className="py-5 bg-black">
                <div className="max-w-3xl mx-auto flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mr-4">
                    !
                  </div>
                  <div className="flex-1">
                    <p className="text-red-400 whitespace-pre-wrap">{apiError}</p>
                  </div>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="py-5 bg-black">
                <div className="max-w-3xl mx-auto flex">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mr-4">
                    A
                  </div>
                  <div className="flex space-x-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Форма отправки сообщения (показывается только в режиме чата) */}
      {showChat && (
        <div className="p-3 mt-auto bg-black">
          <div className="max-w-3xl mx-auto">
            <MessageInputForm
              inputValue={inputValue}
              onInputChange={setInputValue}
              onSubmit={handleSendMessage}
              isLoading={isLoading}
              inputRef={inputRef}
              onKeyDown={handleKeyDown}
              placeholder="Спросите что-нибудь..."
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;