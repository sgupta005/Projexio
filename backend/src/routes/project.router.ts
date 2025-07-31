import { Router } from 'express';
import {
  createProject,
  getProjectDetails,
  getProjects,
  getProjectAnalytics,
  deleteProject,
  updateProject,
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
router.put(
  '/:projectId',
  verifyToken,
  verifyMember,
  upload.single('avatar'),
  updateProject
);
router.get(
  '/:projectId/analytics',
  verifyToken,
  verifyMember,
  getProjectAnalytics
);
router.delete('/:projectId', verifyToken, verifyMember, deleteProject);

export default router;
