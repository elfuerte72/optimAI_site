/**
 * API-клиент для взаимодействия с чат-ботом
 */

export interface ApiMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  messages: ApiMessage[];
  stream?: boolean;
  use_cache?: boolean;
}

export interface ApiChatResponse {
  message: ApiMessage;
  finish_reason?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Базовый URL API бэкенда
 *
 * В продакшене нужно использовать относительный URL или URL с правильным доменом
 */
const API_BASE_URL = typeof window !== 'undefined' ? '/api' : 'http://localhost:8000';

/**
 * Отправка сообщения боту и получение ответа
 *
 * @param messages История сообщений
 * @param useCache Использовать кэширование
 * @returns Ответ от бота
 */
export async function sendMessage(
  messages: ApiMessage[],
  useCache: boolean = true
): Promise<ApiChatResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        stream: false,
        use_cache: useCache,
      } as ChatRequest),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `API Error: ${response.status} ${response.statusText} - ${errorData.detail || 'Unknown error'
        }`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending message to bot:', error);
    throw error;
  }
}

/**
 * Проверка доступности API
 *
 * @returns true, если API доступен
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    // Временное решение для тестирования: считаем API доступным
    // В продакшене нужно реализовать проксирование через Next.js API Routes
    return true;

    /* Настоящая проверка будет выглядеть так:
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    return response.ok;
    */
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
}
