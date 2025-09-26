import { Router } from 'express';
import { loginUser, newUser } from '../controllers/user';

const router = Router();

router.post('/', newUser);
router.post('/login', loginUser)

export default router;

// routes/authRoutes.ts
/*
import { Router } from 'express';
import { newUser, loginUser, refreshToken, logout } from '../controllers/user';
import { loginRateLimit, registerRateLimit } from '../middlewares/rateLimitMiddleware';

const router = Router();

// Rutas de autenticación con rate limiting
router.post('/register', registerRateLimit, newUser);
router.post('/login', loginRateLimit, loginUser);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

export default router;*/
