import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, ChatState } from '../types';
import { generateResponse, getInitialGreeting } from '../services/ai';

const MAX_CONTEXT_MESSAGES = 100;

export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    loading: false,
    error: null,
    conversationContext: [],
    previousResponses: [], // New state to track previous responses
  });

  // Add initial greeting when chat is first loaded
  useEffect(() => {
    if (state.messages.length === 0) {
      const initialGreeting = getInitialGreeting();
      
      const greetingMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: initialGreeting,
        model: 'gemini-pro',
        timestamp: new Date(),
      };

      setState((prev) => ({
        ...prev,
        messages: [greetingMessage],
        conversationContext: [initialGreeting],
      }));
    }
  }, []);

  // Helper function to manage conversation context
  const updateConversationContext = useCallback((newMessage: string) => {
    setState((prev) => {
      const currentContext = prev.conversationContext || [];
      let newContext = [...currentContext, newMessage];
      
      if (newContext.length > MAX_CONTEXT_MESSAGES) {
        newContext = newContext.slice(-MAX_CONTEXT_MESSAGES);
      }

      return {
        ...prev,
        conversationContext: newContext,
      };
    });
  }, []);

  // Helper function to store previous responses
  const storePreviousResponse = useCallback((response: string) => {
    setState((prev) => ({
      ...prev,
      previousResponses: [...(prev.previousResponses || []), response].slice(-5), // Keep last 5 responses
    }));
  }, []);

  const sendMessage = useCallback(async (content: string, model: 'gemini-pro' | 'gemini-flash') => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      model,
      timestamp: new Date(),
    };

    try {
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
      }));

      const contextString = (state.conversationContext || []).join('\n');
      const previousResponses = (state.previousResponses || []).join('\n');
      
      const enhancedPrompt = `
        Conversation Context:\n${contextString}

        Previous Responses (DO NOT REPEAT SIMILAR PATTERNS):\n${previousResponses}

        Latest User Message: ${content}

        RESPONSE INSTRUCTIONS:
        1. Provide a unique and fresh perspective
        2. Use different examples and explanations than before
        3. Vary your communication style and approach
        4. Ensure response is distinct from previous ones
        5. Maintain accuracy while being creative in presentation

        Randomization Seed: ${Math.floor(Math.random() * 1000)}
      `;

      const response = await generateResponse(enhancedPrompt, model);

      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: response,
        model,
        timestamp: new Date(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        loading: false,
      }));

      updateConversationContext(content);
      updateConversationContext(response);
      storePreviousResponse(response);

    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Failed to generate response',
      }));
    }
  }, [state.conversationContext, state.previousResponses, updateConversationContext, storePreviousResponse]);

  const regenerateMessage = useCallback(async (messageId: string) => {
    const messageIndex = state.messages.findIndex((m) => m.id === messageId);
    if (messageIndex === -1) return;
  
    let userMessageIndex = messageIndex;
    while (userMessageIndex >= 0 && state.messages[userMessageIndex].role !== 'user') {
      userMessageIndex--;
    }
  
    if (userMessageIndex < 0) return;
  
    const userMessage = state.messages[userMessageIndex];
  
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));
  
    try {
      const contextString = (state.conversationContext || []).join('\n');
      const previousResponses = (state.previousResponses || []).join('\n');

      const enhancedPrompt = `
        Conversation Context:\n${contextString}

        Previous Responses (DO NOT REPEAT THESE PATTERNS):\n${previousResponses}

        Latest User Message: ${userMessage.content}

        REGENERATION INSTRUCTIONS:
        IMPORTANT: Create a completely different response that:
        1. Uses entirely new wording, examples, and structure
        2. Takes a completely different approach or perspective
        3. Avoids ANY similarities with previous responses
        4. Uses a different tone and style
        5. Explores alternative ways to explain the same concept
        6. Maintains accuracy while being innovative

        Randomization Seed: ${Math.floor(Math.random() * 1000)}
        Generate a response that feels fresh and unexpected.
      `;
  
      const response = await generateResponse(enhancedPrompt, userMessage.model);
  
      setState((prev) => ({
        ...prev,
        messages: prev.messages.map((m, i) =>
          i === messageIndex
            ? {
                ...m,
                content: response,
                timestamp: new Date(),
              }
            : m
        ),
        loading: false,
      }));
  
      updateConversationContext(response);
      storePreviousResponse(response);
  
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Failed to regenerate response',
      }));
    }
  }, [state.messages, state.conversationContext, state.previousResponses, updateConversationContext, storePreviousResponse]);

  const editMessage = useCallback(async (messageId: string, newContent: string) => {
    const messageIndex = state.messages.findIndex((m) => m.id === messageId);
    if (messageIndex === -1) return;
  
    setState((prev) => ({
      ...prev,
      messages: prev.messages.map((m) =>
        m.id === messageId
          ? {
              ...m,
              content: newContent,
              timestamp: new Date(),
            }
          : m
      ),
    }));
  
    if (
      state.messages[messageIndex].role === 'user' &&
      messageIndex + 1 < state.messages.length &&
      state.messages[messageIndex + 1].role === 'assistant'
    ) {
      const updatedUserMessage = {
        ...state.messages[messageIndex],
        content: newContent,
      };
      
      const contextString = (state.conversationContext || []).join('\n');
      const previousResponses = (state.previousResponses || []).join('\n');

      const enhancedPrompt = `
        Conversation Context:\n${contextString}

        Previous Responses (DO NOT REPEAT THESE PATTERNS):\n${previousResponses}

        Edited User Message: ${updatedUserMessage.content}

        EDIT RESPONSE INSTRUCTIONS:
        IMPORTANT: Generate a completely fresh response that:
        1. Addresses the edited message with an entirely new approach
        2. Uses different examples, analogies, and explanations
        3. Changes the entire structure and flow
        4. Takes a unique perspective not seen in previous responses
        5. Maintains relevance while being creative
        6. Uses a different communication style

        Randomization Seed: ${Math.floor(Math.random() * 1000)}
        Ensure this response feels completely different from all previous ones.
      `;
  
      try {
        const response = await generateResponse(enhancedPrompt, updatedUserMessage.model);
  
        setState((prev) => ({
          ...prev,
          messages: prev.messages.map((m, i) =>
            i === messageIndex + 1
              ? {
                  ...m,
                  content: response,
                  timestamp: new Date(),
                }
              : m
          ),
        }));
  
        updateConversationContext(response);
        storePreviousResponse(response);
      } catch (error) {
        console.error('Failed to regenerate edited message response', error);
      }
    }
  }, [state.messages, state.conversationContext, state.previousResponses, updateConversationContext, storePreviousResponse]);

  const clearChat = useCallback(() => {
    setState((prev) => ({
      ...prev,
      messages: [],
      conversationContext: [],
      previousResponses: [], // Clear previous responses as well
    }));
  }, []);

  return {
    ...state,
    sendMessage,
    regenerateMessage,
    editMessage,
    clearChat,
  };
}