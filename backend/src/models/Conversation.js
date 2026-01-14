import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true, index: true },
  messages: [{
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }],
  context: {
    sdk: {
      petOwnerName: String,
      petName: String,
      phoneNumber: String,
      source: String
    },
    flow: {
      mode: String,
      step: String,
      appointmentData: {
        petOwnerName: String,
        petName: String,
        phoneNumber: String,
        preferredDateTime: String
      }
    }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Conversation', conversationSchema);
