// src/controllers/edificio.controller.ts
import { Request, Response } from 'express';
import { Edificio } from '../models/edificio';

// ✅ Asegúrate de usar EXPORT en cada función
export const getEdificios = async (req: Request, res: Response) => {
    try {
        const edificios = await Edificio.findAll({
            attributes: ['id_edificio', 'nombre', 'sede_id', 'estado'],
            where: { estado: 1 },
            order: [['nombre', 'ASC']]
        });
        
        return res.json({
            success: true,
            data: edificios
        });
        
    } catch (error) {
        console.error('Error al obtener edificios:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al obtener los edificios'
        });
    }
};

// ✅ NUEVO: Asegúrate de usar EXPORT
export const getEdificiosBySede = async (req: Request, res: Response) => {
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
        const edificios = await Edificio.findAll({
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
        
    } catch (error) {
        console.error('Error al obtener edificios por sede:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al obtener edificios de la sede'
        });
    }
};
/*falta corregir*/