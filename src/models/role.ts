// models/role.ts
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Role = sequelize.define('role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'roles',
    timestamps: false // 👈 Ya que quitaste createdAt y updatedAt en la BD
});