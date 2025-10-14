import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const TipoRecoleccion = sequelize.define('tipo_recoleccion', {
    id_tipo_recoleccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    estado: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1,
        validate: {
            isIn: [[0, 1]]
        }
    }
}, {
    tableName: 'tipo_recoleccion',
    timestamps: false
});