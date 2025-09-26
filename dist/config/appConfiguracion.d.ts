/**
 * Configuración global de la aplicación
 * Inicializa y valida las claves secretas una sola vez al arrancar la app
 */
export declare class AppConfig {
    private static _secretKey;
    private static _refreshSecretKey;
    static init(): void;
    static get secretKey(): string;
    static get refreshSecretKey(): string;
}
export declare const initializeApp: () => void;
//# sourceMappingURL=appConfiguracion.d.ts.map