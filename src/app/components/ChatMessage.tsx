'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Message } from '@/lib/types';
import { copyToClipboard } from '@/utils/export';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(message.content);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 sm:mb-6 group px-3 sm:px-0`}
    >
      <div
        className={`max-w-4xl w-full ${
          isUser ? 'order-2' : 'order-1'
        }`}
      >
        <Card className={`px-3 sm:px-5 py-3 sm:py-4 transition-all duration-200 ${
          isUser 
            ? 'bg-primary text-primary-foreground' 
            : message.isError
            ? 'bg-destructive/10 border-destructive/50'
            : 'bg-card'
        }`}>
          <div className="flex items-start justify-between gap-2 sm:gap-4">
            <div className="flex-1 overflow-x-auto min-w-0">
              {isUser ? (
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-medium overflow-wrap">
                  {message.content}
                </p>
              ) : (
                <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-p:leading-relaxed prose-code:font-medium prose-p:text-sm sm:prose-p:text-base">
                  {isLoading ? (
                    <div className="flex items-center gap-2 py-2">
                      <div className="w-2.5 h-2.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2.5 h-2.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2.5 h-2.5 bg-muted-foreground rounded-full animate-bounce"></div>
                    </div>
                  ) : message.isError ? (
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm sm:text-base text-destructive font-medium">Error</p>
                        <p className="text-sm sm:text-base text-foreground mt-1 leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ) : (
                    <ReactMarkdown
                      components={{
                        code({ className, children, ...props }: any) {
                          const match = /language-(\w+)/.exec(className || '');
                          const isInline = !props['data-inline'] && !match;

                          return !isInline && match ? (
                            <div className="relative my-2 sm:my-4">
                              <button
                                onClick={handleCopy}
                                className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-all duration-200 z-10"
                                title="Copy code"
                              >
                                {isCopied ? (
                                  <Check size={12} className="sm:w-3.5 sm:h-3.5" />
                                ) : (
                                  <Copy size={12} className="sm:w-3.5 sm:h-3.5" />
                                )}
                              </button>
                              <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                className="mt-0! mb-0! rounded-lg sm:rounded-xl overflow-hidden shadow-lg text-xs sm:text-sm"
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            </div>
                          ) : (
                            <code
                              className={`${className} bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs sm:text-sm font-medium`}
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                        blockquote({ children }) {
                          return (
                            <blockquote className="border-l-4 border-primary pl-3 sm:pl-4 py-2 my-2 sm:my-4 bg-primary/10 rounded-r-lg text-sm sm:text-base">
                              {children}
                            </blockquote>
                          );
                        },
                        a({ children, href }) {
                          return (
                            <a
                              href={href}
                              className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors break-all"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {children}
                            </a>
                          );
                        },
                        ul({ children }) {
                          return <ul className="list-disc list-inside my-1 sm:my-2 space-y-1 text-sm sm:text-base">{children}</ul>;
                        },
                        ol({ children }) {
                          return <ol className="list-decimal list-inside my-1 sm:my-2 space-y-1 text-sm sm:text-base">{children}</ol>;
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  )}
                </div>
              )}
            </div>
            {!isUser && !isLoading && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="shrink-0 opacity-0 group-hover:opacity-100 h-auto p-1 sm:p-2"
                title="Copy message"
              >
                {isCopied ? (
                  <Check size={14} className="sm:w-4 sm:h-4" />
                ) : (
                  <Copy size={14} className="sm:w-4 sm:h-4" />
                )}
              </Button>
            )}
          </div>
          <div
            className={`text-xs mt-2 sm:mt-3 flex items-center gap-2 ${
              isUser
                ? 'text-primary-foreground/70'
                : 'text-muted-foreground'
            }`}
          >
            <span className="whitespace-nowrap">{new Date(message.timestamp).toLocaleString('id-ID', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
            {isUser && (
              <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full"></div>
            )}
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default ChatMessage;