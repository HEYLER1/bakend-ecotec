// models/sede.ts
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
export const Sede = sequelize.define('sede', {
    id_sede: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    imagen: {
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
    tableName: 'sede',  
    timestamps: false,  
    underscored: true
});
//PARA SEDES SEGUN BASE DE DATOS 