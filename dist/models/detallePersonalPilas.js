"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetallePersonalPilas = void 0;
// src/models/detallePersonalPilas.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.DetallePersonalPilas = connection_1.default.define('detalle_personal_pilas', {
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
    plasticos_kg: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    organicos_kg: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    vidrio_kg: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    metales_kg: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    papel_carton_kg: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    no_aprovechables_kg: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    }
}, {
    tableName: 'detalles_personal_pilas',
    timestamps: true,
    createdAt: 'created_at', // ← Con guion bajo
    updatedAt: 'updated_at' // ← Con guion bajo
});
//# sourceMappingURL=detallePersonalPilas.js.map