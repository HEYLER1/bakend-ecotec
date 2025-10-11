"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const user_1 = __importDefault(require("../routes/user"));
const sede_1 = __importDefault(require("../routes/sede"));
const edificio_1 = __importDefault(require("../routes/edificio"));
const tipoRecoleccion_1 = __importDefault(require("../routes/tipoRecoleccion"));
const registroPersonal_1 = __importDefault(require("../routes/registroPersonal"));
const perfil_1 = __importDefault(require("../routes/perfil")); // 👈 NUEVO - Importar rutas de perfil
require("../models/associations");
const user_2 = require("./user");
const role_1 = require("./role");
const sede_2 = require("./sede");
const edificio_2 = require("./edificio");
const tipoRecoleccion_2 = require("./tipoRecoleccion");
const registroPersonal_2 = require("./registroPersonal");
const detallePersonalPilas_1 = require("./detallePersonalPilas");
const detallePersonalCanastillas_1 = require("./detallePersonalCanastillas");
const detallePersonalTacho_1 = require("./detallePersonalTacho");
class Server {
    app;
    port;
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.dbConnect();
        this.midlewares();
        this.routes();
        this.frontend();
        this.listen();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/users', user_1.default);
        this.app.use('/api/sedes', sede_1.default);
        this.app.use('/api/edificios', edificio_1.default);
        this.app.use('/api/tipos-recoleccion', tipoRecoleccion_1.default);
        this.app.use('/api/registros-personal', registroPersonal_1.default);
        this.app.use('/api/profile', perfil_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    frontend() {
        const distPath = path_1.default.resolve(__dirname, "../../ecotec-unaj/dist/browser");
        this.app.use(express_1.default.static(distPath));
        this.app.get(/^(?!\/api).*/, (req, res) => {
            res.sendFile(path_1.default.join(distPath, "index.html"));
        });
    }
    async dbConnect() {
        try {
            // ✅ Sincronizar en orden: tablas padre primero
            await role_1.Perfil.sync(); // 1️⃣ Tabla independiente
            await user_2.Usuario.sync(); // 2️⃣ Depende de Perfil
            await sede_2.Sede.sync(); // 3️⃣ Tabla independiente
            await edificio_2.Edificio.sync(); // 4️⃣ Depende de Sede
            await tipoRecoleccion_2.TipoRecoleccion.sync(); // 5️⃣ Tabla independiente
            await registroPersonal_2.RegistroPersonal.sync(); // 6️⃣ Depende de Usuario, Edificio, TipoRecoleccion
            await detallePersonalPilas_1.DetallePersonalPilas.sync(); // 7️⃣ Depende de RegistroPersonal
            await detallePersonalCanastillas_1.DetallePersonalCanastillas.sync(); // 8️⃣ Depende de RegistroPersonal
            await detallePersonalTacho_1.DetallePersonalTacho.sync(); // 9️⃣ Depende de RegistroPersonal
            console.log('Base de datos sincronizada correctamente');
        }
        catch (error) {
            console.error('Error al conectar con la base de datos:', error);
        }
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map