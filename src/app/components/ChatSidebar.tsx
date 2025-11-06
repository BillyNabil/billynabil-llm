'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Plus, Trash2, Download, X, Trash, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Chat } from '@/lib/types';
import { exportChat } from '@/utils/export';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatSidebarProps {
  chats: Chat[];
  currentChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chats,
  currentChatId,
  onChatSelect,
  onNewChat,
  onDeleteChat,
  isOpen,
  onToggle,
}) => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if it's desktop on mount
    setIsMobile(typeof window !== 'undefined' ? window.innerWidth < 768 : true);

    // Listen for window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this chat?')) {
      onDeleteChat(chatId);
    }
  };

  const handleExportChat = (e: React.MouseEvent, chat: Chat) => {
    e.stopPropagation();
    exportChat(chat, 'markdown');
  };

  // Group chats by date
  const groupChatsByDate = (chatsToGroup: Chat[]) => {
    const groups: { [key: string]: Chat[] } = {
      today: [],
      yesterday: [],
      thisWeek: [],
      older: [],
    };

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    chatsToGroup.forEach((chat) => {
      const chatDate = new Date(chat.updatedAt);
      const chatDateOnly = new Date(chatDate.getFullYear(), chatDate.getMonth(), chatDate.getDate());

      if (chatDateOnly.getTime() === today.getTime()) {
        groups.today.push(chat);
      } else if (chatDateOnly.getTime() === yesterday.getTime()) {
        groups.yesterday.push(chat);
      } else if (chatDateOnly.getTime() > weekAgo.getTime()) {
        groups.thisWeek.push(chat);
      } else {
        groups.older.push(chat);
      }
    });

    return groups;
  };

  const sortedChats = [...chats].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const groupedChats = groupChatsByDate(sortedChats);

  const handleDeleteAllChats = () => {
    if (window.confirm('Are you sure you want to delete all chats? This cannot be undone.')) {
      chats.forEach(chat => onDeleteChat(chat.id));
    }
  };

  const renderChatGroup = (groupLabel: string, groupChats: Chat[], icon: React.ReactNode) => {
    if (groupChats.length === 0) return null;

    return (
      <div key={groupLabel} className="mb-4">
        <div className="flex items-center gap-2 px-2 py-2 mb-2">
          <span className="text-xs text-muted-foreground opacity-70">{icon}</span>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {groupLabel}
          </h4>
        </div>
        <div className="space-y-1">
          {groupChats.map((chat) => (
            <motion.div
              key={chat.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                currentChatId === chat.id
                  ? 'bg-primary/15 border border-primary/50 text-foreground'
                  : 'hover:bg-secondary/60 border border-transparent'
              }`}
              onClick={() => onChatSelect(chat.id)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-medium text-foreground truncate">
                    {chat.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground/70">
                    <MessageSquare size={10} />
                    <span>{chat.messages.length} msg</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleExportChat(e, chat)}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-primary"
                    title="Export chat"
                  >
                    <Download size={12} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleDeleteChat(e, chat.id)}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                    title="Delete chat"
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -320 }}
        animate={{ x: isMobile && !isOpen ? -320 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`${isMobile ? 'fixed' : 'static'} left-0 top-0 h-full w-80 bg-card border-r border-border shadow-xl z-50 md:static md:z-0 md:shadow-lg`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border bg-linear-to-br from-primary/5 to-transparent">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <div className="p-2 rounded-lg bg-linear-to-br from-primary to-primary/80 shadow-lg">
                  <MessageSquare size={18} className="text-primary-foreground" />
                </div>
                Chat History
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="md:hidden"
              >
                <X size={18} />
              </Button>
            </div>
            <Button
              onClick={onNewChat}
              className="w-full bg-linear-to-r from-primary to-primary/90 text-primary-foreground hover:shadow-lg transition-all duration-200 font-semibold"
            >
              <Plus size={20} />
              <span>New Chat</span>
            </Button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded">
            {chats.length === 0 ? (
              <div className="text-center py-12 animate-fadeIn">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary mb-4">
                  <MessageSquare size={32} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm font-medium">
                  Belum ada chat
                </p>
                <p className="text-muted-foreground/70 text-xs mt-2">
                  Mulai percakapan baru untuk melihatnya di sini
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {renderChatGroup('Hari Ini', groupedChats.today, <Clock size={14} />)}
                {renderChatGroup('Kemarin', groupedChats.yesterday, <Clock size={14} />)}
                {renderChatGroup('Minggu Ini', groupedChats.thisWeek, <Calendar size={14} />)}
                {renderChatGroup('Lebih Lama', groupedChats.older, <Calendar size={14} />)}
              </div>
            )}
          </div>

          {/* Footer */}
          {chats.length > 0 && (
            <div className="p-4 border-t border-border space-y-3 bg-linear-to-t from-card to-transparent">
              <div className="bg-secondary/50 p-3 rounded-lg border border-border/50">
                <div className="text-xs text-muted-foreground text-center">
                  <span className="font-semibold text-foreground">{chats.length}</span> percakapan tersimpan
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteAllChats}
                className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash size={16} />
                <span>Hapus Semua</span>
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default ChatSidebar;