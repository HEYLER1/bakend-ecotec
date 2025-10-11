import { JWTPayload } from '../types/auth.types';
/**
 * Genera access token y refresh token para un usuario
 * @param id_usuario: number; - ID del usuario (id_usuario)
 * @param email - Email del usuario
 * @param perfil - Nombre del perfil obtenido de la relación (usuario.perfil.nombre)
 * @returns Objeto con accessToken y refreshToken
 */
export declare const generateTokens: (id_usuario: number, email: string, perfil?: string) => {
    accessToken: string;
    refreshToken: string;
};
/**
 * Verifica y decodifica un access token
 */
export declare const verifyAccessToken: (token: string) => JWTPayload;
/**
 * Verifica y decodifica un refresh token
 */
export declare const verifyRefreshToken: (token: string) => JWTPayload;
/**
 * Genera un nuevo access token usando un refresh token válido
 */
export declare const refreshAccessToken: (refreshToken: string) => string;
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
//# sourceMappingURL=tokenService.d.ts.map