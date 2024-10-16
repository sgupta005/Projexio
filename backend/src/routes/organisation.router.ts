import { Router } from 'express';
import {
  createOrganisation,
  getOrganisations,
  joinOrganisation,
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
export default router;
