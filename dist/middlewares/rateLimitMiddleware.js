"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRateLimit = exports.loginRateLimit = void 0;
// middlewares/rateLimitMiddleware.ts
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Rate limiting para login (máximo 5 intentos por IP cada 15 minutos)
exports.loginRateLimit = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // máximo 5 intentos por ventana de tiempo
    message: {
        msg: 'Demasiados intentos de login. Intenta nuevamente en 15 minutos'
    },
    standardHeaders: true,
    legacyHeaders: false,
    // Solo aplicar rate limit si el login falla
    skipSuccessfulRequests: true
});
// Rate limiting general para registro (más permisivo)
exports.registerRateLimit = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10, // máximo 10 registros por IP cada 15 minutos
    message: {
        msg: 'Demasiados intentos de registro. Intenta nuevamente en 15 minutos'
    },
    standardHeaders: true,
    legacyHeaders: false
});
//# sourceMappingURL=rateLimitMiddleware.js.map