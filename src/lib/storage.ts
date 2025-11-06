import { Chat, Message } from './types';

const STORAGE_KEY = 'gemini-chats';
const CURRENT_CHAT_KEY = 'gemini-current-chat';

// Chat storage functions
export const saveChatsToStorage = (chats: Chat[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  } catch (error) {
    console.error('Failed to save chats to storage:', error);
    // Handle storage quota exceeded
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      // Clear oldest chats if storage is full
      clearOldestChats();
      saveChatsToStorage(chats.slice(0, chats.length - 1));
    }
  }
};

export const loadChatsFromStorage = (): Chat[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load chats from storage:', error);
    return [];
  }
};

export const saveCurrentChatId = (chatId: string | null): void => {
  try {
    localStorage.setItem(CURRENT_CHAT_KEY, chatId || '');
  } catch (error) {
    console.error('Failed to save current chat ID:', error);
  }
};

export const loadCurrentChatId = (): string | null => {
  try {
    const stored = localStorage.getItem(CURRENT_CHAT_KEY);
    return stored || null;
  } catch (error) {
    console.error('Failed to load current chat ID:', error);
    return null;
  }
};

// Helper functions
export const createNewChat = (): Chat => {
  return {
    id: generateId(),
    title: 'New Chat',
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const generateChatTitle = (message: string): string => {
  // Extract first few words as title
  const words = message.trim().split(' ').slice(0, 5);
  const title = words.join(' ');
  return title.length > 50 ? title.slice(0, 47) + '...' : title;
};

export const clearOldestChats = (): void => {
  const chats = loadChatsFromStorage();
  if (chats.length > 10) {
    const sortedChats = [...chats].sort((a, b) =>
      new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    );
    saveChatsToStorage(sortedChats.slice(2));
  }
};

export const exportChatAsMarkdown = (chat: Chat): string => {
  let markdown = `# ${chat.title}\n\n`;
  markdown += `*Created: ${new Date(chat.createdAt).toLocaleString()}*\n\n`;
  markdown += `*Last updated: ${new Date(chat.updatedAt).toLocaleString()}*\n\n`;
  markdown += '---\n\n';

  chat.messages.forEach((message) => {
    const timestamp = new Date(message.timestamp).toLocaleString();
    if (message.role === 'user') {
      markdown += `## You (${timestamp})\n${message.content}\n\n`;
    } else {
      markdown += `## AI Assistant (${timestamp})\n${message.content}\n\n`;
    }
    markdown += '---\n\n';
  });

  return markdown;
};

export const exportChatAsJSON = (chat: Chat): string => {
  return JSON.stringify(chat, null, 2);
};