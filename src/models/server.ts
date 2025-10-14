import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import sequelize from '../db/connection';

import { Perfil } from './role';
import { Usuario } from './user';
import { Sede } from './sede';
import { Edificio } from './edificio';
import { TipoRecoleccion } from './tipoRecoleccion';
import { RegistroPersonal } from './registroPersonal';
import { DetallePersonalPilas } from './detallePersonalPilas';
import { DetallePersonalCanastillas } from './detallePersonalCanastillas';
import { DetallePersonalTacho } from './detallePersonalTacho';
import { RegistroEstudiante } from './registroEstudiante';
import { DetalleEstudianteVerificacion } from './detalleEstudianteVerificacion';

import { setupAssociations } from './associations';

import routesUser from '../routes/user';
import routesSede from '../routes/sede'; 
import routesEdificio from '../routes/edificio';
import routesTipoRecoleccion from '../routes/tipoRecoleccion';
import routesRegistroPersonal from '../routes/registroPersonal';
import routesRegistroEstudiante from '../routes/registroEstudiante.routes';
import routesProfile from '../routes/perfil';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
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
        this.app.use('/api/users', routesUser);
        this.app.use('/api/sedes', routesSede);
        this.app.use('/api/edificios', routesEdificio);
        this.app.use('/api/tipos-recoleccion', routesTipoRecoleccion);
        this.app.use('/api/registros-personal', routesRegistroPersonal);
        this.app.use('/api/registros-estudiante', routesRegistroEstudiante);
        this.app.use('/api/profile', routesProfile);
    }

    midlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    frontend() {
        const distPath = path.resolve(__dirname, "../../ecotec-unaj/dist/browser");
        this.app.use(express.static(distPath));
        this.app.get(/^(?!\/api).*/, (req, res) => {
            res.sendFile(path.join(distPath, "index.html"));
        });
    }

    async dbConnect() {
        try {
            await sequelize.authenticate();
            console.log('Conectado exitosamente a la base de datos');

            setupAssociations();
            console.log('Asociaciones configuradas');

            await Perfil.sync();
            await Usuario.sync();
            await Sede.sync();
            await Edificio.sync();
            await TipoRecoleccion.sync();
            await RegistroPersonal.sync();
            await DetallePersonalPilas.sync();
            await DetallePersonalCanastillas.sync();
            await DetallePersonalTacho.sync();
            await RegistroEstudiante.sync();
            await DetalleEstudianteVerificacion.sync();
            
            console.log('Base de datos sincronizada correctamente');
        } catch (error) {
            console.error('Error al conectar con la base de datos:', error);
        }
    }
}

export default Server;