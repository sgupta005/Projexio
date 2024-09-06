import { Router } from 'express';
import {
  login,
  logout,
  signup,
  verifyLogin,
} from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/verify-login', verifyToken, verifyLogin);
router.get('/logout', logout);

export default router;
