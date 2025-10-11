// src/models/tipoRecoleccion.ts
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const TipoRecoleccion = sequelize.define('tipo_recoleccion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigo: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'tipos_recoleccion',
    timestamps: false
});