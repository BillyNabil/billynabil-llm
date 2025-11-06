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
      className="border-t border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 p-3 sm:p-6 sticky bottom-0"
    >
      <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
        <div className="relative flex items-end gap-2 sm:gap-3">
          <div className="flex-1 relative min-w-0">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none shrink-0">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
              rows={1}
              className="pl-8 sm:pl-8 pr-12 sm:pr-16 resize-none text-sm sm:text-base"
              style={{ minHeight: '44px', maxHeight: '200px', overflowY: 'auto' }}
            />
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-xs text-muted-foreground font-medium">
              {message.length}/2000
            </div>
          </div>
          <Button
            type="submit"
            disabled={!message.trim() || isLoading}
            size="icon"
            className="px-2 sm:px-3 py-2 sm:py-3 rounded-lg sm:rounded-xl flex items-center justify-center h-auto shrink-0"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin sm:w-5 sm:h-5" />
            ) : (
              <Send size={18} className="sm:w-5 sm:h-5" />
            )}
          </Button>
        </div>
        <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-1">
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold text-foreground bg-secondary border border-border rounded">Enter</kbd>
              <span>send</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold text-foreground bg-secondary border border-border rounded">Shift</kbd>
              <span>+</span>
              <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold text-foreground bg-secondary border border-border rounded">Enter</kbd>
              <span>line</span>
            </span>
          </div>
          {message.length > 1800 && (
            <div className="text-xs text-amber-600 dark:text-amber-400 font-medium animate-pulse">
              {2000 - message.length} chars left
            </div>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default ChatInput;