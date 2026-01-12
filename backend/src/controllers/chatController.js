import Conversation from '../models/Conversation.js';
import aiService from '../services/aiService.js';
import { v4 as uuidv4 } from 'uuid';

export const sendMessage = async (req, res, next) => {
  try {
    const { message, sessionId: providedSessionId, context } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const sessionId = providedSessionId || uuidv4();
    
    let conversation = await Conversation.findOne({ sessionId });
    
    if (!conversation) {
      conversation = new Conversation({
        sessionId,
        messages: [],
        context: context || {}
      });
    }

    conversation.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    const aiResponse = await aiService.generateResponse(message, conversation.messages);

    conversation.messages.push({
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    });

    conversation.updatedAt = new Date();
    await conversation.save();

    res.json({
      sessionId: conversation.sessionId,
      message: aiResponse,
      timestamp: new Date()
    });
  } catch (error) {
    next(error);
  }
};

export const getConversation = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const conversation = await Conversation.findOne({ sessionId });
    
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json(conversation);
  } catch (error) {
    next(error);
  }
};
