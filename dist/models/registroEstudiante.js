"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistroEstudiante = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.RegistroEstudiante = connection_1.default.define('registro_estudiante', {
    id_registro_estudiante: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'id_usuario'
        }
    },
    edificio_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'edificio',
            key: 'id_edificio'
        }
    },
    codigo_pila: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    observaciones: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    fecha_registro: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    estado: {
        type: sequelize_1.DataTypes.SMALLINT,
        defaultValue: 1,
        validate: {
            isIn: [[0, 1]]
        }
    }
}, {
    tableName: 'registro_estudiante',
    timestamps: false
});
//# sourceMappingURL=registroEstudiante.js.map