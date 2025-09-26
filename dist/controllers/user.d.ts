/**
 * codigo general de controlador de usuario de login y registro
 * Importa y centraliza todas las funciones de autenticación
 * aqui esyta el refreshToken y logout
 */
import { Request, Response } from 'express';
export { newUser } from './newUser.controller';
export { loginUser } from './loginUser.controller';
export declare const refreshToken: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const logout: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=user.d.ts.map