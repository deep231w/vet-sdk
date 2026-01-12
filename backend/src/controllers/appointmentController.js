import appointmentService from '../services/appointmentService.js';

export const createAppointment = async (req, res, next) => {
  try {
    const { sessionId, petOwnerName, petName, phoneNumber, preferredDateTime } = req.body;

    const validation = appointmentService.validateAppointmentData(req.body);
    
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const appointment = await appointmentService.createAppointment({
      sessionId,
      petOwnerName,
      petName,
      phoneNumber,
      preferredDateTime: new Date(preferredDateTime)
    });

    res.status(201).json({
      success: true,
      appointment,
      message: 'Appointment booked successfully!'
    });
  } catch (error) {
    next(error);
  }
};

export const getAppointments = async (req, res, next) => {
  try {
    const appointments = await appointmentService.getAllAppointments();
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};
