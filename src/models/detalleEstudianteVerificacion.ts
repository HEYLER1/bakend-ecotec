import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const DetalleEstudianteVerificacion = sequelize.define('detalle_estudiante_verificacion', {
    id_detalle_verificacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    registro_estudiante_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'registro_estudiante',
            key: 'id_registro_estudiante'
        }
    },
    papel_carton: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    plasticos: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    metales: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    organicos: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    vidrio: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    no_aprovechables: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'detalle_estudiante_verificacion',
    timestamps: false
});