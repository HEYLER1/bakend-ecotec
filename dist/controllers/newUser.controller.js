"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const newUser = async (req, res) => {
    try {
        const { email, password, nombres, apellidos, codigo } = req.body;
        // Validaciones de campos requeridos
        if (!email || !password || !nombres || !apellidos) {
            return res.status(400).json({
                msg: 'Email, password, nombres y apellidos son requeridos'
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                msg: 'Password debe tener al menos 6 caracteres'
            });
        }
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                msg: 'Formato de email inválido'
            });
        }
        // Verificar si ya existe usuario con ese email
        const existingUserByEmail = await user_1.User.findOne({ where: { email: email } });
        if (existingUserByEmail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el email ${email}`
            });
        }
        // Verificar si ya existe usuario con ese código (si se proporciona)
        if (codigo) {
            const existingUserByCode = await user_1.User.findOne({ where: { codigo: codigo } });
            if (existingUserByCode) {
                return res.status(400).json({
                    msg: `Ya existe un usuario con el código ${codigo}`
                });
            }
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        // Crear usuario con todos los campos requeridos
        const newUser = await user_1.User.create({
            email: email,
            password: hashedPassword,
            nombres: nombres,
            apellidos: apellidos,
            codigo: codigo || null,
            activo: true
        });
        res.status(201).json({
            msg: `Usuario ${nombres} ${apellidos} creado exitosamente!`,
            userId: newUser.dataValues.id,
            user: {
                id: newUser.dataValues.id,
                email: newUser.dataValues.email,
                nombres: newUser.dataValues.nombres,
                apellidos: newUser.dataValues.apellidos,
                codigo: newUser.dataValues.codigo,
                activo: newUser.dataValues.activo
            }
        });
    }
    catch (error) {
        console.error('Error al crear usuario:', error);
        // Manejo específico de errores de base de datos
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                msg: 'Ya existe un usuario con esos datos únicos (email o código)'
            });
        }
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map((err) => err.message);
            return res.status(400).json({
                msg: 'Error de validación',
                errors: validationErrors
            });
        }
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};
exports.newUser = newUser;
//# sourceMappingURL=newUser.controller.js.map