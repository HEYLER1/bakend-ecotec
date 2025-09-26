"use strict";
/**
 * Servicio para manejo de tokens JWT
 * Genera y gestiona access tokens y refresh tokens
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appConfiguracion_1 = require("../config/appConfiguracion");
// Generar tokens de acceso y refresh
const generateTokens = (userId, username) => {
    const accessPayload = {
        userId,
        username,
        type: 'access'
    };
    const refreshPayload = {
        userId,
        username,
        type: 'refresh'
    };
    const accessToken = jsonwebtoken_1.default.sign(accessPayload, appConfiguracion_1.AppConfig.secretKey, { expiresIn: '15m' });
    const refreshToken = jsonwebtoken_1.default.sign(refreshPayload, appConfiguracion_1.AppConfig.refreshSecretKey, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
//# sourceMappingURL=tokenService.js.map