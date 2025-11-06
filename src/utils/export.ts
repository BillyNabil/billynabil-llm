import { exportChatAsMarkdown, exportChatAsJSON } from '@/lib/storage';
import { Chat } from '@/lib/types';

export const downloadFile = (content: string, filename: string, type: string): void => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportChat = (chat: Chat, format: 'markdown' | 'json'): void => {
  const timestamp = new Date().toISOString().slice(0, 10);
  const baseFilename = `${chat.title.replace(/[^a-z0-9]/gi, '_')}_${timestamp}`;

  if (format === 'markdown') {
    const content = exportChatAsMarkdown(chat);
    downloadFile(content, `${baseFilename}.md`, 'text/markdown');
  } else {
    const content = exportChatAsJSON(chat);
    downloadFile(content, `${baseFilename}.json`, 'application/json');
  }
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};