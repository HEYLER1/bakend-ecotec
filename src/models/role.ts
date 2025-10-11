// models/role.ts
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
export const Perfil = sequelize.define('perfil', {
    id_perfil: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    estado: {
        type: DataTypes.SMALLINT,
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