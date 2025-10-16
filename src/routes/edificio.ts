// src/routes/edificio.ts
/*import { Router } from 'express';
import { getEdificiosBySede } from '../controllers/edificio.controller';
import validateToken from '../services/validate-token';

const router = Router();

router.get('/', validateToken, getEdificiosBySede);

export default router;*/
// src/routes/edificio.ts
import { Router } from 'express';
import { getEdificios, getEdificiosBySede } from '../controllers/edificio.controller';
import validateToken from '../services/validate-token';

const router = Router();

// ✅ Orden IMPORTANTE: la ruta más específica primero
router.get('/sede/:id_sede', validateToken, getEdificiosBySede);
router.get('/', validateToken, getEdificios);

export default router;