/**
 * Глобальные константы приложения
 */

export const APP_CONFIG = {
  name: 'OptimaAI',
  description: 'AI-powered solutions for your business',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 30000,
} as const;

export const CHAT_CONFIG = {
  maxMessages: 100,
  typingDelay: 1000,
  maxMessageLength: 1000,
} as const;

export const SOCIAL_LINKS = {
  telegram: 'https://t.me/optimaai_tg',
} as const;