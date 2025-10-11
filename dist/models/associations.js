"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sede = exports.Perfil = exports.Usuario = void 0;
// src/models/associations.ts
// src/models/associations.ts
const user_1 = require("./user");
Object.defineProperty(exports, "Usuario", { enumerable: true, get: function () { return user_1.Usuario; } });
const role_1 = require("./role");
Object.defineProperty(exports, "Perfil", { enumerable: true, get: function () { return role_1.Perfil; } });
const sede_1 = require("./sede");
Object.defineProperty(exports, "Sede", { enumerable: true, get: function () { return sede_1.Sede; } });
const edificio_1 = require("./edificio");
// Relación User - Role
user_1.Usuario.belongsTo(role_1.Perfil, {
    foreignKey: 'perfil_id',
    as: 'perfil'
});
role_1.Perfil.hasMany(user_1.Usuario, {
    foreignKey: 'perfil_id',
    as: 'usuarios'
});
// Relación Sede - Edificio
sede_1.Sede.hasMany(edificio_1.Edificio, {
    foreignKey: 'id_sede',
    as: 'edificios'
});
edificio_1.Edificio.belongsTo(sede_1.Sede, {
    foreignKey: 'id_sede',
    as: 'sede'
});
/*
import { User } from './user';
import { Role } from './role';


User.belongsTo(Role, {
    foreignKey: 'role_id',
    as: 'role'
});


Role.hasMany(User, {
    foreignKey: 'role_id',
    as: 'users'
});

export { User, Role };*/ 
//# sourceMappingURL=associations.js.map