import { Router } from 'express';
import { createOrGetAgent, getAgentConfig, getConversationToken } from '../controllers/agentController.js';

const router = Router();

router.get('/status', getAgentConfig);
router.post('/', createOrGetAgent);
router.post('/session', getConversationToken);

export default router;