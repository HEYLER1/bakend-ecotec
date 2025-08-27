/**
 * Controlador de autenticación
 * Maneja las rutas HTTP para registro, login, refresh token y logout
 */

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { JWTPayload, UserInstance } from '../types/auth.types';
import { AppConfig } from '../config/appConfiguracion';
import { generateTokens } from '../services/tokenService';

export const newUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({
                msg: 'Username y password son requeridos'
            });
        }
        
        if (password.length < 6) {
            return res.status(400).json({
                msg: 'Password debe tener al menos 6 caracteres'
            });
        }
        
        const existingUser = await User.findOne({ where: { username: username } }) as unknown as UserInstance | null;
        
        if (existingUser) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el nombre ${username}`
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);
        
        const newUser = await User.create({
            username: username,
            password: hashedPassword
        }) as unknown as UserInstance;
        
        res.status(201).json({
            msg: `Usuario ${username} creado exitosamente!`,
            userId: newUser.id
        });
        
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({
                msg: 'Username y password son requeridos'
            });
        }
        
        const user = await User.findOne({ where: { username: username } }) as unknown as UserInstance | null;
        
        if (!user) {
            return res.status(401).json({
                msg: 'Credenciales inválidas'
            });
        }
        
        const passwordValid = await bcrypt.compare(password, user.password);
        
        if (!passwordValid) {
            return res.status(401).json({
                msg: 'Credenciales inválidas'
            });
        }
        
        // Generar tokens usando el ID del usuario en lugar del username
        const { accessToken, refreshToken } = generateTokens(user.id, user.username);
        
        // Configurar cookie segura para refresh token
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
        });
        
        return res.json({
            accessToken,
            user: {
                id: user.id,
                username: user.username
            },
            msg: 'Login exitoso'
        });
        
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
        
        if (!refreshToken) {
            return res.status(401).json({
                msg: 'Refresh token no proporcionado'
            });
        }
        
        const decoded = jwt.verify(refreshToken, AppConfig.refreshSecretKey) as JWTPayload;
        
        if (decoded.type !== 'refresh') {
            return res.status(401).json({
                msg: 'Token inválido'
            });
        }
        
        // Verificar que el usuario aún existe
        const user = await User.findByPk(decoded.userId) as unknown as UserInstance | null;
        
        if (!user) {
            return res.status(401).json({
                msg: 'Usuario no encontrado'
            });
        }
        
        // Generar nuevos tokens
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(
            decoded.userId, 
            decoded.username
        );
        
        // Configurar nueva cookie
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