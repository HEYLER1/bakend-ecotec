import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const DetallePersonalPilas = sequelize.define('detalle_personal_pilas', {
    id_detalle_pilas: {
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
    },
    organicos_kg: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    vidrio_kg: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    metales_kg: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    papel_carton_kg: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    no_aprovechables_kg: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    }
}, {
    tableName: 'detalle_personal_pilas',
    timestamps: false
});