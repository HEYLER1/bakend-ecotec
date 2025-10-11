"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Carga las variables del .env
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || "userpost", process.env.DB_USER || "postgres", process.env.DB_PASS || "", {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: false,
});
sequelize
    .authenticate()
    .then(() => console.log("Conectado exitosamente papicha"))
    .catch((err) => console.error("error ps", err));
exports.default = sequelize;
//# sourceMappingURL=connection.js.map