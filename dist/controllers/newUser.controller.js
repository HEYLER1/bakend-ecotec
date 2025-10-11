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
        const { email, dni, password, nombre, apellido, telefono, perfil_id } = req.body;
        // Validaciones de campos requeridos
        if (!email || !dni || !password || !nombre || !apellido) {
            return res.status(400).json({
                msg: 'Email, DNI, password, nombre y apellido son requeridos'
            });
        }
        // Validar longitud del password
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
        // Validar DNI (debe tener 8 dígitos)
        if (dni.length !== 8 || !/^\d+$/.test(dni)) {
            return res.status(400).json({
                msg: 'DNI debe tener exactamente 8 dígitos numéricos'
            });
        }
        // Verificar si ya existe usuario con ese email
        const existingUserByEmail = await user_1.Usuario.findOne({ where: { email: email } });
        if (existingUserByEmail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el email ${email}`
            });
        }
        // Verificar si ya existe usuario con ese DNI
        const existingUserByDNI = await user_1.Usuario.findOne({ where: { dni: dni } });
        if (existingUserByDNI) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el DNI ${dni}`
            });
        }
        // Hashear el password
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        // Generar nombre de usuario automáticamente desde el email
        const usuarioGenerado = email.split('@')[0];
        // Crear usuario con todos los campos requeridos
        const newUser = await user_1.Usuario.create({
            email: email,
            usuario: usuarioGenerado, // Generado automáticamente
            dni: dni,
            password: hashedPassword,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono || null,
            perfil_id: perfil_id || 2, // Default: estudiante
            estado: 1
        });
        res.status(201).json({
            msg: `Usuario ${nombre} ${apellido} creado exitosamente!`,
            userId: newUser.dataValues.id_usuario,
            user: {
                id_usuario: newUser.dataValues.id_usuario,
                email: newUser.dataValues.email,
                usuario: newUser.dataValues.usuario,
                dni: newUser.dataValues.dni,
                nombre: newUser.dataValues.nombre,
                apellido: newUser.dataValues.apellido,
                telefono: newUser.dataValues.telefono,
                perfil_id: newUser.dataValues.perfil_id,
                estado: newUser.dataValues.estado,
                fecha_creacion: newUser.dataValues.fecha_creacion
            }
        });
    }
    catch (error) {
        console.error('Error al crear usuario:', error);
        // Manejo específico de errores de base de datos
        if (error.name === 'SequelizeUniqueConstraintError') {
            const uniqueField = error.errors[0]?.path;
            let fieldName = 'desconocido';
            if (uniqueField === 'email')
                fieldName = 'email';
            else if (uniqueField === 'usuario')
                fieldName = 'nombre de usuario';
            else if (uniqueField === 'dni')
                fieldName = 'DNI';
            return res.status(400).json({
                msg: `Ya existe un usuario con ese ${fieldName}`
            });
        }
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map((err) => err.message);
            return res.status(400).json({
                msg: 'Error de validación',
                errors: validationErrors
            });
        }
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({
                msg: 'El perfil_id especificado no existe'
            });
        }
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};
exports.newUser = newUser;
/*
export const newUser = async (req: Request, res: Response) => {
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
        const existingUserByEmail = await Usuario.findOne({ where: { email: email } });
        
        if (existingUserByEmail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el email ${email}`
            });
        }
        
        // Verificar si ya existe usuario con ese código (si se proporciona)
        if (codigo) {
            const existingUserByCode = await Usuario.findOne({ where: { codigo: codigo } });
            
            if (existingUserByCode) {
                return res.status(400).json({
                    msg: `Ya existe un usuario con el código ${codigo}`
                });
            }
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Crear usuario con todos los campos requeridos
        const newUser = await Usuario.create({
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
        
    } catch (error: any) {
        console.error('Error al crear usuario:', error);
        
        // Manejo específico de errores de base de datos
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                msg: 'Ya existe un usuario con esos datos únicos (email o código)'
            });
        }
        
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map((err: any) => err.message);
            return res.status(400).json({
                msg: 'Error de validación',
                errors: validationErrors
            });
        }
        
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};*/ 
//# sourceMappingURL=newUser.controller.js.map