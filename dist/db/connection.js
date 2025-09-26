"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DB_NAME = process.env.DB_NAME || "user";
const DB_USER = process.env.DB_USER || "root";
const DB_PASS = process.env.DB_PASS || "";
const DB_HOST = process.env.DB_HOST || "localhost";
const allowedDialects = ["mysql", "postgres", "sqlite", "mariadb", "mssql"];
const DB_DIALECT = (allowedDialects.includes(process.env.DB_DIALECT)
    ? process.env.DB_DIALECT
    : "mysql");
const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false,
});
exports.default = sequelize;
//# sourceMappingURL=connection.js.map