/**
 * Definición de tipos e interfaces para el sistema de autenticación
 * Contiene las interfaces para JWT payload y modelo User
 */
/**
 * Payload del JWT para autenticación
 */
export interface JWTPayload {
    id_usuario: number;
    email: string;
    perfil?: string;
    type: 'access' | 'refresh';
    iat?: number;
    exp?: number;
}
/**
 * Interfaz para el modelo Usuario basado en tu tabla
 */
export interface UsuarioInstance {
    id_usuario: number;
    email: string;
    usuario: string;
    dni: string;
    password: string;
    nombre: string;
    apellido: string;
    telefono?: string | null;
    fecha_creacion: Date;
    estado: number;
    perfil_id: number;
    perfil?: PerfilInstance;
}
/**
 * Interfaz para el modelo Perfil (Role)
 */
export interface PerfilInstance {
    id_perfil: number;
    nombre: string;
    descripcion?: string;
}
/**
 * Datos del usuario sin información sensible (sin password)
 */
export interface UsuarioSinPassword {
    id_usuario: number;
    email: string;
    usuario: string;
    dni: string;
    nombre: string;
    apellido: string;
    telefono?: string | null;
    fecha_creacion: Date;
    estado: number;
    perfil_id: number;
    perfil?: PerfilInstance;
}
/**
 * Datos públicos del usuario (mínimos)
 */
export interface UsuarioPublico {
    id_usuario: number;
    email: string;
    nombre: string;
    apellido: string;
}
/**
 * Datos para login (solo lo necesario)
 */
export interface UsuarioLogin {
    id_usuario: number;
    email: string;
    password: string;
    estado: number;
    perfil_id: number;
    perfil?: {
        nombre: string;
    };
}
/**
 * Datos para actualizar perfil
 */
export interface ActualizarPerfilDTO {
    nombre?: string;
    apellido?: string;
    telefono?: string | null;
}
/**
 * Respuesta de login
 */
export interface LoginResponse {
    token: string;
    message: string;
}
/**
 * Respuesta de perfil
 */
export interface PerfilResponse {
    success: boolean;
    data: UsuarioSinPassword;
}
/**
 * Respuesta de actualización de perfil
 */
export interface ActualizarPerfilResponse {
    success: boolean;
    message: string;
    data: UsuarioSinPassword;
}
/**
 * Par de tokens
 */
export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}
/**
 * Respuesta de refresh token
 */
export interface RefreshTokenResponse {
    success: boolean;
    token: string;
    message: string;
}
//# sourceMappingURL=auth.types.d.ts.map