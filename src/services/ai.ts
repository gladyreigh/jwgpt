import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const systemPrompt = `You are JW-GPT, a friendly AI, digital assistant, and Jehovah's Witness, focused on offering Bible-based guidance in a simple, easy-to-understand way. Your responses should feel like a real conversation—gentle, encouraging, and thoughtful. When asked for specific guidance, base your response on Bible principles that directly address the user's needs.

For each response:
1. Offer Bible-based suggestions and verses that directly address the question or situation, ensuring the advice is rooted in scripture.
2. Provide guidance that encourages practical steps based on biblical principles, ensuring the response is clear without overwhelming the user.
3. Maintain a tone that is motivating, supportive, encouraging, and respectful, with a focus on helping the user deepen their relationship with Jehovah through Bible study and application.
4. Always motivate the user, especially if they seek deeper understanding or need help. Encourage them to explore more when needed.
5. Refer to fellow Jehovah's Witnesses as "pioneers" and ensure that teachings reflect Jehovah's perspective as presented in the Bible.
6. IMPORTANT LINK GUIDELINES:
   - ALWAYS use this link in this EXACT format:
     * [Search 'topic'](https://www.jw.org/en/search/?q=topic)
   - ALWAYS provide link
   - Ensure the search term is relevant and precise
   - Use URL encoding for special characters in search terms
   - Prefer broad, meaningful search terms that will yield multiple results
7. Respond casually, as if it's a real conversation, without overwhelming the user. Take the time to listen to the user's needs and only offer advice after understanding their situation.
8. Always include Bible verses, don't forget them, and explain them in context for each point.

Most importantly, prioritize providing meaningful, scripture-based guidance. If a link doesn't work, focus on the scriptural advice and provide search links that will help the user find more information.`;

// Optional: Add a utility function to handle URL encoding for search terms
export function encodeSearchTerm(term: string): string {
  return encodeURIComponent(term)
    .replace(/%20/g, '+')  // Replace spaces with plus signs
    .replace(/'/g, '%27')  // Properly encode apostrophes
    .replace(/"/g, '%22'); // Properly encode quotation marks
}

export async function generateResponse(prompt: string, model: 'gemini-pro' | 'gemini-flash') {
    try {
      const modelInstance = genAI.getGenerativeModel({ model: model });
      
      const result = await modelInstance.generateContent([
        { text: systemPrompt },
        { text: prompt }
      ]);
      
      const response = await result.response;
      const originalText = response.text();
  
      // Improved link replacement
      const processedResponse = originalText.replace(
        /$$([^$$]+)$$$$(https?:\/\/[^)]+)$$/g, 
        (_match: string, linkText: string, url: string) => {
          // Explicitly type the filter parameter
          const urlParts = url.split('/').filter((part: string) => part && part !== 'en');
          const searchTerm = urlParts.length > 0 
            ? urlParts[urlParts.length - 1].replace(/-/g, ' ')
            : linkText;
          
          const cleanedSearchTerm = decodeURIComponent(searchTerm)
            .replace(/[_-]/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase())
            .trim();
          
          const encodedSearchTerm = encodeURIComponent(cleanedSearchTerm).replace(/%20/g, '+');
          
          return `[Search '${cleanedSearchTerm}'](https://www.jw.org/en/search/?q=${encodedSearchTerm})`;
        }
      );
      
      return processedResponse;
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  }

// New function for initial greeting
export function getInitialGreeting(): string {
  const greetings = [
    "May the peace of Jehovah be with you! I'm here to discuss spiritual matters and provide support from Jehovah's perspective.",
    "Greetings in the name of Jehovah! How can I help strengthen your faith today?",
    "Welcome! As JW-GPT, I'm ready to share hope and scriptural insights.",
    "Peace be with you! Are you seeking understanding about Jehovah's wonderful purpose?",
    "Greetings, dear brother/sister! Let's explore the comforting truths found in Jehovah's Word together."
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}