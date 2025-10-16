import { Router } from 'express';
import { getSedes, getSedeById } from '../controllers/sede.controller';
import validateToken from '../services/validate-token';

const router = Router();

router.get('/', validateToken, getSedes);
router.get('/:id', validateToken, getSedeById); // ✅ NUEVA RUTA

export default router;