// controllers/Perfil.Controller.ts
import { Request, Response } from 'express';
import { Usuario } from '../models/user';
import { Perfil } from '../models/role';

export const getProfile = async (req: Request, res: Response) => {
    try {
        const id_usuario = req.usuario?.id_usuario;

        if (!id_usuario) {
            return res.status(401).json({
                msg: 'Usuario no autenticado'
            });
        }

        const usuario = await Usuario.findOne({
            where: { id_usuario },
            attributes: [
                'id_usuario',
                'email',
                'nombre',
                'apellido',
                'telefono',  
                'dni'        
            ],
            include: [{
                model: Perfil,
                as: 'perfil',
                attributes: ['nombre']
            }]
        });

        if (!usuario) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            });
        }

        return res.json({
            success: true,
            data: usuario
        });

    } catch (error) {
        console.error('Error al obtener perfil:', error);
        return res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};