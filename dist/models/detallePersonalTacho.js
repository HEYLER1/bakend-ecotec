"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetallePersonalTacho = void 0;
// src/models/detallePersonalTacho.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.DetallePersonalTacho = connection_1.default.define('detalle_personal_tacho', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_registro: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    papel_kg: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    }
}, {
    tableName: 'detalles_personal_tacho',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
//# sourceMappingURL=detallePersonalTacho.js.map