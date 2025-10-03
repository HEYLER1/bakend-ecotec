// models/associations.ts
import { User } from './user';
import { Role } from './role';

// Definir la relación: User pertenece a Role
User.belongsTo(Role, {
    foreignKey: 'role_id',
    as: 'role'
});

// Definir la relación inversa: Role tiene muchos Users
Role.hasMany(User, {
    foreignKey: 'role_id',
    as: 'users'
});

export { User, Role };