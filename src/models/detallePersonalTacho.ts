// src/models/detallePersonalTacho.ts
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const DetallePersonalTacho = sequelize.define('detalle_personal_tacho', {
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
    papel_kg: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    }
}, {
    tableName: 'detalles_personal_tacho',
    timestamps: true,
    createdAt: 'created_at', 
    updatedAt: 'updated_at'  
});