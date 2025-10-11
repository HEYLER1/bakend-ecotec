"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/profile.ts o routes/perfil.ts
const express_1 = require("express");
const Perfil_Controller_1 = require("../controllers/Perfil.Controller"); // 👈 Verifica la ruta
const validate_token_1 = __importDefault(require("../services/validate-token")); // 👈 Verifica la importación
const router = (0, express_1.Router)();
router.get('/me', validate_token_1.default, Perfil_Controller_1.getProfile);
exports.default = router;
//# sourceMappingURL=perfil.js.map