// services/validate-token.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types/auth.types';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization'];

    // Verificar que existe el header y tiene el formato correcto
    if (!headerToken || !headerToken.startsWith('Bearer ')) {
        return res.status(401).json({
            msg: 'Acceso denegado - Token no proporcionado'
        });
    }

    try {
        // Extraer el token (remover "Bearer ")
        const token = headerToken.slice(7);
        
        // Verificar el token con la clave secreta
        const secretKey = process.env.SECRET_KEY || 'pepito123';
        const decoded = jwt.verify(token, secretKey) as JWTPayload;
        
        // Verificar que sea un access token
        if (decoded.type !== 'access') {
            return res.status(401).json({
                msg: 'Token inválido - No es un access token'
            });
        }
        
        // ✅ Guardar los datos del usuario en req.usuario
        req.usuario = decoded;
        
        // Continuar con el siguiente middleware/controlador
        next();
        
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                msg: 'Token expirado'
            });
        }
        
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                msg: 'Token inválido'
            });
        }
        
        return res.status(401).json({
            msg: 'Error al validar token'
        });
    }
};

export default validateToken;




/*import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization'];

    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {

        try {
            const bearerToken = headerToken.slice(7);
            
         //Guarda el resultado de jwt.verify
            const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY || 'pepito123');
            

            (req as any).user = decoded;
            
            next();
        } catch (error) {
            res.status(401).json({
                msg: 'token no valido'
            });
        }
    } else {
        res.status(401).json({
            msg: 'Acceso denegado'
        });
    }
}

export default validateToken;*/