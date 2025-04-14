import { Router } from 'express';
import {
  createTask,
  getTasks,
  updateTaskStatus,
  getUserTasksByOrganisation,
} from '../controllers/task.controller';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyMember } from '../middlewares/verifyMember';

const router = Router({ mergeParams: true });
router.post('/create', verifyToken, verifyMember, createTask);
router.get('/all', verifyToken, verifyMember, getTasks);
router.patch('/update-status', verifyToken, verifyMember, updateTaskStatus);
router.get(
  '/user/:userId',
  verifyToken,
  verifyMember,
  getUserTasksByOrganisation
);

export default router;
