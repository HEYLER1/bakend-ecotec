import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Edificio = sequelize.define('edificio', {
    id_edificio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    sede_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'sede',
            key: 'id_sede'
        }
    },
    estado: {
        type: DataTypes.SMALLINT,
        defaultValue: 1,
        validate: {
            isIn: [[0, 1]]
        }
    }
}, {
    tableName: 'edificio',
    timestamps: false
});