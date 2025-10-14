// routes/registroEstudiante.routes.ts
import { Router } from 'express';
import { createRegistroEstudiante } from '../controllers/registroEstudiante.controller';
import validateToken from '../services/validate-token';

const router = Router();

router.post('/', validateToken, createRegistroEstudiante);

export default router;