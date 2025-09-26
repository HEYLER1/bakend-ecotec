"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./models/server"));
const appConfiguracion_1 = require("./config/appConfiguracion");
// Configuramos dotenv
dotenv_1.default.config();
// Inicializar AppConfig
(0, appConfiguracion_1.initializeApp)();
const server = new server_1.default();
//# sourceMappingURL=index.js.map