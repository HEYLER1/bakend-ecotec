/**
 * Definición de tipos e interfaces para el sistema de autenticación
 * Contiene las interfaces para JWT payload y modelo User
 */

// Interfaz para el payload del JWT
export interface JWTPayload {
    userId: number;
    username: string;
    type: 'access' | 'refresh';
}

// Interfaz para el modelo User
export interface UserInstance {
    id: number;
    username: string;
    password: string;
}