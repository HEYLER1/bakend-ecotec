"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/registroPersonal.ts
// routes/registroPersonal.ts
const express_1 = require("express");
const registroPersonal_controller_1 = require("../controllers/registroPersonal.controller");
const validate_token_1 = __importDefault(require("../services/validate-token"));
const router = (0, express_1.Router)();
// ✅ Rutas para registro de personal
router.post('/', validate_token_1.default, registroPersonal_controller_1.createRegistroPersonal);
router.get('/', validate_token_1.default, registroPersonal_controller_1.getRegistrosPersonal);
router.get('/:id', validate_token_1.default, registroPersonal_controller_1.getRegistroById);
router.put('/:id', validate_token_1.default, registroPersonal_controller_1.updateRegistroPersonal);
router.delete('/:id', validate_token_1.default, registroPersonal_controller_1.deleteRegistroPersonal);
exports.default = router;
/*import { Router } from 'express';
import { createRegistroPersonal } from '../controllers/registroPersonal.controller';
import validateToken from '../services/validate-token';

const router = Router();

router.post('/', validateToken, createRegistroPersonal);

export default router;*/ 
//# sourceMappingURL=registroPersonal.js.map