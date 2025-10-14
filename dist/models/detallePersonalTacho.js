"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetallePersonalTacho = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.DetallePersonalTacho = connection_1.default.define('detalle_personal_tacho', {
    id_detalle_tacho: {
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
    papel_kg: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    }
}, {
    tableName: 'detalle_personal_tacho',
    timestamps: false
});
//# sourceMappingURL=detallePersonalTacho.js.map