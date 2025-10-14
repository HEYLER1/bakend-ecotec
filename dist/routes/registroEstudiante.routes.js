"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/registroEstudiante.routes.ts
const express_1 = require("express");
const registroEstudiante_controller_1 = require("../controllers/registroEstudiante.controller");
const validate_token_1 = __importDefault(require("../services/validate-token"));
const router = (0, express_1.Router)();
router.post('/', validate_token_1.default, registroEstudiante_controller_1.createRegistroEstudiante);
exports.default = router;
//# sourceMappingURL=registroEstudiante.routes.js.map