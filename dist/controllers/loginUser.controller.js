"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const associations_1 = require("../models/associations");
const tokenService_1 = require("../services/tokenService");
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; // 👈 Eliminado roleName
        console.log('Datos recibidos:', { email });
        if (!email || !password) {
            return res.status(400).json({
                msg: 'Email y password son requeridos'
            });
        }
        const user = await associations_1.User.findOne({
            where: { email: email },
            include: [{
                    association: 'role',
                    attributes: ['id', 'nombre', 'descripcion']
                }]
        });
        console.log('Usuario encontrado:', user ? 'SI' : 'NO');
        console.log('Role del usuario:', user?.role);
        if (!user) {
            return res.status(401).json({
                msg: 'Credenciales inválidas'
            });
        }
        // 👇 ELIMINADA - Ya no valida el rol seleccionado manualmente
        // El rol viene directo de la base de datos
        if (!user.activo) {
            return res.status(401).json({
                msg: 'Usuario inactivo. Contacte al administrador'
            });
        }
        const passwordValid = await bcrypt_1.default.compare(password, user.password);
        if (!passwordValid) {
            return res.status(401).json({
                msg: 'Credenciales inválidas'
            });
        }
        const { accessToken, refreshToken } = (0, tokenService_1.generateTokens)(user.id, user.email, user.role?.nombre // 👈 Usa el rol de la BD
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
                id: user.id,
                email: user.email,
                nombres: user.nombres,
                apellidos: user.apellidos,
                codigo: user.codigo,
                role: user.role // 👈 El rol real de la BD
            }
        };
        console.log('Respuesta enviada:', JSON.stringify(responseData, null, 2));
        return res.json(responseData);
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