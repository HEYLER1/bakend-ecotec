"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegistroPersonal = void 0;
const registroPersonal_1 = require("../models/registroPersonal");
const detallePersonalPilas_1 = require("../models/detallePersonalPilas");
const detallePersonalCanastillas_1 = require("../models/detallePersonalCanastillas");
const detallePersonalTacho_1 = require("../models/detallePersonalTacho");
const connection_1 = __importDefault(require("../db/connection"));
const createRegistroPersonal = async (req, res) => {
    const transaction = await connection_1.default.transaction();
    try {
        const { fecha_registro, id_sede, id_edificio, id_tipo_recoleccion, observaciones, pilas, canastillas, tacho } = req.body;
        const userFromToken = req.user;
        console.log('User from token:', userFromToken);
        const id_usuario = userFromToken?.id || userFromToken?.userId || userFromToken?.user?.id;
        if (!id_usuario) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                msg: 'No se pudo obtener el ID del usuario del token'
            });
        }
        // 1. Crear registro principal
        const registro = await registroPersonal_1.RegistroPersonal.create({
            fecha_registro: fecha_registro || new Date(),
            id_usuario,
            id_sede,
            id_edificio,
            id_tipo_recoleccion,
            observaciones,
            estado: true
        }, { transaction });
        if (id_tipo_recoleccion === 1 && pilas) {
            await detallePersonalPilas_1.DetallePersonalPilas.create({
                id_registro: registro.get('id'),
                plasticos_kg: pilas.plasticosKg || 0,
                organicos_kg: pilas.organicosKg || 0,
                vidrio_kg: pilas.vidrioKg || 0,
                metales_kg: pilas.metalesKg || 0,
                papel_carton_kg: pilas.papelCartonKg || 0,
                no_aprovechables_kg: pilas.noApropiablesKg || 0
            }, { transaction });
        }
        else if (id_tipo_recoleccion === 2 && canastillas) {
            await detallePersonalCanastillas_1.DetallePersonalCanastillas.create({
                id_registro: registro.get('id'),
                plasticos_kg: canastillas.plasticosKg || 0
            }, { transaction });
        }
        else if (id_tipo_recoleccion === 3 && tacho) {
            await detallePersonalTacho_1.DetallePersonalTacho.create({
                id_registro: registro.get('id'),
                papel_kg: tacho.papelKg || 0
            }, { transaction });
        }
        await transaction.commit();
        return res.status(201).json({
            success: true,
            msg: 'Registro creado exitosamente',
            data: registro
        });
    }
    catch (error) {
        await transaction.rollback();
        console.error('Error al crear registro personal:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al crear el registro',
            error: error.message
        });
    }
};
exports.createRegistroPersonal = createRegistroPersonal;
//LA API NO FUNCIONA. FALTA CORREGIR SEGUN LA NUEVA BASE DEATOS
//# sourceMappingURL=registroPersonal.controller.js.map