// src/models/registroPersonal.ts
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const RegistroPersonal = sequelize.define('registro_personal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_registro: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_sede: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_edificio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_tipo_recoleccion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'registros_personal',
    timestamps: true,
    createdAt: 'created_at',  // ← Con guion bajo
    updatedAt: 'updated_at'   // ← Con guion bajo
});