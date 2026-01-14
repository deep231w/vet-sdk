import { handleAppointmentFlow } from '../handler/appointmentHandler.js';
import Conversation from '../models/Conversation.js';
import aiService from '../services/aiService.js';
import { v4 as uuidv4 } from 'uuid';

export const sendMessage = async (req, res, next) => {
  try {
    const { message, sessionId: providedSessionId, context } = req.body;

    console.log("context in sendmessage - ", context);
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const sessionId = providedSessionId || uuidv4();
    
    let conversation = await Conversation.findOne({ sessionId });
    
    if (!conversation) {
      conversation = new Conversation({
        sessionId,
        messages: [],
        context: {
          sdk: context || {},
          flow: null
        }
      });
    }

    conversation.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date(),
      context: {
          sdk: context || {}
        }
    });

    //appointment flow handle
    if(conversation.context?.flow?.mode ==='appointment'){
      const reply= await handleAppointmentFlow(conversation , message);

      await conversation.save();
      return res.json({
        sessionId,
        message: reply,
        timestamp: new Date()
      })
    }

    //new appointment detection
    if (aiService.detectAppointmentIntent(message)) {
      conversation.context.flow = {
        mode: 'appointment',
        step: 'petOwnerName',
        appointmentData: {}
      };

      await conversation.save();

      return res.json({
        sessionId,
        message: "Sure! Let's book an appointment 🐾\nWhat is the pet owner's name?"
      });
    }

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
