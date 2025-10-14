"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoRecoleccion = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.TipoRecoleccion = connection_1.default.define('tipo_recoleccion', {
    id_tipo_recoleccion: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    descripcion: {
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
    tableName: 'tipo_recoleccion',
    timestamps: false
});
//# sourceMappingURL=tipoRecoleccion.js.map