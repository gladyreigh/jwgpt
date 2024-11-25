import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Message from './Message';
import PromptInput from './PromptInput';
import ModelSelector from './ModelSelector';
import { useChat } from '../hooks/useChat';

// Icons as SVG components for better dark mode support
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    className={className}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    className={className}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
    />
  </svg>
);

const ScrollDownIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    className={className}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M19 14l-7 7m0 0l-7-7m7 7V3" 
    />
  </svg>
);

const Chat: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<'gemini-pro' | 'gemini-flash'>('gemini-pro');
  const { 
    messages, 
    loading, 
    sendMessage, 
    regenerateMessage, 
    editMessage, 
    clearChat 
  } = useChat();

  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    setShowScrollToBottom(scrollHeight - scrollTop > clientHeight + 200);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleClearChat = useCallback(() => {
    if (window.confirm('Are you sure you want to clear the chat? This cannot be undone.')) {
      clearChat();
    }
  }, [clearChat]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center z-20">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              JW-GPT
              <SparklesIcon className="h-5 w-5 text-purple-500 dark:text-purple-400" />
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Spiritual Guidance Companion</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {messages.length > 0 && (
            <button 
              onClick={handleClearChat}
              className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Clear Chat"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          )}
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
        </div>
      </header>

      {/* Main Chat Area */}
      <main 
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900"
        onScroll={handleScroll}
      >
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Message
                  message={message}
                  onRegenerate={() => regenerateMessage(message.id)}
                  onEdit={(newContent) => editMessage(message.id, newContent)}
                  isLast={index === messages.length - 1}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <div className="text-center text-gray-500 dark:text-gray-400 italic">
              <div className="flex items-center justify-center space-x-2">
                <span className="animate-pulse">Praying for your answer...</span>
                <SparklesIcon className="h-5 w-5 text-purple-500 dark:text-purple-400 animate-pulse" />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Scroll to Bottom Button */}
        <AnimatePresence>
          {showScrollToBottom && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed bottom-24 right-6 p-3 bg-purple-600 dark:bg-purple-700 text-white rounded-full shadow-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
              onClick={scrollToBottom}
            >
              <ScrollDownIcon className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </main>

      {/* Prompt Input */}
      <PromptInput
        onSubmit={(prompt) => sendMessage(prompt, selectedModel)}
        loading={loading}
        hasMessages={messages.length > 0}
        onClear={handleClearChat}
        messageCount={messages.length > 1}
      />
    </div>
  );
};

export default Chat;