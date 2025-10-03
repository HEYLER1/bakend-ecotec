import dotenv from 'dotenv';
import Server from "./models/server";
import { initializeApp } from './config/appConfiguracion';
// Configuramos dotenv
dotenv.config();

// Inicializar AppConfig
initializeApp();

const server = new Server();