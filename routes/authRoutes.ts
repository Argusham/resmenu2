import { Router } from 'express';
import { register, login, me } from '../controller/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', me); // Add this line

export default router;
