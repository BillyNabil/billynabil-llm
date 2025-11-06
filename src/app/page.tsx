'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatSidebar from './components/ChatSidebar';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ModelSelector from './components/ModelSelector';
import {
  Chat,
  Message,
  MODEL_OPTIONS,
} from '@/lib/types';
import {
  saveChatsToStorage,
  loadChatsFromStorage,
  saveCurrentChatId,
  loadCurrentChatId,
  createNewChat,
  generateChatTitle,
} from '@/lib/storage';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState(MODEL_OPTIONS[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find(chat => chat.id === currentChatId);

  useEffect(() => {
    // Load data from localStorage on mount
    const savedChats = loadChatsFromStorage();
    const savedCurrentChatId = loadCurrentChatId();

    setChats(savedChats);
    setCurrentChatId(savedCurrentChatId);
  }, []);

  useEffect(() => {
    // Save to localStorage whenever chats change
    saveChatsToStorage(chats);
  }, [chats]);

  useEffect(() => {
    // Save current chat ID whenever it changes
    saveCurrentChatId(currentChatId);
  }, [currentChatId]);

  useEffect(() => {
    // Auto scroll to bottom when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  const handleNewChat = () => {
    const newChat = createNewChat();
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setSidebarOpen(false);
  };

  const handleChatSelect = (chatId: string) => {
    setCurrentChatId(chatId);
    setSidebarOpen(false);
  };

  const handleDeleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  const handleSendMessage = async (content: string) => {
    let chat = currentChat;

    // Create new chat if none exists
    if (!chat) {
      chat = createNewChat();
      setChats(prev => [chat!, ...prev]);
      setCurrentChatId(chat.id);
    }

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    const updatedChat = {
      ...chat,
      messages: [...chat.messages, userMessage],
      updatedAt: new Date().toISOString(),
    };

    // Generate title if this is the first message
    if (chat.messages.length === 0) {
      updatedChat.title = generateChatTitle(content);
    }

    setChats(prev =>
      prev.map(c => (c.id === chat.id ? updatedChat : c))
    );

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedChat.messages,
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Add AI response
      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, data.message],
        updatedAt: new Date().toISOString(),
      };

      setChats(prev =>
        prev.map(c => (c.id === chat.id ? finalChat : c))
      );

    } catch (error: any) {
      console.error('Error sending message:', error);

      // Add error message
      const errorMessage: Message = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error.message || 'Unknown error occurred'}. Please try again.`,
        timestamp: new Date().toISOString(),
      };

      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, errorMessage],
        updatedAt: new Date().toISOString(),
      };

      setChats(prev =>
        prev.map(c => (c.id === chat.id ? finalChat : c))
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <ChatSidebar
        chats={chats}
        currentChatId={currentChatId}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="md:hidden"
              >
                <Menu size={20} />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary shadow-md">
                  <MessageSquare size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">
                    {currentChat?.title || 'Free LLM'}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    powered by Google Gemini & Developed by BillyNabil
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ModelSelector
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
                disabled={isLoading}
              />
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="max-w-5xl mx-auto px-4 py-8">
            {currentChat?.messages.length === 0 ? (
              <div className="text-center py-16 animate-fadeIn">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary shadow-lg mb-6">
                  <MessageSquare size={40} className="text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-3">
                  Welcome to AI Assistant
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Experience the power of Google Gemini AI
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="bg-card border border-border p-4 rounded-xl transition-all hover:shadow-md">
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground mb-2">💬 Smart Conversations</h3>
                      <p className="text-sm text-muted-foreground">Ask questions and get intelligent, contextual responses</p>
                    </div>
                  </div>
                  <div className="bg-card border border-border p-4 rounded-xl transition-all hover:shadow-md">
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground mb-2">💾 Local Storage</h3>
                      <p className="text-sm text-muted-foreground">Your chat history is saved locally and privately</p>
                    </div>
                  </div>
                  <div className="bg-card border border-border p-4 rounded-xl transition-all hover:shadow-md">
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground mb-2">🤖 Multiple Models</h3>
                      <p className="text-sm text-muted-foreground">Choose between Flash and Pro models for different needs</p>
                    </div>
                  </div>
                  <div className="bg-card border border-border p-4 rounded-xl transition-all hover:shadow-md">
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground mb-2">📤 Export Anytime</h3>
                      <p className="text-sm text-muted-foreground">Export your conversations in various formats</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <AnimatePresence>
                {currentChat?.messages.map((message, index) => (
                  <ChatMessage
                    key={`${currentChat.id}-${index}`}
                    message={message}
                    isLoading={isLoading && index === currentChat.messages.length - 1}
                  />
                ))}
                {isLoading && !currentChat?.messages.find(m => m.role === 'assistant') && (
                  <ChatMessage
                    message={{
                      role: 'assistant',
                      content: '',
                      timestamp: new Date().toISOString(),
                    }}
                    isLoading={true}
                  />
                )}
              </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input Area */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
