"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRegistroPersonal = exports.updateRegistroPersonal = exports.getRegistroById = exports.getRegistrosPersonal = exports.createRegistroPersonal = void 0;
const registroPersonal_1 = require("../models/registroPersonal");
const detallePersonalPilas_1 = require("../models/detallePersonalPilas");
const detallePersonalCanastillas_1 = require("../models/detallePersonalCanastillas");
const detallePersonalTacho_1 = require("../models/detallePersonalTacho");
const user_1 = require("../models/user");
const edificio_1 = require("../models/edificio");
const tipoRecoleccion_1 = require("../models/tipoRecoleccion");
const sede_1 = require("../models/sede");
const connection_1 = __importDefault(require("../db/connection"));
/**
 * Crear registro de personal con detalles (Pilas, Canastillas o Tachos)
 */
const createRegistroPersonal = async (req, res) => {
    const id_usuario = req.usuario?.id_usuario;
    if (!id_usuario) {
        return res.status(401).json({
            success: false,
            msg: 'Usuario no autenticado'
        });
    }
    const { edificio_id, tipo_recoleccion_id, observaciones, detalle_pilas, // Cambio: singular porque es 1:1
    detalle_canastillas, // Cambio: singular porque es 1:1
    detalle_tacho // Cambio: singular porque es 1:1
     } = req.body;
    console.log('Datos recibidos:', { edificio_id, tipo_recoleccion_id, observaciones });
    if (!edificio_id || !tipo_recoleccion_id) {
        return res.status(400).json({
            success: false,
            msg: 'Edificio y tipo de recolección son requeridos',
            received: { edificio_id, tipo_recoleccion_id }
        });
    }
    const transaction = await connection_1.default.transaction();
    let nuevoRegistro;
    try {
        // Crear el registro principal
        nuevoRegistro = await registroPersonal_1.RegistroPersonal.create({
            usuario_id: id_usuario,
            edificio_id,
            tipo_recoleccion_id,
            observaciones: observaciones || null
        }, { transaction });
        // Guardar detalles según el tipo de recolección (RELACIÓN 1:1)
        // Tipo 1: Pilas - Solo un registro de detalle
        if (tipo_recoleccion_id === 1 && detalle_pilas) {
            await detallePersonalPilas_1.DetallePersonalPilas.create({
                registro_personal_id: nuevoRegistro.id_registro_personal,
                plasticos_kg: parseFloat(detalle_pilas.plasticos_kg) || 0.00,
                organicos_kg: parseFloat(detalle_pilas.organicos_kg) || 0.00,
                vidrio_kg: parseFloat(detalle_pilas.vidrio_kg) || 0.00,
                metales_kg: parseFloat(detalle_pilas.metales_kg) || 0.00,
                papel_carton_kg: parseFloat(detalle_pilas.papel_carton_kg) || 0.00,
                no_aprovechables_kg: parseFloat(detalle_pilas.no_aprovechables_kg) || 0.00
            }, { transaction });
        }
        // Tipo 2: Canastillas - Solo un registro de detalle
        if (tipo_recoleccion_id === 2 && detalle_canastillas) {
            await detallePersonalCanastillas_1.DetallePersonalCanastillas.create({
                registro_personal_id: nuevoRegistro.id_registro_personal,
                plasticos_kg: parseFloat(detalle_canastillas.plasticos_kg) || 0.00
            }, { transaction });
        }
        // Tipo 3: Tachos - Solo un registro de detalle
        if (tipo_recoleccion_id === 3 && detalle_tacho) {
            await detallePersonalTacho_1.DetallePersonalTacho.create({
                registro_personal_id: nuevoRegistro.id_registro_personal,
                papel_kg: parseFloat(detalle_tacho.papel_kg) || 0.00
            }, { transaction });
        }
        await transaction.commit();
    }
    catch (error) {
        await transaction.rollback();
        console.error('Error al crear registro personal:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al crear el registro',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
    // Obtener el registro completo con todas las relaciones
    try {
        const registroCompleto = await registroPersonal_1.RegistroPersonal.findByPk(nuevoRegistro.id_registro_personal, {
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
                    model: tipoRecoleccion_1.TipoRecoleccion,
                    as: 'tipo_recoleccion',
                    attributes: ['id_tipo_recoleccion', 'nombre']
                },
                {
                    model: detallePersonalPilas_1.DetallePersonalPilas,
                    as: 'detalle_pilas'
                },
                {
                    model: detallePersonalCanastillas_1.DetallePersonalCanastillas,
                    as: 'detalle_canastillas'
                },
                {
                    model: detallePersonalTacho_1.DetallePersonalTacho,
                    as: 'detalle_tacho'
                }
            ]
        });
        return res.status(201).json({
            success: true,
            message: 'Registro creado exitosamente',
            data: registroCompleto
        });
    }
    catch (error) {
        console.error('Error al obtener el registro completo:', error);
        return res.status(201).json({
            success: true,
            message: 'Registro creado exitosamente (sin detalles completos)',
            data: { id_registro_personal: nuevoRegistro.id_registro_personal }
        });
    }
};
exports.createRegistroPersonal = createRegistroPersonal;
/**
 * Obtener todos los registros del personal autenticado
 */
const getRegistrosPersonal = async (req, res) => {
    try {
        const id_usuario = req.usuario?.id_usuario;
        if (!id_usuario) {
            return res.status(401).json({
                success: false,
                msg: 'Usuario no autenticado'
            });
        }
        const registros = await registroPersonal_1.RegistroPersonal.findAll({
            where: {
                usuario_id: id_usuario,
                estado: 1
            },
            include: [
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
                    model: tipoRecoleccion_1.TipoRecoleccion,
                    as: 'tipo_recoleccion',
                    attributes: ['id_tipo_recoleccion', 'nombre']
                },
                {
                    model: detallePersonalPilas_1.DetallePersonalPilas,
                    as: 'detalle_pilas',
                    required: false
                },
                {
                    model: detallePersonalCanastillas_1.DetallePersonalCanastillas,
                    as: 'detalle_canastillas',
                    required: false
                },
                {
                    model: detallePersonalTacho_1.DetallePersonalTacho,
                    as: 'detalle_tacho',
                    required: false
                }
            ],
            order: [['fecha_registro', 'DESC']]
        });
        return res.json({
            success: true,
            data: registros
        });
    }
    catch (error) {
        console.error('Error al obtener registros:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al obtener los registros',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
exports.getRegistrosPersonal = getRegistrosPersonal;
/**
 * Obtener un registro específico por ID
 */
const getRegistroById = async (req, res) => {
    try {
        const { id } = req.params;
        const id_usuario = req.usuario?.id_usuario;
        if (!id_usuario) {
            return res.status(401).json({
                success: false,
                msg: 'Usuario no autenticado'
            });
        }
        if (!id) {
            return res.status(400).json({
                success: false,
                msg: 'ID de registro requerido'
            });
        }
        const registro = await registroPersonal_1.RegistroPersonal.findOne({
            where: {
                id_registro_personal: parseInt(id),
                usuario_id: id_usuario
            },
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
                    model: tipoRecoleccion_1.TipoRecoleccion,
                    as: 'tipo_recoleccion',
                    attributes: ['id_tipo_recoleccion', 'nombre']
                },
                {
                    model: detallePersonalPilas_1.DetallePersonalPilas,
                    as: 'detalle_pilas',
                    required: false
                },
                {
                    model: detallePersonalCanastillas_1.DetallePersonalCanastillas,
                    as: 'detalle_canastillas',
                    required: false
                },
                {
                    model: detallePersonalTacho_1.DetallePersonalTacho,
                    as: 'detalle_tacho',
                    required: false
                }
            ]
        });
        if (!registro) {
            return res.status(404).json({
                success: false,
                msg: 'Registro no encontrado'
            });
        }
        return res.json({
            success: true,
            data: registro
        });
    }
    catch (error) {
        console.error('Error al obtener registro:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al obtener el registro',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
exports.getRegistroById = getRegistroById;
/**
 * Actualizar un registro existente
 */
const updateRegistroPersonal = async (req, res) => {
    const { id } = req.params;
    const id_usuario = req.usuario?.id_usuario;
    if (!id_usuario) {
        return res.status(401).json({
            success: false,
            msg: 'Usuario no autenticado'
        });
    }
    if (!id) {
        return res.status(400).json({
            success: false,
            msg: 'ID de registro requerido'
        });
    }
    const { edificio_id, tipo_recoleccion_id, observaciones, detalle_pilas, detalle_canastillas, detalle_tacho } = req.body;
    const transaction = await connection_1.default.transaction();
    try {
        // Buscar registro existente
        const registro = await registroPersonal_1.RegistroPersonal.findOne({
            where: {
                id_registro_personal: parseInt(id),
                usuario_id: id_usuario
            }
        });
        if (!registro) {
            await transaction.rollback();
            return res.status(404).json({
                success: false,
                msg: 'Registro no encontrado'
            });
        }
        // Actualizar registro principal
        await registro.update({
            edificio_id: edificio_id || registro.get('edificio_id'),
            tipo_recoleccion_id: tipo_recoleccion_id || registro.get('tipo_recoleccion_id'),
            observaciones: observaciones !== undefined ? observaciones : registro.get('observaciones')
        }, { transaction });
        // Actualizar detalles según tipo
        const tipo_id = registro.get('tipo_recoleccion_id');
        if (tipo_id === 1 && detalle_pilas) {
            await detallePersonalPilas_1.DetallePersonalPilas.upsert({
                registro_personal_id: parseInt(id),
                plasticos_kg: parseFloat(detalle_pilas.plasticos_kg) || 0.00,
                organicos_kg: parseFloat(detalle_pilas.organicos_kg) || 0.00,
                vidrio_kg: parseFloat(detalle_pilas.vidrio_kg) || 0.00,
                metales_kg: parseFloat(detalle_pilas.metales_kg) || 0.00,
                papel_carton_kg: parseFloat(detalle_pilas.papel_carton_kg) || 0.00,
                no_aprovechables_kg: parseFloat(detalle_pilas.no_aprovechables_kg) || 0.00
            }, { transaction });
        }
        if (tipo_id === 2 && detalle_canastillas) {
            await detallePersonalCanastillas_1.DetallePersonalCanastillas.upsert({
                registro_personal_id: parseInt(id),
                plasticos_kg: parseFloat(detalle_canastillas.plasticos_kg) || 0.00
            }, { transaction });
        }
        if (tipo_id === 3 && detalle_tacho) {
            await detallePersonalTacho_1.DetallePersonalTacho.upsert({
                registro_personal_id: parseInt(id),
                papel_kg: parseFloat(detalle_tacho.papel_kg) || 0.00
            }, { transaction });
        }
        await transaction.commit();
        // Obtener registro actualizado
        const registroActualizado = await registroPersonal_1.RegistroPersonal.findByPk(parseInt(id), {
            include: [
                { model: user_1.Usuario, as: 'usuario', attributes: ['id_usuario', 'nombre', 'apellido'] },
                { model: edificio_1.Edificio, as: 'edificio', include: [{ model: sede_1.Sede, as: 'sede' }] },
                { model: tipoRecoleccion_1.TipoRecoleccion, as: 'tipo_recoleccion' },
                { model: detallePersonalPilas_1.DetallePersonalPilas, as: 'detalle_pilas', required: false },
                { model: detallePersonalCanastillas_1.DetallePersonalCanastillas, as: 'detalle_canastillas', required: false },
                { model: detallePersonalTacho_1.DetallePersonalTacho, as: 'detalle_tacho', required: false }
            ]
        });
        return res.json({
            success: true,
            message: 'Registro actualizado exitosamente',
            data: registroActualizado
        });
    }
    catch (error) {
        await transaction.rollback();
        console.error('Error al actualizar registro:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al actualizar el registro',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
exports.updateRegistroPersonal = updateRegistroPersonal;
/**
 * Eliminar (soft delete) un registro
 */
const deleteRegistroPersonal = async (req, res) => {
    try {
        const { id } = req.params;
        const id_usuario = req.usuario?.id_usuario;
        if (!id_usuario) {
            return res.status(401).json({
                success: false,
                msg: 'Usuario no autenticado'
            });
        }
        if (!id) {
            return res.status(400).json({
                success: false,
                msg: 'ID de registro requerido'
            });
        }
        const registro = await registroPersonal_1.RegistroPersonal.findOne({
            where: {
                id_registro_personal: parseInt(id),
                usuario_id: id_usuario
            }
        });
        if (!registro) {
            return res.status(404).json({
                success: false,
                msg: 'Registro no encontrado'
            });
        }
        // Soft delete
        await registro.update({ estado: 0 });
        return res.json({
            success: true,
            message: 'Registro eliminado exitosamente'
        });
    }
    catch (error) {
        console.error('Error al eliminar registro:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al eliminar el registro',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
exports.deleteRegistroPersonal = deleteRegistroPersonal;
//# sourceMappingURL=registroPersonal.controller.js.map