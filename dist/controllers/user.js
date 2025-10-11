"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refreshToken = exports.loginUser = exports.newUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const role_1 = require("../models/role");
const appConfiguracion_1 = require("../config/appConfiguracion");
const tokenService_1 = require("../services/tokenService");
var newUser_controller_1 = require("./newUser.controller");
Object.defineProperty(exports, "newUser", { enumerable: true, get: function () { return newUser_controller_1.newUser; } });
var loginUser_controller_1 = require("./loginUser.controller");
Object.defineProperty(exports, "loginUser", { enumerable: true, get: function () { return loginUser_controller_1.loginUser; } });
/**
 * Renovar access token usando refresh token
 */
const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken || req.body.refreshToken;
        if (!token) {
            return res.status(401).json({
                msg: 'Refresh token no proporcionado'
            });
        }
        // Verificar el refresh token
        const decoded = jsonwebtoken_1.default.verify(token, appConfiguracion_1.AppConfig.refreshSecretKey);
        if (decoded.type !== 'refresh') {
            return res.status(401).json({
                msg: 'Token inválido - No es un refresh token'
            });
        }
        // Buscar usuario con su perfil
        const usuario = await user_1.Usuario.findOne({
            where: { id_usuario: decoded.id_usuario }, // 👈 Cambiado de userId a id_usuario
            attributes: ['id_usuario', 'email', 'estado', 'perfil_id'],
            include: [{
                    model: role_1.Perfil,
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
        const { accessToken, refreshToken: newRefreshToken } = (0, tokenService_1.generateTokens)(usuario.id_usuario, // 👈 Cambiado de userId a id_usuario
        usuario.email, usuario.perfil?.nombre // 👈 Incluir el nombre del perfil
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
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({
                msg: 'Refresh token expirado'
            });
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
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
exports.refreshToken = refreshToken;
/**
 * Cerrar sesión - eliminar refresh token
 */
const logout = async (req, res) => {
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
    }
    catch (error) {
        console.error('Error en logout:', error);
        return res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};
exports.logout = logout;
//# sourceMappingURL=user.js.map