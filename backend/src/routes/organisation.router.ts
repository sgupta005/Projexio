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
import { verifyAdmin } from '../middlewares/verifyAdmin';
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

//members
router.get('/:id/members', verifyToken, getMembers);
router.get(
  '/:orgId/members/:memId/remove',
  verifyToken,
  verifyAdmin,
  removeMember
);
router.get(
  '/:orgId/members/:memId/makeAdmin',
  verifyToken,
  verifyAdmin,
  makeAdmin
);

export default router;
