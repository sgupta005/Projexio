import { Router } from 'express';
import {
  createOrganisation,
  getMembers,
  getOrganisations,
  joinOrganisation,
  makeAdmin,
  removeMember,
} from '../controllers/organisation.controller';
import { verifyToken } from '../middlewares/verifyToken';
import { upload } from '../middlewares/multer';
const router = Router();

router.post(
  '/create',
  verifyToken,
  upload.single('avatar'),
  createOrganisation
);
router.get('/all', verifyToken, getOrganisations);
router.post('/join', verifyToken, joinOrganisation);
router.get('/:id/members', verifyToken, getMembers);
router.get('/:orgId/members/:memId/remove', verifyToken, removeMember);
router.get('/:orgId/members/:memId/makeAdmin', verifyToken, makeAdmin);
export default router;
