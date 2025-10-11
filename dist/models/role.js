"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Perfil = void 0;
// models/role.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Perfil = connection_1.default.define('perfil', {
    id_perfil: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    estado: {
        type: sequelize_1.DataTypes.SMALLINT,
        defaultValue: 1,
        allowNull: false,
        validate: {
            isIn: [[0, 1]]
        }
    }
}, {
    tableName: 'perfil',
    timestamps: false,
    underscored: true
});
//SE ESTA USANDO PA LOS ROLES DE PERSONAL Y ADMINISTRADOR
/*
export const Role = sequelize.define('role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'roles',
    timestamps: false
});*/ 
//# sourceMappingURL=role.js.map