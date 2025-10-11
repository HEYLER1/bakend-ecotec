// src/controllers/tipoRecoleccion.controller.ts
import { Request, Response } from 'express';
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

