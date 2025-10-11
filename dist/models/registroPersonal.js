"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistroPersonal = void 0;
// src/models/registroPersonal.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.RegistroPersonal = connection_1.default.define('registro_personal', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_registro: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_sede: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_edificio: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_tipo_recoleccion: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    observaciones: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'registros_personal',
    timestamps: true,
    createdAt: 'created_at', // ← Con guion bajo
    updatedAt: 'updated_at' // ← Con guion bajo
});
//# sourceMappingURL=registroPersonal.js.map