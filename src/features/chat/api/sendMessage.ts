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
  processing_time?: number;
  from_cache?: boolean;
  model?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Базовый URL API бэкенда
 * Используем Next.js API Routes для проксирования запросов к бэкенду
 */
const API_BASE_URL = '/api';

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
      
      // Если есть сообщение об ошибке в формате бота, возвращаем его
      if (errorData.message) {
        return errorData as ApiChatResponse;
      }
      
      throw new Error(
        `API Error: ${response.status} ${response.statusText} - ${
          errorData.error || errorData.detail || 'Unknown error'
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
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Не кэшируем запрос для актуальной проверки
      cache: 'no-store',
    });
    
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
}
