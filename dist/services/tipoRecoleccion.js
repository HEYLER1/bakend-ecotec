"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/tipoRecoleccion.ts
const express_1 = require("express");
const tipoRecoleccion_controller_1 = require("../controllers/tipoRecoleccion.controller");
const validate_token_1 = __importDefault(require("../routes/validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, tipoRecoleccion_controller_1.getTiposRecoleccion);
exports.default = router;
//# sourceMappingURL=tipoRecoleccion.js.map