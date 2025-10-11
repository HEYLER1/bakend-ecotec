
import { Request, Response } from 'express';
import { Sede } from '../models/sede';

/**
 * Obtener todas las sedes activas
 */
export const getSedes = async (req: Request, res: Response) => {
    try {
        const sedes = await Sede.findAll({
            where: { estado: 1 }, 
            attributes: ['id_sede', 'nombre', 'imagen'],  
            order: [['nombre', 'ASC']]
        });
        
        return res.json({
            success: true,
            data: sedes
        });
        
    } catch (error) {
        console.error('Error al obtener sedes:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al obtener las sedes'
        });
    }
};
/*import { Request, Response } from 'express';
import { Sede } from '../models/sede';

export const getSedes = async (req: Request, res: Response) => {
    try {
        const sedes = await Sede.findAll({
            attributes: ['id', 'nombre', 'imagen'],
            order: [['nombre', 'ASC']]
        });
        
        return res.json({
            success: true,
            data: sedes
        });
        
    } catch (error) {
        console.error('Error al obtener sedes:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al obtener las sedes'
        });
    }
};*/

/*// controllers/sede.controller.ts
import { Request, Response } from 'express';
import { Sede } from '../models/sede';

/**
 * Obtener todas las sedes activas
 */
/*
export const getSedes = async (req: Request, res: Response) => {
    try {
        const sedes = await Sede.findAll({
            where: { estado: 1 },  // 👈 Solo sedes activas
            attributes: ['id_sede', 'nombre', 'imagen'],  // 👈 Cambiado de 'id' a 'id_sede'
            order: [['nombre', 'ASC']]
        });
        
        return res.json({
            success: true,
            data: sedes
        });
        
    } catch (error) {
        console.error('Error al obtener sedes:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al obtener las sedes'
        });
    }
};

/**
 * Obtener todas las sedes (incluyendo inactivas)
 */
/*
export const getAllSedes = async (req: Request, res: Response) => {
    try {
        const sedes = await Sede.findAll({
            attributes: ['id_sede', 'nombre', 'imagen', 'estado'],
            order: [['nombre', 'ASC']]
        });
        
        return res.json({
            success: true,
            data: sedes
        });
        
    } catch (error) {
        console.error('Error al obtener todas las sedes:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al obtener las sedes'
        });
    }
};

/**
 * Obtener una sede por ID
 */
/*
export const getSedeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const sede = await Sede.findOne({
            where: { id_sede: id },
            attributes: ['id_sede', 'nombre', 'imagen', 'estado']
        });
        
        if (!sede) {
            return res.status(404).json({
                success: false,
                msg: 'Sede no encontrada'
            });
        }
        
        return res.json({
            success: true,
            data: sede
        });
        
    } catch (error) {
        console.error('Error al obtener sede:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al obtener la sede'
        });
    }
};

/**
 * Crear nueva sede
 *//*
export const createSede = async (req: Request, res: Response) => {
    try {
        const { nombre, imagen } = req.body;
        
        if (!nombre) {
            return res.status(400).json({
                success: false,
                msg: 'El nombre es requerido'
            });
        }
        
        const nuevaSede = await Sede.create({
            nombre,
            imagen: imagen || null,
            estado: 1
        });
        
        return res.status(201).json({
            success: true,
            message: 'Sede creada exitosamente',
            data: nuevaSede
        });
        
    } catch (error) {
        console.error('Error al crear sede:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al crear la sede'
        });
    }
};

/**
 * Actualizar sede
 *//*
export const updateSede = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre, imagen, estado } = req.body;
        
        const sede = await Sede.findByPk(id);
        
        if (!sede) {
            return res.status(404).json({
                success: false,
                msg: 'Sede no encontrada'
            });
        }
        
        const camposActualizar: any = {};
        if (nombre !== undefined) camposActualizar.nombre = nombre;
        if (imagen !== undefined) camposActualizar.imagen = imagen;
        if (estado !== undefined) camposActualizar.estado = estado;
        
        await sede.update(camposActualizar);
        
        return res.json({
            success: true,
            message: 'Sede actualizada exitosamente',
            data: sede
        });
        
    } catch (error) {
        console.error('Error al actualizar sede:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al actualizar la sede'
        });
    }
};

/**
 * Eliminar sede (cambiar estado a 0)
 *//*
export const deleteSede = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const sede = await Sede.findByPk(id);
        
        if (!sede) {
            return res.status(404).json({
                success: false,
                msg: 'Sede no encontrada'
            });
        }
        
        await sede.update({ estado: 0 });
        
        return res.json({
            success: true,
            message: 'Sede eliminada exitosamente'
        });
        
    } catch (error) {
        console.error('Error al eliminar sede:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al eliminar la sede'
        });
    }
};

/**
 * Restaurar sede (cambiar estado a 1)
 *//*
export const restoreSede = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const sede = await Sede.findByPk(id);
        
        if (!sede) {
            return res.status(404).json({
                success: false,
                msg: 'Sede no encontrada'
            });
        }
        
        await sede.update({ estado: 1 });
        
        return res.json({
            success: true,
            message: 'Sede restaurada exitosamente'
        });
        
    } catch (error) {
        console.error('Error al restaurar sede:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al restaurar la sede'
        });
    }
};*/