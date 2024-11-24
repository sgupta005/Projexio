import { Router } from 'express';
import {
  createProject,
  getProjectDetails,
  getProjects,
} from '../controllers/project.controller';
import { verifyMember } from '../middlewares/verifyMember';
import { verifyToken } from '../middlewares/verifyToken';
import { upload } from '../middlewares/multer';

const router = Router({ mergeParams: true });

router.get('/all', verifyToken, verifyMember, getProjects);
router.get('/:projectId', verifyToken, verifyMember, getProjectDetails);
router.post(
  '/create',
  verifyToken,
  verifyMember,
  upload.single('avatar'),
  createProject
);

export default router;
