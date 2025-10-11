"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEdificios = void 0;
const edificio_1 = require("../models/edificio");
const getEdificios = async (req, res) => {
    try {
        const edificios = await edificio_1.Edificio.findAll({
            attributes: ['id', 'nombre', 'id_sede'],
            where: { activo: true },
            order: [['nombre', 'ASC']]
        });
        return res.json({
            success: true,
            data: edificios
        });
    }
    catch (error) {
        console.error('Error al obtener edificios:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al obtener los edificios'
        });
    }
};
exports.getEdificios = getEdificios;
/*falta corregir*/ 
//# sourceMappingURL=edificio.controller.js.map