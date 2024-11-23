import { Router } from 'express';
import { createProject, getProjects } from '../controllers/project.controller';
import { verifyMember } from '../middlewares/verifyMember';
import { verifyToken } from '../middlewares/verifyToken';
import { upload } from '../middlewares/multer';

const router = Router({ mergeParams: true });

router.get('/all', verifyToken, verifyMember, getProjects);
router.post(
  '/create',
  verifyToken,
  verifyMember,
  upload.single('avatar'),
  createProject
);

export default router;
