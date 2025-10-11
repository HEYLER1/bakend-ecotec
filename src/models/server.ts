// src/models/server.ts
import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import routesUser from '../routes/user';
import routesSede from '../routes/sede'; 
import routesEdificio from '../routes/edificio';
import routesTipoRecoleccion from '../routes/tipoRecoleccion';
import routesRegistroPersonal from '../routes/registroPersonal';
import routesProfile from '../routes/perfil'; // 👈 NUEVO - Importar rutas de perfil
import '../models/associations'; 
import { Usuario } from './user';
import { Perfil } from './role'; 
import { Sede } from './sede';
import { Edificio } from './edificio';
import { TipoRecoleccion } from './tipoRecoleccion';
import { RegistroPersonal } from './registroPersonal';
import { DetallePersonalPilas } from './detallePersonalPilas';
import { DetallePersonalCanastillas } from './detallePersonalCanastillas';
import { DetallePersonalTacho } from './detallePersonalTacho';

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
            // ✅ Sincronizar en orden: tablas padre primero
            await Perfil.sync();          // 1️⃣ Tabla independiente
            await Usuario.sync();         // 2️⃣ Depende de Perfil
            await Sede.sync();            // 3️⃣ Tabla independiente
            await Edificio.sync();        // 4️⃣ Depende de Sede
            await TipoRecoleccion.sync(); // 5️⃣ Tabla independiente
            await RegistroPersonal.sync(); // 6️⃣ Depende de Usuario, Edificio, TipoRecoleccion
            await DetallePersonalPilas.sync(); // 7️⃣ Depende de RegistroPersonal
            await DetallePersonalCanastillas.sync(); // 8️⃣ Depende de RegistroPersonal
            await DetallePersonalTacho.sync(); // 9️⃣ Depende de RegistroPersonal
            
            console.log('Base de datos sincronizada correctamente');
        } catch (error) {
            console.error('Error al conectar con la base de datos:', error);
        }
    }
}

export default Server;