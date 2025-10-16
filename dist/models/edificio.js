"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Edificio = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Edificio = connection_1.default.define('edificio', {
    id_edificio: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_edificio' // ✅ IMPORTANTE: Especifica el nombre real de la columna
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        field: 'nombre'
    },
    sede_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'sede_id', // ✅ IMPORTANTE: Especifica el nombre real de la columna
        references: {
            model: 'sede',
            key: 'id_sede'
        }
    },
    estado: {
        type: sequelize_1.DataTypes.SMALLINT,
        defaultValue: 1,
        field: 'estado' // ✅ IMPORTANTE: Especifica el nombre real de la columna
    }
}, {
    tableName: 'edificio',
    timestamps: false,
    underscored: false // ✅ IMPORTANTE: Desactiva la conversión automática a snake_case
});
//# sourceMappingURL=edificio.js.map