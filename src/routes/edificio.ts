// src/routes/edificio.ts
import { Router } from 'express';
import { getEdificios } from '../controllers/edificio.controller';
import validateToken from '../services/validate-token';

const router = Router();

router.get('/', validateToken, getEdificios);

export default router;