import { Router } from 'express';
import {
  getCurrentUser,
  googleAuth,
  login,
  logout,
  signup,
  updateUser,
} from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/verifyToken';
import { upload } from '../middlewares/multer';

const router = Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/user', verifyToken, getCurrentUser);
router.put('/user', verifyToken, upload.single('avatar'), updateUser);
router.get('/logout', logout);
router.post('/google', googleAuth);

export default router;
