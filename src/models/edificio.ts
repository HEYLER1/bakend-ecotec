// src/models/edificio.ts
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Edificio = sequelize.define('edificio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    id_sede: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,  // ← Cambiar a BOOLEAN
        defaultValue: true
    }
}, {
    tableName: 'edificios',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});