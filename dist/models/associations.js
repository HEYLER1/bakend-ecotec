"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.User = void 0;
// models/associations.ts
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const role_1 = require("./role");
Object.defineProperty(exports, "Role", { enumerable: true, get: function () { return role_1.Role; } });
// Definir la relación: User pertenece a Role
user_1.User.belongsTo(role_1.Role, {
    foreignKey: 'role_id',
    as: 'role'
});
// Definir la relación inversa: Role tiene muchos Users
role_1.Role.hasMany(user_1.User, {
    foreignKey: 'role_id',
    as: 'users'
});
//# sourceMappingURL=associations.js.map