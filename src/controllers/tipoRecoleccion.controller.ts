// src/controllers/tipoRecoleccion.controller.ts

// controllers/tipoRecoleccion.controller.ts
import { Request, Response } from 'express';
import { TipoRecoleccion } from '../models/tipoRecoleccion';

/**
 * Obtener todos los tipos de recolección activos
 */
export const getTiposRecoleccion = async (req: Request, res: Response) => {
    try {
        const tipos = await TipoRecoleccion.findAll({
            attributes: ['id_tipo_recoleccion', 'nombre', 'descripcion', 'estado'],
            where: { estado: 1 },
            order: [['id_tipo_recoleccion', 'ASC']]
        });
        
        return res.json({
            success: true,
            data: tipos
        });
        
    } catch (error) {
        console.error('Error al obtener tipos de recolección:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al obtener los tipos de recolección'
        });
    }
};

/**
 * Obtener un tipo de recolección por ID
 */
export const getTipoRecoleccionById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const tipo = await TipoRecoleccion.findByPk(id, {
            attributes: ['id_tipo_recoleccion', 'nombre', 'descripcion', 'estado']
        });

        if (!tipo) {
            return res.status(404).json({
                success: false,
                msg: 'Tipo de recolección no encontrado'
            });
        }

        return res.json({
            success: true,
            data: tipo
        });
        
    } catch (error) {
        console.error('Error al obtener tipo de recolección:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al obtener el tipo de recolección'
        });
    }
};
/*import { Request, Response } from 'express';
import { TipoRecoleccion } from '../models/tipoRecoleccion';

export const getTiposRecoleccion = async (req: Request, res: Response) => {
    try {
        const tipos = await TipoRecoleccion.findAll({
            attributes: ['id', 'codigo', 'nombre', 'descripcion'],
            order: [['id', 'ASC']]
        });
        
        return res.json({
            success: true,
            data: tipos
        });
        
    } catch (error) {
        console.error('Error al obtener tipos de recolección:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al obtener los tipos de recolección'
        });
    }
};
*/
