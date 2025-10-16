"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/tipoRecoleccion.ts
const express_1 = require("express");
const tipoRecoleccion_controller_1 = require("../controllers/tipoRecoleccion.controller");
const validate_token_1 = __importDefault(require("../services/validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, tipoRecoleccion_controller_1.getTiposRecoleccion);
router.get('/:id', validate_token_1.default, tipoRecoleccion_controller_1.getTipoRecoleccionById);
exports.default = router;
//# sourceMappingURL=tipoRecoleccion.js.map