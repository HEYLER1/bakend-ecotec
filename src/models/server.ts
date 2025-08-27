import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import routesUser from '../routes/user';

import { User } from './user';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.midlewares();
        this.routes();
        this.frontend();
        this.dbConnect();
        this.listen();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        });
    }

    routes() {
        this.app.use('/api/users', routesUser);
    }

    midlewares() {
        // Parseo body
        this.app.use(express.json());

        // Cors
        this.app.use(cors());
    }

    frontend() {
    const distPath = path.resolve(__dirname, "../../ecotec-unaj/dist/browser");

    // servir assets de Angular compilados
    this.app.use(express.static(distPath));

    // cualquier ruta que no sea /api → devuelve index.html
    this.app.get(/^(?!\/api).*/, (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
    });

    }

    async dbConnect() {
        try {
            await User.sync();
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;
