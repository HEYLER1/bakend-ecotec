/**
 * Servicio para manejo de tokens JWT
 * Genera y gestiona access tokens y refresh tokens
 */

import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types/auth.types';
import { AppConfig } from '../config/appConfiguracion';

// Generar tokens de acceso y refresh
export const generateTokens = (userId: number, username: string) => {
    const accessPayload: JWTPayload = {
        userId,
        username,
        type: 'access'
    };
    
    const refreshPayload: JWTPayload = {
        userId,
        username,
        type: 'refresh'
    };
    
    const accessToken = jwt.sign(accessPayload, AppConfig.secretKey, { expiresIn: '15m' });
    const refreshToken = jwt.sign(refreshPayload, AppConfig.refreshSecretKey, { expiresIn: '7d' });
    
    return { accessToken, refreshToken };
};