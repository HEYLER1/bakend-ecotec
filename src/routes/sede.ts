// src/routes/sede.ts
import { Router } from 'express';
import { getSedes } from '../controllers/sede.controller';
import validateToken from '../services/validate-token';

const router = Router();

router.get('/', validateToken, getSedes);

export default router;