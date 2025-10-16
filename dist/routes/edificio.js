"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/edificio.ts
/*import { Router } from 'express';
import { getEdificiosBySede } from '../controllers/edificio.controller';
import validateToken from '../services/validate-token';

const router = Router();

router.get('/', validateToken, getEdificiosBySede);

export default router;*/
// src/routes/edificio.ts
const express_1 = require("express");
const edificio_controller_1 = require("../controllers/edificio.controller");
const validate_token_1 = __importDefault(require("../services/validate-token"));
const router = (0, express_1.Router)();
// ✅ Orden IMPORTANTE: la ruta más específica primero
router.get('/sede/:id_sede', validate_token_1.default, edificio_controller_1.getEdificiosBySede);
router.get('/', validate_token_1.default, edificio_controller_1.getEdificios);
exports.default = router;
//# sourceMappingURL=edificio.js.map