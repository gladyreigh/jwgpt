import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import { Message as MessageType } from '../types';

// SVG Icons
const ClipboardIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const PencilIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const ArrowPathIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const MagnifyingGlassIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

interface MessageProps {
  message: MessageType;
  onRegenerate: () => void;
  onEdit: (content: string) => void;
  isLast?: boolean;
}

interface SearchLink {
  url: string;
  keyword: string;
  type: 'jworg' | 'wol';
}

const isValidSearchLink = (url: string): boolean => {
  return (
    url.startsWith('https://www.jw.org/en/search/?q=') ||
    url.startsWith('https://wol.jw.org/en/wol/s/r1/lp-e?q=')
  );
};

const getSearchType = (url: string): 'jworg' | 'wol' => {
  return url.includes('wol.jw.org') ? 'wol' : 'jworg';
};

const extractKeyword = (url: string): string => {
  try {
    const searchUrl = new URL(url);
    const keyword = searchUrl.searchParams.get('q') || '';
    return decodeURIComponent(keyword.replace(/"/g, ''));
  } catch {
    return '';
  }
};

const SearchLinkCard: React.FC<{ link: SearchLink }> = ({ link }) => {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 
        rounded-lg 
        border border-purple-200 dark:border-purple-800 
        hover:bg-purple-50 dark:hover:bg-purple-900/30 
        transition-colors group"
    >
      <MagnifyingGlassIcon className="h-5 w-5 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300" />
      <div className="flex-1">
        <p className="font-medium text-purple-700 dark:text-purple-300 group-hover:text-purple-800 dark:group-hover:text-purple-200">
          Search: "{link.keyword}"
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">
          {link.type === 'jworg' ? 'JW.org Search' : 'WOL Search'}
        </p>
      </div>
    </a>
  );
};

const Message: React.FC<MessageProps> = ({ 
  message, 
  onRegenerate, 
  onEdit, 
  isLast = false 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const [isCopied, setIsCopied] = useState(false);

  const extractSearchLinks = (content: string): SearchLink[] => {
    const markdownLinkRegex = /$$Search\s*([^$$]+)$$$$([^)]+)$$/g;
    const links: SearchLink[] = [];
    let match;

    while ((match = markdownLinkRegex.exec(content)) !== null) {
      const [, , url] = match;
      if (isValidSearchLink(url)) {
        links.push({
          url,
          keyword: extractKeyword(url),
          type: getSearchType(url)
        });
      }
    }

    return links;
  };

  const searchLinks = extractSearchLinks(message.content);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setIsCopied(true);
    toast.success('Copied to clipboard!');
    
    // Reset copied state after 2 seconds
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleEdit = () => {
    onEdit(editContent);
    setIsEditing(false);
  };

  return (
    <div 
      className={`
        max-w-4xl 
        mx-auto 
        p-4 
        rounded-lg 
        shadow-sm 
        ${message.role === 'user' 
          ? 'bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-300 dark:border-purple-600' 
          : 'bg-white dark:bg-[#1E1E1E] border-l-4 border-green-300 dark:border-green-600'}
        ${isLast ? 'mb-4' : ''}
      `}
    >
      <div className="flex items-start space-x-3">
        {/* Avatar Placeholder */}
        <div 
          className={`
            w-10 h-10 
            rounded-full 
            flex items-center justify-center 
            ${message.role === 'user' 
              ? 'bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-100' 
              : 'bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-100'}
          `}
        >
          {message.role === 'user' ? 'U' : 'JW'}
        </div>

        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
                <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                    bg-white dark:bg-gray-900  // Adjusted background
                    text-gray-900 dark:text-white  // Added text color
                    focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-700 
                    transition-all"
                rows={4}
                />
              <div className="flex space-x-2">
                <button
                  onClick={handleEdit}
                  className="btn btn-primary btn-sm flex items-center 
                    bg-purple-600 dark:bg-purple-700 
                    text-white 
                    hover:bg-purple-700 dark:hover:bg-purple-600"
                >
                  <CheckIcon className="h-4 w-4 mr-1" /> Save
                </button>
                <button
                  onClick={() => {
                    setEditContent(message.content);
                    setIsEditing(false);
                  }}
                  className="btn btn-ghost btn-sm dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Message Content with Enhanced Markdown */}
                <ReactMarkdown 
                className="prose prose-sm max-w-none dark:prose-invert"
                components={{
                    a: ({ node, ...props }) => (
                    <a 
                        {...props} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                    />
                    ),
                    // Add custom rendering for strong and other elements
                    strong: ({ node, ...props }) => (
                    <strong 
                        {...props} 
                        className="text-black dark:text-white font-bold"
                    />
                    ),
                    h1: ({ node, ...props }) => (
                    <h1 
                        {...props} 
                        className="text-gray-900 dark:text-white"
                    />
                    ),
                    h2: ({ node, ...props }) => (
                    <h2 
                        {...props} 
                        className="text-gray-900 dark:text-white"
                    />
                    ),
                    h3: ({ node, ...props }) => (
                    <h3 
                        {...props} 
                        className="text-gray-900 dark:text-white"
                    />
                    ),
                    li: ({ node, ...props }) => (
                    <li 
                        {...props} 
                        className="text-gray-800 dark:text-gray-100"
                    />
                    ),
                    p: ({ node, ...props }) => (
                    <p 
                        {...props} 
                        className="text-gray-800 dark:text-gray-100"
                    />
                    ),
                }}
                >
                {message.content}
                </ReactMarkdown>

              {/* Timestamp and Actions */}
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex justify-between items-center">
                <span>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
                <div className="flex space-x-2">
                  <button 
                    onClick={copyToClipboard}
                    className={`
                      text-gray-500 dark:text-gray-300
                      hover:text-purple-600 dark:hover:text-purple-400
                      transition-colors
                      ${isCopied ? 'text-green-600 dark:text-green-400' : ''}
                    `}
                    title="Copy to clipboard"
                  >
                    {isCopied ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <ClipboardIcon className="h-4 w-4" />
                    )}
                  </button>
                  
                  {message.role === 'user' && (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="text-gray-500 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      title="Edit message"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                  )}
                  
                  {message.role === 'assistant' && (
                    <button 
                      onClick={onRegenerate}
                      className="text-gray-500 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      title="Regenerate response"
                    >
                      <ArrowPathIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Search Links Section */}
          {searchLinks.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Search Resources</h4>
              <div className="grid gap-2 md:grid-cols-2">
                {searchLinks.map((link, index) => (
                  <SearchLinkCard key={index} link={link} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;