"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sede_controller_1 = require("../controllers/sede.controller");
const validate_token_1 = __importDefault(require("../services/validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, sede_controller_1.getSedes);
router.get('/:id', validate_token_1.default, sede_controller_1.getSedeById); // ✅ NUEVA RUTA
exports.default = router;
//# sourceMappingURL=sede.js.map