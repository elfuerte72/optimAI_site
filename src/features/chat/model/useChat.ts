'use client';

import { useState, useEffect, useCallback } from 'react';
import { sendMessage, Message as ApiMessage, checkApiHealth } from '../api/sendMessage';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  apiAvailable: boolean | null;
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
}

export const useChat = (): UseChatReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null);

  // Проверка доступности API при монтировании
  useEffect(() => {
    checkApiHealth()
      .then((available) => setApiAvailable(available))
      .catch(() => setApiAvailable(false));
  }, []);

  const sendChatMessage = useCallback(async (text: string) => {
    if (text.trim() === '') return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (!apiAvailable) {
        // Локальный ответ, если API недоступен
        setTimeout(() => {
          const botMessage: Message = {
            id: `bot-${Date.now()}`,
            text: 'Извините, сервер бота в данный момент недоступен. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.',
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMessage]);
          setIsLoading(false);
        }, 1000);
        return;
      }

      // Подготавливаем историю сообщений для API
      const apiMessages: ApiMessage[] = messages
        .filter((msg) => msg.sender === 'user' || msg.sender === 'bot')
        .map((msg) => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
        }));

      // Добавляем текущее сообщение
      apiMessages.push({
        role: 'user',
        content: text.trim(),
      });

      // Отправляем запрос к API
      const response = await sendMessage(apiMessages);

      if (response && response.message) {
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          text: response.message.content,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: `bot-${Date.now()}`,
        text: 'Произошла ошибка при получении ответа. Пожалуйста, попробуйте еще раз позже.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, apiAvailable]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    apiAvailable,
    sendMessage: sendChatMessage,
    clearMessages,
  };
};