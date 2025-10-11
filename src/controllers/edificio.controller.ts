// src/controllers/edificio.controller.ts
import { Request, Response } from 'express';
import { Edificio } from '../models/edificio';

export const getEdificios = async (req: Request, res: Response) => {
    try {
        const edificios = await Edificio.findAll({
            attributes: ['id', 'nombre', 'id_sede'],
            where: { activo: true },  
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

/*falta corregir*/