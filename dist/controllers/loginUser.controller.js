"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const role_1 = require("../models/role");
const tokenService_1 = require("../services/tokenService");
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                msg: 'Email y password son requeridos'
            });
        }
        // CONSULTAR SOLO LO NECESARIO
        const usuario = await user_1.Usuario.findOne({
            where: { email: email.toLowerCase().trim() },
            attributes: ['id_usuario', 'email', 'password', 'estado', 'perfil_id'], // Solo campos necesarios
            include: [{
                    model: role_1.Perfil,
                    as: 'perfil',
                    attributes: ['id_perfil', 'nombre'] // Solo nombre del perfil
                }]
        });
        if (!usuario) {
            return res.status(401).json({
                msg: 'Credenciales inválidas'
            });
        }
        // Verificar estado
        if (usuario.estado === 0) {
            return res.status(403).json({
                msg: 'Usuario inactivo. Contacte al administrador'
            });
        }
        // Validar password
        const passwordValid = await bcrypt_1.default.compare(password, usuario.password);
        if (!passwordValid) {
            return res.status(401).json({
                msg: 'Credenciales inválidas'
            });
        }
        // Generar tokens
        const { accessToken, refreshToken } = (0, tokenService_1.generateTokens)(usuario.id_usuario, usuario.email, usuario.perfil?.nombre);
        // Configurar cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        // Respuesta mínima
        return res.json({
            token: accessToken,
            message: 'Login exitoso',
            user: {
                id_usuario: usuario.id_usuario,
                email: usuario.email,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                perfil: {
                    id: usuario.perfil?.id_perfil,
                    nombre: usuario.perfil?.nombre
                }
            }
        });
    }
    catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};
exports.loginUser = loginUser;
/*import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Usuario } from '../models/user';
import { Perfil } from '../models/role';
import { generateTokens } from '../services/tokenService';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        console.log('Datos recibidos:', { email });
        
        if (!email || !password) {
            return res.status(400).json({
                msg: 'Email y password son requeridos'
            });
        }
        
        const usuario: any = await Usuario.findOne({
            where: { email: email },
            include: [{
                model: Perfil,
                as: 'perfil',
                attributes: ['id_perfil', 'nombre', 'descripcion']
            }]
        });
        
        console.log('Usuario encontrado:', usuario ? 'SI' : 'NO');
        console.log('Perfil del usuario:', usuario?.perfil);
        
        if (!usuario) {
            return res.status(401).json({
                msg: 'Credenciales inválidas'
            });
        }
        
        // Verificar estado del usuario (0 = inactivo, 1 = activo)
        if (usuario.estado === 0) {
            return res.status(401).json({
                msg: 'Usuario inactivo. Contacte al administrador'
            });
        }
        
        const passwordValid = await bcrypt.compare(password, usuario.password);
        
        if (!passwordValid) {
            return res.status(401).json({
                msg: 'Credenciales inválidas'
            });
        }
        
        const { accessToken, refreshToken } = generateTokens(
            usuario.id_usuario,
            usuario.email,
            usuario.perfil?.nombre
        );
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        const responseData = {
            token: accessToken,
            message: 'Login exitoso',
            user: {
                id_usuario: usuario.id_usuario,
                email: usuario.email,
                usuario: usuario.usuario,
                dni: usuario.dni,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                telefono: usuario.telefono,
                perfil: usuario.perfil,
                estado: usuario.estado,
                fecha_creacion: usuario.fecha_creacion
            }
        };
        
        console.log('Respuesta enviada:', JSON.stringify(responseData, null, 2));
        
        return res.json(responseData);
        
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};*/ 
//# sourceMappingURL=loginUser.controller.js.map