// src/routes/registroPersonal.ts
// routes/registroPersonal.ts
import { Router } from 'express';
import { 
    createRegistroPersonal,
    getRegistrosPersonal,
    getRegistroById,
    updateRegistroPersonal,
    deleteRegistroPersonal
} from '../controllers/registroPersonal.controller';
import validateToken from '../services/validate-token';

const router = Router();

// ✅ Rutas para registro de personal
router.post('/', validateToken, createRegistroPersonal);
router.get('/', validateToken, getRegistrosPersonal);
router.get('/:id', validateToken, getRegistroById);
router.put('/:id', validateToken, updateRegistroPersonal);
router.delete('/:id', validateToken, deleteRegistroPersonal);

export default router;

/*import { Router } from 'express';
import { createRegistroPersonal } from '../controllers/registroPersonal.controller';
import validateToken from '../services/validate-token';

const router = Router();

router.post('/', validateToken, createRegistroPersonal);

export default router;*/