import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import { generateTokens } from '../services/tokenService';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                msg: 'Email y password son requeridos'
            });
        }
        
        // Buscar por email
        const user = await User.findOne({ where: { email: email } });
        
        if (!user) {
            return res.status(401).json({
                msg: 'Credenciales inválidas'
            });
        }
        
        // Verificar que el usuario esté activo
        if (!user.dataValues.activo) {
            return res.status(401).json({
                msg: 'Usuario inactivo. Contacte al administrador'
            });
        }
        
        const passwordValid = await bcrypt.compare(password, user.dataValues.password);
        
        if (!passwordValid) {
            return res.status(401).json({
                msg: 'Credenciales inválidas'
            });
        }
        
        // Generar tokens usando email
        const { accessToken, refreshToken } = generateTokens(user.dataValues.id, user.dataValues.email);
        
        // Configurar cookie segura para refresh token
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
        });
        
        return res.json({
            accessToken,
            msg: 'Login exitoso',
            
        });
        
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};