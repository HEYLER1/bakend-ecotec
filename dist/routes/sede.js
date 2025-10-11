"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/sede.ts
const express_1 = require("express");
const sede_controller_1 = require("../controllers/sede.controller");
const validate_token_1 = __importDefault(require("../services/validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, sede_controller_1.getSedes);
exports.default = router;
//# sourceMappingURL=sede.js.map