// src/routes/tipoRecoleccion.ts
import { Router } from 'express';
import { getTiposRecoleccion } from '../controllers/tipoRecoleccion.controller';
import validateToken from '../services/validate-token';

const router = Router();

router.get('/', validateToken, getTiposRecoleccion);

export default router;