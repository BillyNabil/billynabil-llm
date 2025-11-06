export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isError?: boolean;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatState {
  chats: Chat[];
  currentChatId: string | null;
}

export interface ModelOption {
  id: string;
  name: string;
  description: string;
}

export const MODEL_OPTIONS: ModelOption[] = [
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    description: 'Fast and efficient responses'
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    description: 'Advanced reasoning and analysis'
  }
];

export interface ApiResponse {
  message: Message;
  error?: string;
  details?: string;
}