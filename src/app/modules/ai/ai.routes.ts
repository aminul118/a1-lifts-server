import { Router } from 'express';
import { AIControllers } from './ai.controller';

const router = Router();

router.post('/chat', AIControllers.createChat);
router.post('/create', AIControllers.createStats);
router.get('/get-all', AIControllers.getStats);
router.delete('/:id', AIControllers.deleteAiData);

export const AIRoutes = router;
