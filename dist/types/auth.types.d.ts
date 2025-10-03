/**
 * Definición de tipos e interfaces para el sistema de autenticación
 * Contiene las interfaces para JWT payload y modelo User
 */
export interface JWTPayload {
    userId: number;
    email: string;
    roleName?: string;
    type: 'access' | 'refresh';
}
export interface UserInstance {
    id: number;
    email: string;
    password: string;
    activo: boolean;
    nombres: string;
    apellidos: string;
    codigo?: string;
    role_id: number;
    role?: {
        id: number;
        nombre: string;
        descripcion?: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=auth.types.d.ts.map