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