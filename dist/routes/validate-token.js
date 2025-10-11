"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenService_1 = require("../services/tokenService");
const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            const bearerToken = headerToken.slice(7);
            //Guarda el resultado de jwt.verify
            const decoded = jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'pepito123');
            req.user = decoded;
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: 'token no valido'
            });
        }
    }
    else {
        res.status(401).json({
            msg: 'Acceso denegado'
        });
    }
};
const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({
                msg: 'Refresh token no proporcionado'
            });
        }
        const newAccessToken = (0, tokenService_1.refreshAccessToken)(refreshToken);
        return res.json({
            success: true,
            token: newAccessToken,
            message: 'Token renovado exitosamente'
        });
    }
    catch (error) {
        console.error('Error al renovar token:', error);
        return res.status(401).json({
            msg: error.message || 'Refresh token inválido o expirado'
        });
    }
};
exports.refreshToken = refreshToken;
exports.default = validateToken;
//# sourceMappingURL=validate-token.js.map