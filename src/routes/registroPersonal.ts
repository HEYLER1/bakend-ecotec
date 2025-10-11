// src/routes/registroPersonal.ts
import { Router } from 'express';
import { createRegistroPersonal } from '../controllers/registroPersonal.controller';
import validateToken from '../services/validate-token';

const router = Router();

router.post('/', validateToken, createRegistroPersonal);

export default router;