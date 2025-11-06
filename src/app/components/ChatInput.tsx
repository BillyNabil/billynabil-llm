'use client';

import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-t border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 p-6"
    >
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
              rows={1}
              className="pl-8 pr-16 resize-none"
              style={{ minHeight: '56px', maxHeight: '200px', overflowY: 'auto' }}
            />
            <div className="absolute bottom-4 right-4 text-xs text-muted-foreground font-medium">
              {message.length}/2000
            </div>
          </div>
          <Button
            type="submit"
            disabled={!message.trim() || isLoading}
            size="icon"
            className="px-3 py-3 rounded-xl flex items-center justify-center h-auto"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </Button>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <div>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-2 py-1 text-xs font-semibold text-foreground bg-secondary border border-border rounded">Enter</kbd>
              <span>to send</span>
            </span>
            <span className="mx-2">•</span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-2 py-1 text-xs font-semibold text-foreground bg-secondary border border-border rounded">Shift</kbd>
              <span>+</span>
              <kbd className="px-2 py-1 text-xs font-semibold text-foreground bg-secondary border border-border rounded">Enter</kbd>
              <span>for new line</span>
            </span>
          </div>
          {message.length > 1800 && (
            <div className="text-xs text-amber-600 dark:text-amber-400 font-medium animate-pulse">
              {2000 - message.length} characters remaining
            </div>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default ChatInput;