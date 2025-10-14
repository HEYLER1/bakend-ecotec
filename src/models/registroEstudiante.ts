import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const RegistroEstudiante = sequelize.define('registro_estudiante', {
    id_registro_estudiante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'id_usuario'
        }
    },
    edificio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'edificio',
            key: 'id_edificio'
        }
    },
    codigo_pila: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.SMALLINT,
        defaultValue: 1,
        validate: {
            isIn: [[0, 1]]
        }
    }
}, {
    tableName: 'registro_estudiante',
    timestamps: false
});