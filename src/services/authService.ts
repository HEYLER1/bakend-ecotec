/*OJO NO SE ESTA USANDO PERO ES FUNCIONAL SIMPLIFICA Y LO HACE MAS ORDENADOLA API DE LOGIN*/

// services/authService.ts
import { Usuario } from '../models/user';
import { Perfil } from '../models/role';

/**
 * Consulta de usuario SOLO para autenticación
 * RESTRINGIDA a los campos mínimos necesarios ES PARA EL LOGIN, PERO AHORA NOSE ESTA USANDO POR SI CRESE Y FALATA 
 * HACER CAMBIOS, ESTA FOMRA SERIA MEJOR ESTRUCTURADO EN SIMPLES PALABRAS 
 */
/*export const findUserForAuth = async (email: string) => {
    return await Usuario.findOne({
        where: { email: email.toLowerCase().trim() },
        attributes: [
            'id_usuario',
            'email', 
            'password',
            'estado',
            'nombre',
            'apellido',
            'perfil_id'
        ],
        include: [{
            model: Perfil,
            as: 'perfil',
            attributes: ['id_perfil', 'nombre']
        }]
    });
};
// authController.ts LOGINCOTROLLER 
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateTokens } from '../services/tokenService';
import { findUserForAuth } from '../services/authService';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                msg: 'Email y password son requeridos'
            });
        }
        
        // USAR FUNCIÓN RESTRINGIDA
        const usuario: any = await findUserForAuth(email);
        
        if (!usuario) {
            return res.status(401).json({
                msg: 'Credenciales inválidas'
            });
        }
        
        if (usuario.estado === 0) {
            return res.status(403).json({
                msg: 'Usuario inactivo. Contacte al administrador'
            });
        }
        
        const passwordValid = await bcrypt.compare(password, usuario.password);
        
        if (!passwordValid) {
            return res.status(401).json({
                msg: 'Credenciales inválidas'
            });
        }
        
        const { accessToken, refreshToken } = generateTokens(
            usuario.id_usuario, 
            usuario.email,
            usuario.perfil?.nombre
        );
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        return res.json({
            token: accessToken,
            message: 'Login exitoso',
            user: {
                id_usuario: usuario.id_usuario,
                email: usuario.email,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                perfil: {
                    id: usuario.perfil?.id_perfil,
                    nombre: usuario.perfil?.nombre
                }
            }
        });
        
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};


/*  services/authService.ts
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import { UserInstance, RegisterRequest, LoginRequest } from '';

export class AuthService {
    // Validar entrada de datos
    static validateUserInput(username: string, password: string) {
        const errors: string[] = [];
        
        if (!username || !password) {
            errors.push('Username y password son requeridos');
        }
        
        if (username && username.length < 3) {
            errors.push('Username debe tener al menos 3 caracteres');
        }
        
        if (password && password.length < 6) {
            errors.push('Password debe tener al menos 6 caracteres');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Crear nuevo usuario
    static async createUser({ username, password }: RegisterRequest): Promise<UserInstance> {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ 
            where: { username: username } 
        }) as unknown as UserInstance | null;
        
        if (existingUser) {
            throw new Error(`Ya existe un usuario con el nombre ${username}`);
        }
        
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Crear usuario
        const newUser = await User.create({
            username: username,
            password: hashedPassword
        }) as unknown as UserInstance;
        
        return newUser;
    }

    // Verificar credenciales de usuario
    static async verifyUserCredentials({ username, password }: LoginRequest): Promise<UserInstance | null> {
        const user = await User.findOne({ 
            where: { username: username } 
        }) as unknown as UserInstance | null;
        
        if (!user) {
            return null;
        }
        
        const passwordValid = await bcrypt.compare(password, user.password);
        
        if (!passwordValid) {
            return null;
        }
        
        return user;
    }

    // Buscar usuario por ID
    static async findUserById(userId: number): Promise<UserInstance | null> {
        const user = await User.findByPk(userId) as unknown as UserInstance | null;
        return user;
    }
}*/