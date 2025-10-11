// src/models/detallePersonalCanastillas.ts
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const DetallePersonalCanastillas = sequelize.define('detalle_personal_canastillas', {
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
    }
}, {
    tableName: 'detalles_personal_canastillas',
    timestamps: true,
    createdAt: 'created_at',  // ← Con guion bajo
    updatedAt: 'updated_at'   // ← Con guion bajo
});