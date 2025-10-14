import { Request, Response } from 'express';
/**
 * Crear registro de personal con detalles (Pilas, Canastillas o Tachos)
 */
export declare const createRegistroPersonal: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Obtener todos los registros del personal autenticado
 */
export declare const getRegistrosPersonal: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Obtener un registro específico por ID
 */
export declare const getRegistroById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Actualizar un registro existente
 */
export declare const updateRegistroPersonal: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Eliminar (soft delete) un registro
 */
export declare const deleteRegistroPersonal: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=registroPersonal.controller.d.ts.map