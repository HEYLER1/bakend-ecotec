import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const DetallePersonalCanastillas = sequelize.define('detalle_personal_canastillas', {
    id_detalle_canastillas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    registro_personal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'registro_personal',
            key: 'id_registro_personal'
        }
    },
    plasticos_kg: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    }
}, {
    tableName: 'detalle_personal_canastillas',
    timestamps: false
});