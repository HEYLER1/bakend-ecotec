/**
 * Servicio para manejo de tokens JWT
 * Genera y gestiona access tokens y refresh tokens
 */

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
};