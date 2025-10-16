import { Request, Response } from 'express';
import { RegistroEstudiante } from '../models/registroEstudiante';
import { DetalleEstudianteVerificacion } from '../models/detalleEstudianteVerificacion';
import { Usuario } from '../models/user';
import { Edificio } from '../models/edificio';
import { Sede } from '../models/sede';
import sequelize from '../db/connection';

export const createRegistroEstudiante = async (req: Request, res: Response) => {
    const id_usuario = req.usuario?.id_usuario;

    if (!id_usuario) {
        return res.status(401).json({
            success: false,
            msg: 'Usuario no autenticado'
        });
    }

    // ✅ VALIDAR QUE EL USUARIO SEA ESTUDIANTE
    try {
        const usuario = await Usuario.findByPk(id_usuario, {
            attributes: ['id_usuario', 'perfil_id']
        }) as any;

        if (!usuario) {
            return res.status(404).json({
                success: false,
                msg: 'Usuario no encontrado'
            });
        }

        // Verificar que sea Estudiante (perfil_id = 2) o Administrador (perfil_id = 3)
        if (usuario.perfil_id !== 2 && usuario.perfil_id !== 3) {
            return res.status(403).json({
                success: false,
                msg: 'No tienes permisos para crear registros de estudiante. Solo estudiantes y administradores pueden realizar esta acción.'
            });
        }

    } catch (error) {
        console.error('Error al verificar permisos del usuario:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al verificar permisos del usuario'
        });
    }

    const {
        edificio_id,
        codigo_pila,
        observaciones,
        verificacion
    } = req.body;

    console.log('Datos recibidos:', { edificio_id, codigo_pila, verificacion });

    // Validar campos requeridos
    if (!edificio_id || !codigo_pila || !verificacion) {
        return res.status(400).json({
            success: false,
            msg: 'Edificio, código de pila y verificación son requeridos',
            received: { edificio_id, codigo_pila, verificacion }
        });
    }

    // Validar que verificación tenga todos los campos booleanos
    const camposRequeridos = ['papel_carton', 'plasticos', 'metales', 'organicos', 'vidrio', 'no_aprovechables'];
    const camposFaltantes = camposRequeridos.filter(campo => typeof verificacion[campo] !== 'boolean');
    
    if (camposFaltantes.length > 0) {
        return res.status(400).json({
            success: false,
            msg: 'Todos los campos de verificación deben ser booleanos (true/false)',
            camposFaltantes
        });
    }

    const transaction = await sequelize.transaction();
    let nuevoRegistro: any;

    try {
        // Crear el registro principal
        nuevoRegistro = await RegistroEstudiante.create({
            usuario_id: id_usuario,
            edificio_id,
            codigo_pila,
            observaciones: observaciones || null
        }, { transaction });

        // Crear el detalle de verificación (relación 1:1)
        await DetalleEstudianteVerificacion.create({
            registro_estudiante_id: nuevoRegistro.id_registro_estudiante,
            papel_carton: verificacion.papel_carton,
            plasticos: verificacion.plasticos,
            metales: verificacion.metales,
            organicos: verificacion.organicos,
            vidrio: verificacion.vidrio,
            no_aprovechables: verificacion.no_aprovechables
        }, { transaction });

        await transaction.commit();

    } catch (error) {
        await transaction.rollback();
        console.error('Error al crear registro estudiante:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al crear el registro',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }

    // Obtener el registro completo con todas las relaciones
    try {
        const registroCompleto = await RegistroEstudiante.findByPk(
            nuevoRegistro.id_registro_estudiante,
            {
                include: [
                    {
                        model: Usuario,
                        as: 'usuario',
                        attributes: ['id_usuario', 'nombre', 'apellido', 'email']
                    },
                    {
                        model: Edificio,
                        as: 'edificio',
                        attributes: ['id_edificio', 'nombre'],
                        include: [{
                            model: Sede,
                            as: 'sede',
                            attributes: ['id_sede', 'nombre']
                        }]
                    },
                    {
                        model: DetalleEstudianteVerificacion,
                        as: 'verificacion'
                    }
                ]
            }
        );

        return res.status(201).json({
            success: true,
            message: 'Registro de estudiante creado exitosamente',
            data: registroCompleto
        });

    } catch (error) {
        console.error('Error al obtener el registro completo:', error);
        return res.status(201).json({
            success: true,
            message: 'Registro creado exitosamente (sin detalles completos)',
            data: { id_registro_estudiante: nuevoRegistro.id_registro_estudiante }
        });
    }
};