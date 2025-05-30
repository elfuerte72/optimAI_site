export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatContextType {
  processAndSendMessage: (text: string) => Promise<void>;
}

export interface ApiMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  message: {
    content: string;
  };
}