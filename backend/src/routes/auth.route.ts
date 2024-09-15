import { Router } from 'express';
import {
  getCurrentUser,
  googleAuth,
  login,
  logout,
  signup,
} from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/user', verifyToken, getCurrentUser);
router.get('/logout', logout);
router.post('/google', googleAuth);

export default router;
