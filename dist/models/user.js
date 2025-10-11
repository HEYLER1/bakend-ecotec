"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
// models/user.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Usuario = connection_1.default.define('usuario', {
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    usuario: {
        type: sequelize_1.DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    dni: {
        type: sequelize_1.DataTypes.STRING(8),
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(80),
        allowNull: false
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING(80),
        allowNull: false
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
        defaultValue: null
    },
    fecha_creacion: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    estado: {
        type: sequelize_1.DataTypes.SMALLINT,
        defaultValue: 1,
        allowNull: false,
        validate: {
            isIn: [[0, 1]]
        }
    },
    perfil_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        references: {
            model: 'perfil',
            key: 'id_perfil'
        }
    }
}, {
    tableName: 'usuario',
    timestamps: false,
    underscored: true,
    //RESTRINGIR CONSULTAS CON SCOPE DE SEQUELIZE XD
    scopes: {
        forLogin: {
            attributes: ['id_usuario', 'email', 'password', 'estado', 'nombre', 'apellido', 'perfil_id']
        },
        withoutPassword: {
            attributes: { exclude: ['password'] }
        },
        public: {
            attributes: ['id_usuario', 'nombre', 'apellido', 'email'] // Scope público - mínimo
        }
    }
});
/*import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Usuario = sequelize.define('usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING(8),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true,
        defaultValue: null
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.SMALLINT,
        defaultValue: 1,
        allowNull: false,
        validate: {
            isIn: [[0, 1]]
        }
    },
   perfil_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2
    }
}, {
    tableName: 'usuario',
    timestamps: false, // Usas fecha_creacion manual
    underscored: true
});*/ 
//# sourceMappingURL=user.js.map