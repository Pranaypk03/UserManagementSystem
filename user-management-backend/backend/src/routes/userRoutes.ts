import { Router } from 'express';
import { register, login, getProfile, updateProfile, getUsers, getUserById } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile/edit', authMiddleware, updateProfile);
router.get('/users', authMiddleware, getUsers);
router.get('/users/:id', authMiddleware, getUserById);

export default router;
