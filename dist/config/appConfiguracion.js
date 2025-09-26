"use strict";
/**
 * Configuración global de la aplicación
 * Inicializa y valida las claves secretas una sola vez al arrancar la app
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeApp = exports.AppConfig = void 0;
// Inicializar las claves secretas una sola vez al arrancar la app
class AppConfig {
    static _secretKey = null;
    static _refreshSecretKey = null;
    static init() {
        const secretKey = process.env.SECRET_KEY;
        const refreshSecretKey = process.env.REFRESH_SECRET_KEY;
        if (!secretKey) {
            throw new Error('SECRET_KEY debe estar definida en las variables de entorno');
        }
        if (secretKey.length < 32) {
            throw new Error('SECRET_KEY debe tener al menos 32 caracteres');
        }
        if (!refreshSecretKey) {
            throw new Error('REFRESH_SECRET_KEY debe estar definida en las variables de entorno');
        }
        if (refreshSecretKey.length < 32) {
            throw new Error('REFRESH_SECRET_KEY debe tener al menos 32 caracteres');
        }
        this._secretKey = secretKey;
        this._refreshSecretKey = refreshSecretKey;
    }
    static get secretKey() {
        if (!this._secretKey) {
            throw new Error('AppConfig no ha sido inicializado. Llama a AppConfig.init() primero');
        }
        return this._secretKey;
    }
    static get refreshSecretKey() {
        if (!this._refreshSecretKey) {
            throw new Error('AppConfig no ha sido inicializado. Llama a AppConfig.init() primero');
        }
        return this._refreshSecretKey;
    }
}
exports.AppConfig = AppConfig;
// Función para inicializar la configuración de la app
const initializeApp = () => {
    AppConfig.init();
    console.log('✅ Configuración de claves secretas inicializada correctamente');
};
exports.initializeApp = initializeApp;
//# sourceMappingURL=appConfiguracion.js.map