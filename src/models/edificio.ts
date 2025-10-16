import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Edificio = sequelize.define('edificio', {
    id_edificio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_edificio' // ✅ IMPORTANTE: Especifica el nombre real de la columna
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'nombre'
    },
    sede_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'sede_id', // ✅ IMPORTANTE: Especifica el nombre real de la columna
        references: {
            model: 'sede',
            key: 'id_sede'
        }
    },
    estado: {
        type: DataTypes.SMALLINT,
        defaultValue: 1,
        field: 'estado' // ✅ IMPORTANTE: Especifica el nombre real de la columna
    }
}, {
    tableName: 'edificio',
    timestamps: false,
    underscored: false // ✅ IMPORTANTE: Desactiva la conversión automática a snake_case
});