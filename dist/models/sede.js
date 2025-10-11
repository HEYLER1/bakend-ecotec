"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sede = void 0;
// models/sede.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Sede = connection_1.default.define('sede', {
    id_sede: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    estado: {
        type: sequelize_1.DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1,
        validate: {
            isIn: [[0, 1]]
        }
    }
}, {
    tableName: 'sede',
    timestamps: false,
    underscored: true
});
//PARA SEDES SEGUN BASE DE DATOS 
//# sourceMappingURL=sede.js.map