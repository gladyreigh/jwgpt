import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, TrashIcon } from '@heroicons/react/24/solid';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  loading: boolean;
  hasMessages: boolean;
  onClear?: () => void;
  messageCount: boolean; 
}

const PromptInput: React.FC<PromptInputProps> = ({ 
  onSubmit, 
  loading, 
  hasMessages,
  onClear,
  messageCount
}) => {
  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [rows, setRows] = useState(1);

  useEffect(() => {
    if (textareaRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(textareaRef.current).lineHeight);
      const scrollHeight = textareaRef.current.scrollHeight;
      const newRows = Math.min(Math.max(Math.floor(scrollHeight / lineHeight), 1), 4);
      setRows(newRows);
    }
  }, [prompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
      setPrompt('');
      setRows(1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const suggestedPrompts = [
    "What does the Bible say about hope?",
    "How can I draw closer to Jehovah?",
    "Explain the significance of God's name",
    "What is the Kingdom hope?",
  ];

  return (
    <div className="p-4 border-t bg-white dark:bg-black shadow-sm">
      {/* {(!hasMessages || prompt.length === 0) && ( */}
      {(!messageCount) && ( 
        <div className="mb-4 space-y-2">
          <p className="text-center text-gray-600 dark:text-gray-300 font-semibold">
            Suggested Conversation Starters
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestedPrompts.map((suggestedPrompt, index) => (
            <button
            key={index}
            onClick={() => {
                onSubmit(suggestedPrompt);
                setPrompt('');  // Clear the prompt after submission
                setRows(1);    // Reset rows to default
            }}
            className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
            >
            {suggestedPrompt}
            </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <div className="flex-1 relative">
        <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={hasMessages 
                ? "Share your spiritual question..." 
                : "How can I help you understand Jehovah's love?"}
            className="w-full p-2 pr-10 border border-gray-300 dark:border-gray-700 rounded-lg resize-none 
            bg-white dark:bg-gray-900  // Change this line
            text-gray-900 dark:text-white  // Add this line
            focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-700 transition-all"
            rows={rows}
            />
          {prompt.length > 0 && (
            <button
              type="button"
              onClick={() => setPrompt('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 
              text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {hasMessages && onClear && (
            <button
              type="button"
              onClick={onClear}
              className="p-2 text-gray-500 dark:text-gray-300 
              hover:text-red-500 dark:hover:text-red-400 
              hover:bg-red-50 dark:hover:bg-red-900/20 
              rounded-lg transition-colors"
              title="Clear Chat"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          )}
          
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="
              bg-purple-600 dark:bg-purple-700 
              text-white 
              p-2 
              rounded-lg 
              hover:bg-purple-700 dark:hover:bg-purple-600 
              disabled:opacity-50 
              transition-colors 
              flex 
              items-center 
              justify-center
            "
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptInput;