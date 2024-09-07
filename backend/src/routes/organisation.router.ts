import { Router } from 'express';
import {
  createOrganisation,
  getOrganisations,
} from '../controllers/organisation.controller';
import { verifyToken } from '../middlewares/verifyToken';
const router = Router();

router.post('/create', verifyToken, createOrganisation);
router.get('/all', verifyToken, getOrganisations);
export default router;
