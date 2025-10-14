import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const DetallePersonalTacho = sequelize.define('detalle_personal_tacho', {
    id_detalle_tacho: {
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
    papel_kg: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    }
}, {
    tableName: 'detalle_personal_tacho',
    timestamps: false
});