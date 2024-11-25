export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    model: 'gemini-pro' | 'gemini-flash';
    timestamp: Date;
  }
  
  export interface ChatState {
    messages: Message[];
    loading: boolean;
    error: string | null;
    conversationContext?: string[]; // Optional conversation context
    currentEmotion?: 'neutral' | 'sad' | 'happy' | 'confused' | 'anxious';
    sensitivityLevel?: number; // 1-10 scale for emotional intelligence
    previousResponses: string[]; // Added for tracking previous responses
  }
  
  // Optional: Create a type for context management
  export interface ConversationContext {
    messages: string[];
    lastInteractionTimestamp: Date;
    emotionalTone: 'neutral' | 'positive' | 'negative' | 'mixed';
  }