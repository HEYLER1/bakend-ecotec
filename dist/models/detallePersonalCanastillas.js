"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetallePersonalCanastillas = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.DetallePersonalCanastillas = connection_1.default.define('detalle_personal_canastillas', {
    id_detalle_canastillas: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    registro_personal_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'registro_personal',
            key: 'id_registro_personal'
        }
    },
    plasticos_kg: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    }
}, {
    tableName: 'detalle_personal_canastillas',
    timestamps: false
});
//# sourceMappingURL=detallePersonalCanastillas.js.map