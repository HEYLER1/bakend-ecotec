"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalleEstudianteVerificacion = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.DetalleEstudianteVerificacion = connection_1.default.define('detalle_estudiante_verificacion', {
    id_detalle_verificacion: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    registro_estudiante_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'registro_estudiante',
            key: 'id_registro_estudiante'
        }
    },
    papel_carton: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    plasticos: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    metales: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    organicos: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    vidrio: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    no_aprovechables: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'detalle_estudiante_verificacion',
    timestamps: false
});
//# sourceMappingURL=detalleEstudianteVerificacion.js.map