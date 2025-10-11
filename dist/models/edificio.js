"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Edificio = void 0;
// src/models/edificio.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Edificio = connection_1.default.define('edificio', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    id_sede: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN, // ← Cambiar a BOOLEAN
        defaultValue: true
    }
}, {
    tableName: 'edificios',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});
//# sourceMappingURL=edificio.js.map