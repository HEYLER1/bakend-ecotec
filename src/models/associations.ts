// src/models/associations.ts
// src/models/associations.ts
import { Usuario } from './user';
import { Perfil } from './role';
import { Sede } from './sede';
import { Edificio } from './edificio';

// Relación User - Role
Usuario.belongsTo(Perfil, {
    foreignKey: 'perfil_id',
    as: 'perfil'
});

Perfil.hasMany(Usuario, {
    foreignKey: 'perfil_id',
    as: 'usuarios'
});

// Relación Sede - Edificio
Sede.hasMany(Edificio, {
    foreignKey: 'id_sede',
    as: 'edificios'
});

Edificio.belongsTo(Sede, {
    foreignKey: 'id_sede',
    as: 'sede'
});

// Exportar todos los modelos
export { Usuario, Perfil, Sede };

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