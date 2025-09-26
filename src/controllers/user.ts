/**
 * codigo general de controlador de usuario de login y registro 
 * Importa y centraliza todas las funciones de autenticación
 * aqui esyta el refreshToken y logout
 */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { JWTPayload } from '../types/auth.types';
import { AppConfig } from '../config/appConfiguracion';
import { generateTokens } from '../services/tokenService';
export { newUser } from './newUser.controller';
export { loginUser } from './loginUser.controller';
export const refreshToken = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.refreshToken || req.body.refreshToken;
        
        if (!token) {
            return res.status(401).json({
                msg: 'Refresh token no proporcionado'
            });
        }
        const decoded = jwt.verify(token, AppConfig.refreshSecretKey) as JWTPayload;
        
        if (decoded.type !== 'refresh') {
            return res.status(401).json({
                msg: 'Token inválido'
            });
        }
        const user = await User.findByPk(decoded.userId);
        
        if (!user) {
            return res.status(401).json({
                msg: 'Usuario no encontrado'
            });
        }
        
        if (!user.dataValues.activo) {
            return res.status(401).json({
                msg: 'Usuario inactivo. Contacte al administrador'
            });
        }
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(
            decoded.userId, 
            user.dataValues.email
        );
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        return res.json({
            accessToken,
            msg: 'Token renovado exitosamente'
        });
        
    } catch (error) {
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
export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('refreshToken');
        
        return res.json({
            msg: 'Logout exitoso'
        });
        
    } catch (error) {
        console.error('Error en logout:', error);
        return res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};