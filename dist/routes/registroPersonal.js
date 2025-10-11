"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/registroPersonal.ts
const express_1 = require("express");
const registroPersonal_controller_1 = require("../controllers/registroPersonal.controller");
const validate_token_1 = __importDefault(require("../services/validate-token"));
const router = (0, express_1.Router)();
router.post('/', validate_token_1.default, registroPersonal_controller_1.createRegistroPersonal);
exports.default = router;
//# sourceMappingURL=registroPersonal.js.map