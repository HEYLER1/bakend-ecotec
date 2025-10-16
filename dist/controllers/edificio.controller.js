"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEdificiosBySede = exports.getEdificios = void 0;
const edificio_1 = require("../models/edificio");
// ✅ Asegúrate de usar EXPORT en cada función
const getEdificios = async (req, res) => {
    try {
        const edificios = await edificio_1.Edificio.findAll({
            attributes: ['id_edificio', 'nombre', 'sede_id', 'estado'],
            where: { estado: 1 },
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
// ✅ NUEVO: Asegúrate de usar EXPORT
const getEdificiosBySede = async (req, res) => {
    const { id_sede } = req.params;
    // ✅ Debug: Ver qué viene en los parámetros
    console.log('🔍 Parámetros recibidos:', req.params);
    console.log('🔍 id_sede:', id_sede);
    // ✅ Validar que id_sede exista
    if (!id_sede) {
        return res.status(400).json({
            success: false,
            msg: 'El parámetro id_sede es requerido'
        });
    }
    try {
        const edificios = await edificio_1.Edificio.findAll({
            where: {
                sede_id: parseInt(id_sede), // ✅ Convertir a número
                estado: 1
            },
            attributes: ['id_edificio', 'nombre', 'sede_id', 'estado'],
            order: [['nombre', 'ASC']]
        });
        return res.json({
            success: true,
            data: edificios
        });
    }
    catch (error) {
        console.error('Error al obtener edificios por sede:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al obtener edificios de la sede'
        });
    }
};
exports.getEdificiosBySede = getEdificiosBySede;
/*falta corregir*/ 
//# sourceMappingURL=edificio.controller.js.map