/**
 * Definición de tipos e interfaces para el sistema de autenticación
 * Contiene las interfaces para JWT payload y modelo User
 */
export interface JWTPayload {
    userId: number;
    username: string;
    type: 'access' | 'refresh';
}
export interface UserInstance {
    id: number;
    username: string;
    password: string;
}
//# sourceMappingURL=auth.types.d.ts.map