// src/models/detallePersonalPilas.ts
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const DetallePersonalPilas = sequelize.define('detalle_personal_pilas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_registro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    plasticos_kg: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    organicos_kg: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    vidrio_kg: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    metales_kg: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    papel_carton_kg: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    no_aprovechables_kg: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    }
}, {
    tableName: 'detalles_personal_pilas',
    timestamps: true,
    createdAt: 'created_at',  // ← Con guion bajo
    updatedAt: 'updated_at'   // ← Con guion bajo
});