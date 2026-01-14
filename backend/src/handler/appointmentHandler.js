import appointmentService from "../services/appointmentService.js";

export async function handleAppointmentFlow(conversation, userMessage) {
  const ctx = conversation.context.flow;
  const data = ctx.appointmentData;

  switch (ctx.step) {
    case 'petOwnerName':
      data.petOwnerName = userMessage;
      ctx.step = 'petName';
      return "Great! What's your pet's name?";

    case 'petName':
      data.petName = userMessage;
      ctx.step = 'phoneNumber';
      return "Please share your phone number 📞";

    case 'phoneNumber':
      data.phoneNumber = userMessage;
      ctx.step = 'preferredDateTime';
      return "When would you like to visit? (date & time)";

    case 'preferredDateTime':
      data.preferredDateTime = userMessage;

      const validation = appointmentService.validateAppointmentData(data);
      if (!validation.valid) return validation.error;

      await appointmentService.createAppointment({
        ...data,
        sessionId: conversation.sessionId
      });

      conversation.context.flow = null;
      return "✅ Your appointment has been booked! Our team will contact you shortly.";

    default:
      conversation.context.flow = null;
      return "Something went wrong. Let's start again.";
  }
}
