"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateTokens = void 0;
// services/tokenService.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appConfiguracion_1 = require("../config/appConfiguracion");
/**
 * Genera access token y refresh token para un usuario
 * @param id_usuario: number; - ID del usuario (id_usuario)
 * @param email - Email del usuario
 * @param perfil - Nombre del perfil obtenido de la relación (usuario.perfil.nombre)
 * @returns Objeto con accessToken y refreshToken
 */
const generateTokens = (id_usuario, email, perfil) => {
    // Validar que las claves secretas existan
    if (!appConfiguracion_1.AppConfig.secretKey || !appConfiguracion_1.AppConfig.refreshSecretKey) {
        throw new Error('Las claves secretas JWT no están configuradas');
    }
    // Payload base compartido
    const basePayload = {
        id_usuario,
        email,
        ...(perfil && { perfil }) // Incluir nombre del perfil si existe
    };
    // Access Token Payload
    const accessPayload = {
        ...basePayload,
        type: 'access'
    };
    // Refresh Token Payload
    const refreshPayload = {
        ...basePayload,
        type: 'refresh'
    };
    try {
        const accessToken = jsonwebtoken_1.default.sign(accessPayload, appConfiguracion_1.AppConfig.secretKey, {
            expiresIn: '15m',
            algorithm: 'HS256'
        });
        const refreshToken = jsonwebtoken_1.default.sign(refreshPayload, appConfiguracion_1.AppConfig.refreshSecretKey, {
            expiresIn: '7d',
            algorithm: 'HS256'
        });
        return { accessToken, refreshToken };
    }
    catch (error) {
        console.error('Error al generar tokens:', error);
        throw new Error('No se pudieron generar los tokens de autenticación');
    }
};
exports.generateTokens = generateTokens;
/**
 * Verifica y decodifica un access token
 */
const verifyAccessToken = (token) => {
    if (!appConfiguracion_1.AppConfig.secretKey) {
        throw new Error('La clave secreta JWT no está configurada');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, appConfiguracion_1.AppConfig.secretKey);
        if (decoded.type !== 'access') {
            throw new Error('Token inválido: no es un access token');
        }
        return decoded;
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw new Error('Token expirado');
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            throw new Error('Token inválido');
        }
        throw error;
    }
};
exports.verifyAccessToken = verifyAccessToken;
/**
 * Verifica y decodifica un refresh token
 */
const verifyRefreshToken = (token) => {
    if (!appConfiguracion_1.AppConfig.refreshSecretKey) {
        throw new Error('La clave secreta de refresh no está configurada');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, appConfiguracion_1.AppConfig.refreshSecretKey);
        if (decoded.type !== 'refresh') {
            throw new Error('Token inválido: no es un refresh token');
        }
        return decoded;
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw new Error('Refresh token expirado');
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            throw new Error('Refresh token inválido');
        }
        throw error;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
/**
 * Genera un nuevo access token usando un refresh token válido
 */
const refreshAccessToken = (refreshToken) => {
    const decoded = (0, exports.verifyRefreshToken)(refreshToken);
    const accessPayload = {
        id_usuario: decoded.id_usuario,
        email: decoded.email,
        ...(decoded.perfil && { perfil: decoded.perfil }),
        type: 'access'
    };
    if (!appConfiguracion_1.AppConfig.secretKey) {
        throw new Error('La clave secreta JWT no está configurada');
    }
    return jsonwebtoken_1.default.sign(accessPayload, appConfiguracion_1.AppConfig.secretKey, {
        expiresIn: '15m',
        algorithm: 'HS256'
    });
};
exports.refreshAccessToken = refreshAccessToken;
/**
 * Servicio para manejo de tokens JWT
 * Genera y gestiona access tokens y refresh tokens
 

import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types/auth.types';
import { AppConfig } from '../config/appConfiguracion';

// Generar tokens de acceso y refresh
export const generateTokens = (userId: number, email: string, roleName?: string) => {
    const accessPayload: JWTPayload = {
        userId,
        email,
        ...(roleName && { roleName }), // 👈 Solo incluye roleName si existe
        type: 'access'
    };
    
    const refreshPayload: JWTPayload = {
        userId,
        email,
        ...(roleName && { roleName }), // 👈 Solo incluye roleName si existe
        type: 'refresh'
    };
    
    const accessToken = jwt.sign(accessPayload, AppConfig.secretKey, { expiresIn: '15m' });
    const refreshToken = jwt.sign(refreshPayload, AppConfig.refreshSecretKey, { expiresIn: '7d' });
    
    return { accessToken, refreshToken };
};*/ 
//# sourceMappingURL=tokenService.js.map