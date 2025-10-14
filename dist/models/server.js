"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const connection_1 = __importDefault(require("../db/connection"));
const role_1 = require("./role");
const user_1 = require("./user");
const sede_1 = require("./sede");
const edificio_1 = require("./edificio");
const tipoRecoleccion_1 = require("./tipoRecoleccion");
const registroPersonal_1 = require("./registroPersonal");
const detallePersonalPilas_1 = require("./detallePersonalPilas");
const detallePersonalCanastillas_1 = require("./detallePersonalCanastillas");
const detallePersonalTacho_1 = require("./detallePersonalTacho");
const registroEstudiante_1 = require("./registroEstudiante");
const detalleEstudianteVerificacion_1 = require("./detalleEstudianteVerificacion");
const associations_1 = require("./associations");
const user_2 = __importDefault(require("../routes/user"));
const sede_2 = __importDefault(require("../routes/sede"));
const edificio_2 = __importDefault(require("../routes/edificio"));
const tipoRecoleccion_2 = __importDefault(require("../routes/tipoRecoleccion"));
const registroPersonal_2 = __importDefault(require("../routes/registroPersonal"));
const registroEstudiante_routes_1 = __importDefault(require("../routes/registroEstudiante.routes"));
const perfil_1 = __importDefault(require("../routes/perfil"));
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
        this.app.use('/api/users', user_2.default);
        this.app.use('/api/sedes', sede_2.default);
        this.app.use('/api/edificios', edificio_2.default);
        this.app.use('/api/tipos-recoleccion', tipoRecoleccion_2.default);
        this.app.use('/api/registros-personal', registroPersonal_2.default);
        this.app.use('/api/registros-estudiante', registroEstudiante_routes_1.default);
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
            await connection_1.default.authenticate();
            console.log('Conectado exitosamente a la base de datos');
            (0, associations_1.setupAssociations)();
            console.log('Asociaciones configuradas');
            await role_1.Perfil.sync();
            await user_1.Usuario.sync();
            await sede_1.Sede.sync();
            await edificio_1.Edificio.sync();
            await tipoRecoleccion_1.TipoRecoleccion.sync();
            await registroPersonal_1.RegistroPersonal.sync();
            await detallePersonalPilas_1.DetallePersonalPilas.sync();
            await detallePersonalCanastillas_1.DetallePersonalCanastillas.sync();
            await detallePersonalTacho_1.DetallePersonalTacho.sync();
            await registroEstudiante_1.RegistroEstudiante.sync();
            await detalleEstudianteVerificacion_1.DetalleEstudianteVerificacion.sync();
            console.log('Base de datos sincronizada correctamente');
        }
        catch (error) {
            console.error('Error al conectar con la base de datos:', error);
        }
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map