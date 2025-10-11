// routes/profile.ts o routes/perfil.ts
import { Router } from 'express';
import { getProfile } from '../controllers/Perfil.Controller'; // 👈 Verifica la ruta
import validateToken from '../services/validate-token'; // 👈 Verifica la importación

const router = Router();

router.get('/me', validateToken, getProfile);

export default router;