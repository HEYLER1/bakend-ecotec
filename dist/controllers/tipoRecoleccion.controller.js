"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTiposRecoleccion = void 0;
const tipoRecoleccion_1 = require("../models/tipoRecoleccion");
const getTiposRecoleccion = async (req, res) => {
    try {
        const tipos = await tipoRecoleccion_1.TipoRecoleccion.findAll({
            attributes: ['id', 'codigo', 'nombre', 'descripcion'],
            order: [['id', 'ASC']]
        });
        return res.json({
            success: true,
            data: tipos
        });
    }
    catch (error) {
        console.error('Error al obtener tipos de recolección:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al obtener los tipos de recolección'
        });
    }
};
exports.getTiposRecoleccion = getTiposRecoleccion;
//# sourceMappingURL=tipoRecoleccion.controller.js.map