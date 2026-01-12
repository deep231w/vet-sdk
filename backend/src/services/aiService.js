import { getGeminiModel, SYSTEM_PROMPT } from '../config/gemini.js';

class AIService {
  constructor() {
    this.model = getGeminiModel();
  }

  async generateResponse(userMessage, conversationHistory = []) {
    try {
      const context = conversationHistory
        .slice(-6)
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      const prompt = `${SYSTEM_PROMPT}\n\nConversation:\n${context}\nuser: ${userMessage}\nassistant:`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  detectAppointmentIntent(message) {
    const keywords = ['appointment', 'schedule', 'book', 'visit', 'consultation', 'see a vet', 'meet'];
    return keywords.some(keyword => message.toLowerCase().includes(keyword));
  }
}

export default new AIService();
