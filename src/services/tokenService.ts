
// services/tokenService.ts
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types/auth.types';
import { AppConfig } from '../config/appConfiguracion';

/**
 * Genera access token y refresh token para un usuario
 * @param id_usuario: number; - ID del usuario (id_usuario)
 * @param email - Email del usuario
 * @param perfil - Nombre del perfil obtenido de la relación (usuario.perfil.nombre)
 * @returns Objeto con accessToken y refreshToken
 */
export const generateTokens = (id_usuario:  number, email: string, perfil?: string) => {
    // Validar que las claves secretas existan
    if (!AppConfig.secretKey || !AppConfig.refreshSecretKey) {
        throw new Error('Las claves secretas JWT no están configuradas');
    }

    // Payload base compartido
    const basePayload = {
        id_usuario,
        email,
        ...(perfil && { perfil }) // Incluir nombre del perfil si existe
    };
    
    // Access Token Payload
    const accessPayload: JWTPayload = {
        ...basePayload,
        type: 'access'
    };
    
    // Refresh Token Payload
    const refreshPayload: JWTPayload = {
        ...basePayload,
        type: 'refresh'
    };
    
    try {
        const accessToken = jwt.sign(
            accessPayload, 
            AppConfig.secretKey, 
            { 
                expiresIn: '15m',
                algorithm: 'HS256'
            }
        );
        
        const refreshToken = jwt.sign(
            refreshPayload, 
            AppConfig.refreshSecretKey, 
            { 
                expiresIn: '7d',
                algorithm: 'HS256'
            }
        );
        
        return { accessToken, refreshToken };
    } catch (error) {
        console.error('Error al generar tokens:', error);
        throw new Error('No se pudieron generar los tokens de autenticación');
    }
};

/**
 * Verifica y decodifica un access token
 */
export const verifyAccessToken = (token: string): JWTPayload => {
    if (!AppConfig.secretKey) {
        throw new Error('La clave secreta JWT no está configurada');
    }

    try {
        const decoded = jwt.verify(token, AppConfig.secretKey) as JWTPayload;
        
        if (decoded.type !== 'access') {
            throw new Error('Token inválido: no es un access token');
        }
        
        return decoded;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Token expirado');
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new Error('Token inválido');
        }
        throw error;
    }
};

/**
 * Verifica y decodifica un refresh token
 */
export const verifyRefreshToken = (token: string): JWTPayload => {
    if (!AppConfig.refreshSecretKey) {
        throw new Error('La clave secreta de refresh no está configurada');
    }

    try {
        const decoded = jwt.verify(token, AppConfig.refreshSecretKey) as JWTPayload;
        
        if (decoded.type !== 'refresh') {
            throw new Error('Token inválido: no es un refresh token');
        }
        
        return decoded;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Refresh token expirado');
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new Error('Refresh token inválido');
        }
        throw error;
    }
};

/**
 * Genera un nuevo access token usando un refresh token válido
 */
export const refreshAccessToken = (refreshToken: string): string => {
    const decoded = verifyRefreshToken(refreshToken);
    
    const accessPayload: JWTPayload = {
        id_usuario: decoded.id_usuario,
        email: decoded.email,
        ...(decoded.perfil && { perfil: decoded.perfil }),
        type: 'access'
    };
    
    if (!AppConfig.secretKey) {
        throw new Error('La clave secreta JWT no está configurada');
    }
    
    return jwt.sign(accessPayload, AppConfig.secretKey, { 
        expiresIn: '15m',
        algorithm: 'HS256'
    });
};

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