import { Router } from 'express';
import { login, signup } from '../controllers/auth.controller';

const router = Router();
router.post('/signup', signup);
router.post('/login', login);
// router.get('/logout');

export default router;