"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegistroEstudiante = void 0;
const registroEstudiante_1 = require("../models/registroEstudiante");
const detalleEstudianteVerificacion_1 = require("../models/detalleEstudianteVerificacion");
const user_1 = require("../models/user");
const edificio_1 = require("../models/edificio");
const sede_1 = require("../models/sede");
const connection_1 = __importDefault(require("../db/connection"));
const createRegistroEstudiante = async (req, res) => {
    const id_usuario = req.usuario?.id_usuario;
    if (!id_usuario) {
        return res.status(401).json({
            success: false,
            msg: 'Usuario no autenticado'
        });
    }
    // ✅ VALIDAR QUE EL USUARIO SEA ESTUDIANTE
    try {
        const usuario = await user_1.Usuario.findByPk(id_usuario, {
            attributes: ['id_usuario', 'perfil_id']
        });
        if (!usuario) {
            return res.status(404).json({
                success: false,
                msg: 'Usuario no encontrado'
            });
        }
        // Verificar que sea Estudiante (perfil_id = 2) o Administrador (perfil_id = 3)
        if (usuario.perfil_id !== 2 && usuario.perfil_id !== 3) {
            return res.status(403).json({
                success: false,
                msg: 'No tienes permisos para crear registros de estudiante. Solo estudiantes y administradores pueden realizar esta acción.'
            });
        }
    }
    catch (error) {
        console.error('Error al verificar permisos del usuario:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al verificar permisos del usuario'
        });
    }
    const { edificio_id, codigo_pila, observaciones, verificacion } = req.body;
    console.log('Datos recibidos:', { edificio_id, codigo_pila, verificacion });
    // Validar campos requeridos
    if (!edificio_id || !codigo_pila || !verificacion) {
        return res.status(400).json({
            success: false,
            msg: 'Edificio, código de pila y verificación son requeridos',
            received: { edificio_id, codigo_pila, verificacion }
        });
    }
    // Validar que verificación tenga todos los campos booleanos
    const camposRequeridos = ['papel_carton', 'plasticos', 'metales', 'organicos', 'vidrio', 'no_aprovechables'];
    const camposFaltantes = camposRequeridos.filter(campo => typeof verificacion[campo] !== 'boolean');
    if (camposFaltantes.length > 0) {
        return res.status(400).json({
            success: false,
            msg: 'Todos los campos de verificación deben ser booleanos (true/false)',
            camposFaltantes
        });
    }
    const transaction = await connection_1.default.transaction();
    let nuevoRegistro;
    try {
        // Crear el registro principal
        nuevoRegistro = await registroEstudiante_1.RegistroEstudiante.create({
            usuario_id: id_usuario,
            edificio_id,
            codigo_pila,
            observaciones: observaciones || null
        }, { transaction });
        // Crear el detalle de verificación (relación 1:1)
        await detalleEstudianteVerificacion_1.DetalleEstudianteVerificacion.create({
            registro_estudiante_id: nuevoRegistro.id_registro_estudiante,
            papel_carton: verificacion.papel_carton,
            plasticos: verificacion.plasticos,
            metales: verificacion.metales,
            organicos: verificacion.organicos,
            vidrio: verificacion.vidrio,
            no_aprovechables: verificacion.no_aprovechables
        }, { transaction });
        await transaction.commit();
    }
    catch (error) {
        await transaction.rollback();
        console.error('Error al crear registro estudiante:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al crear el registro',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
    // Obtener el registro completo con todas las relaciones
    try {
        const registroCompleto = await registroEstudiante_1.RegistroEstudiante.findByPk(nuevoRegistro.id_registro_estudiante, {
            include: [
                {
                    model: user_1.Usuario,
                    as: 'usuario',
                    attributes: ['id_usuario', 'nombre', 'apellido', 'email']
                },
                {
                    model: edificio_1.Edificio,
                    as: 'edificio',
                    attributes: ['id_edificio', 'nombre'],
                    include: [{
                            model: sede_1.Sede,
                            as: 'sede',
                            attributes: ['id_sede', 'nombre']
                        }]
                },
                {
                    model: detalleEstudianteVerificacion_1.DetalleEstudianteVerificacion,
                    as: 'verificacion'
                }
            ]
        });
        return res.status(201).json({
            success: true,
            message: 'Registro de estudiante creado exitosamente',
            data: registroCompleto
        });
    }
    catch (error) {
        console.error('Error al obtener el registro completo:', error);
        return res.status(201).json({
            success: true,
            message: 'Registro creado exitosamente (sin detalles completos)',
            data: { id_registro_estudiante: nuevoRegistro.id_registro_estudiante }
        });
    }
};
exports.createRegistroEstudiante = createRegistroEstudiante;
//# sourceMappingURL=registroEstudiante.controller.js.map