// routes/tipoRecoleccion.ts
import { Router } from 'express';
import { getTiposRecoleccion, getTipoRecoleccionById } from '../controllers/tipoRecoleccion.controller';
import validateToken from '../services/validate-token';

const router = Router();

router.get('/', validateToken, getTiposRecoleccion);
router.get('/:id', validateToken, getTipoRecoleccionById);

export default router;