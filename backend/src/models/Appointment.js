import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, ref: 'Conversation' },
  petOwnerName: { type: String, required: true },
  petName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  preferredDateTime: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Appointment', appointmentSchema);
