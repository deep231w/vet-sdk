import express from 'express';
import { sendMessage, getConversation } from '../controllers/chatController.js';

const router = express.Router();

router.post('/message', sendMessage);
router.get('/conversation/:sessionId', getConversation);

export default router;
