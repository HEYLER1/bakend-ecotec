"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const user_1 = __importDefault(require("../routes/user"));
require("../models/associations"); // 👈 AGREGAR ESTA LÍNEA
const user_2 = require("./user");
const role_1 = require("./role"); // 👈 AGREGAR ESTA LÍNEA
class Server {
    app;
    port;
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.dbConnect(); // 👈 MOVER ANTES de midlewares
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
    }
    midlewares() {
        // Parseo body
        this.app.use(express_1.default.json());
        // Cors
        this.app.use((0, cors_1.default)());
    }
    frontend() {
        const distPath = path_1.default.resolve(__dirname, "../../ecotec-unaj/dist/browser");
        // servir assets de Angular compilados
        this.app.use(express_1.default.static(distPath));
        // cualquier ruta que no sea /api → devuelve index.html
        this.app.get(/^(?!\/api).*/, (req, res) => {
            res.sendFile(path_1.default.join(distPath, "index.html"));
        });
    }
    async dbConnect() {
        try {
            await role_1.Role.sync(); // 👈 AGREGAR: Sincronizar Role primero
            await user_2.User.sync(); // 👈 Luego User
            console.log('✅ Base de datos sincronizada correctamente');
        }
        catch (error) {
            console.error('❌ Error al conectar con la base de datos:', error);
        }
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map