"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const tokenService_1 = require("../services/tokenService");
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                msg: 'Email y password son requeridos'
            });
        }
        // Buscar por email
        const user = await user_1.User.findOne({ where: { email: email } });
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
        const passwordValid = await bcrypt_1.default.compare(password, user.dataValues.password);
        if (!passwordValid) {
            return res.status(401).json({
                msg: 'Credenciales inválidas'
            });
        }
        // Generar tokens usando email
        const { accessToken, refreshToken } = (0, tokenService_1.generateTokens)(user.dataValues.id, user.dataValues.email);
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
    }
    catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=loginUser.controller.js.map