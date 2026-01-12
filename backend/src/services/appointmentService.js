import Appointment from '../models/Appointment.js';

class AppointmentService {
  async createAppointment(appointmentData) {
    const appointment = new Appointment(appointmentData);
    await appointment.save();
    return appointment;
  }

  async getAppointmentsBySession(sessionId) {
    return await Appointment.find({ sessionId }).sort({ createdAt: -1 });
  }

  async getAllAppointments() {
    return await Appointment.find().sort({ createdAt: -1 });
  }

  validateAppointmentData(data) {
    const { petOwnerName, petName, phoneNumber, preferredDateTime } = data;
    
    if (!petOwnerName || petOwnerName.trim().length < 2) {
      return { valid: false, error: 'Pet owner name is required (min 2 characters)' };
    }
    if (!petName || petName.trim().length < 2) {
      return { valid: false, error: 'Pet name is required (min 2 characters)' };
    }
    if (!phoneNumber || !/^\+?[\d\s\-()]{10,}$/.test(phoneNumber)) {
      return { valid: false, error: 'Valid phone number is required' };
    }
    if (!preferredDateTime || new Date(preferredDateTime) < new Date()) {
      return { valid: false, error: 'Preferred date/time must be in the future' };
    }
    
    return { valid: true };
  }
}

export default new AppointmentService();
