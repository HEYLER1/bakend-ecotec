"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.post('/', user_1.newUser);
router.post('/login', user_1.loginUser);
exports.default = router;
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
//# sourceMappingURL=user.js.map