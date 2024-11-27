import { Router } from 'express';
import { createTask, getTasks } from '../controllers/task.controller';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyMember } from '../middlewares/verifyMember';

const router = Router({ mergeParams: true });
router.post('/create', verifyToken, verifyMember, createTask);
router.get('/all', verifyToken, verifyMember, getTasks);

export default router;
