"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refreshToken = exports.loginUser = exports.newUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const appConfiguracion_1 = require("../config/appConfiguracion");
const tokenService_1 = require("../services/tokenService");
var newUser_controller_1 = require("./newUser.controller");
Object.defineProperty(exports, "newUser", { enumerable: true, get: function () { return newUser_controller_1.newUser; } });
var loginUser_controller_1 = require("./loginUser.controller");
Object.defineProperty(exports, "loginUser", { enumerable: true, get: function () { return loginUser_controller_1.loginUser; } });
const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken || req.body.refreshToken;
        if (!token) {
            return res.status(401).json({
                msg: 'Refresh token no proporcionado'
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, appConfiguracion_1.AppConfig.refreshSecretKey);
        if (decoded.type !== 'refresh') {
            return res.status(401).json({
                msg: 'Token inválido'
            });
        }
        const user = await user_1.User.findByPk(decoded.userId);
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
        const { accessToken, refreshToken: newRefreshToken } = (0, tokenService_1.generateTokens)(decoded.userId, user.dataValues.email);
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
    }
    catch (error) {
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
const logout = async (req, res) => {
    try {
        res.clearCookie('refreshToken');
        return res.json({
            msg: 'Logout exitoso'
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
//# sourceMappingURL=user.controller.js.map