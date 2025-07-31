import { Router } from 'express';
import {
  createTask,
  getTasks,
  updateTaskStatus,
  getUserTasksByOrganisation,
  getTaskById,
  deleteTask,
  updateTask,
} from '../controllers/task.controller';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyMember } from '../middlewares/verifyMember';

const router = Router({ mergeParams: true });
router.post('/create', verifyToken, verifyMember, createTask);
router.get('/all', verifyToken, verifyMember, getTasks);
router.patch('/update-status', verifyToken, verifyMember, updateTaskStatus);
router.put('/:taskId', verifyToken, verifyMember, updateTask);
router.get(
  '/user/:userId',
  verifyToken,
  verifyMember,
  getUserTasksByOrganisation
);
router.get('/:taskId', verifyToken, verifyMember, getTaskById);
router.delete('/:taskId', verifyToken, verifyMember, deleteTask);

export default router;
