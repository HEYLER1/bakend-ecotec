// models/user.ts
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Perfil } from './role';

export const Usuario = sequelize.define('usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    usuario: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING(8),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true,
        defaultValue: null
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.SMALLINT,
        defaultValue: 1,
        allowNull: false,
        validate: {
            isIn: [[0, 1]]
        }
    },
    perfil_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        references: {
            model: 'perfil',
            key: 'id_perfil'
        }
    }
}, {
    tableName: 'usuario',
    timestamps: false,
    underscored: true,
    //RESTRINGIR CONSULTAS CON SCOPE DE SEQUELIZE XD
    scopes: {
        forLogin: {     //login 
            attributes: ['id_usuario', 'email', 'password', 'estado', 'nombre', 'apellido', 'perfil_id']
        },
        withoutPassword: {  // Scope sin password
            attributes: { exclude: ['password'] }
        },
        public: {
            attributes: ['id_usuario', 'nombre', 'apellido', 'email'] // Scope público - mínimo
        }
    }
});





/*import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Usuario = sequelize.define('usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING(8),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true,
        defaultValue: null
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.SMALLINT,
        defaultValue: 1,
        allowNull: false,
        validate: {
            isIn: [[0, 1]]
        }
    },
   perfil_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2
    }
}, {
    tableName: 'usuario',
    timestamps: false, // Usas fecha_creacion manual
    underscored: true
});*/