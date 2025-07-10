import { Router } from 'express';
import {
  createOrganisation,
  getMembers,
  getOrganisationDetails,
  getOrganisations,
  joinOrganisation,
  makeAdmin,
  removeMember,
  getOrganisationAnalytics,
  deleteOrganisation,
} from '../controllers/organisation.controller';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyAdmin } from '../middlewares/verifyAdmin';
import { upload } from '../middlewares/multer';
import { verifyMember } from '../middlewares/verifyMember';
const router = Router();

router.post(
  '/create',
  verifyToken,
  upload.single('avatar'),
  createOrganisation
);
router.get('/all', verifyToken, getOrganisations);
router.post('/join', verifyToken, joinOrganisation);
router.get('/:orgId', verifyToken, verifyMember, getOrganisationDetails);
router.delete('/:orgId', verifyToken, verifyAdmin, deleteOrganisation);

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
router.get(
  '/:orgId/analytics',
  verifyToken,
  verifyMember,
  getOrganisationAnalytics
);

export default router;
