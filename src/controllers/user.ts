/**
 * Código general de controlador de usuario de login y registro 
 * Importa y centraliza todas las funciones de autenticación
 * Aquí está el refreshToken y logout
 */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/user';
import { Perfil } from '../models/role';
import { JWTPayload } from '../types/auth.types';
import { AppConfig } from '../config/appConfiguracion';
import { generateTokens } from '../services/tokenService';

export { newUser } from './newUser.controller';
export { loginUser } from './loginUser.controller';

/**
 * Renovar access token usando refresh token
 */
export const refreshToken = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.refreshToken || req.body.refreshToken;
        
        if (!token) {
            return res.status(401).json({
                msg: 'Refresh token no proporcionado'
            });
        }

        // Verificar el refresh token
        const decoded = jwt.verify(token, AppConfig.refreshSecretKey) as JWTPayload;
        
        if (decoded.type !== 'refresh') {
            return res.status(401).json({
                msg: 'Token inválido - No es un refresh token'
            });
        }

        // Buscar usuario con su perfil
        const usuario: any = await Usuario.findOne({
            where: { id_usuario: decoded.id_usuario }, // 👈 Cambiado de userId a id_usuario
            attributes: ['id_usuario', 'email', 'estado', 'perfil_id'],
            include: [{
                model: Perfil,
                as: 'perfil',
                attributes: ['nombre']
            }]
        });
        
        if (!usuario) {
            return res.status(401).json({
                msg: 'Usuario no encontrado'
            });
        }
        
        // Verificar si el usuario está activo
        if (usuario.estado === 0) { // 👈 Cambiado de activo a estado
            return res.status(403).json({
                msg: 'Usuario inactivo. Contacte al administrador'
            });
        }

        // Generar nuevos tokens
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(
            usuario.id_usuario,  // 👈 Cambiado de userId a id_usuario
            usuario.email,
            usuario.perfil?.nombre // 👈 Incluir el nombre del perfil
        );

        // Configurar cookie con el nuevo refresh token
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
        });
        
        return res.json({
            token: accessToken, // 👈 Cambiado de accessToken a token para consistencia
            message: 'Token renovado exitosamente'
        });
        
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                msg: 'Refresh token expirado'
            });
        }
        
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                msg: 'Refresh token inválido'
            });
        }
        
        console.error('Error al renovar token:', error);
        return res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};

/**
 * Cerrar sesión - eliminar refresh token
 */
export const logout = async (req: Request, res: Response) => {
    try {
        // Limpiar la cookie del refresh token
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        
        return res.json({
            success: true,
            message: 'Logout exitoso'
        });
        
    } catch (error) {
        console.error('Error en logout:', error);
        return res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};