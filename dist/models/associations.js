"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAssociations = void 0;
const user_1 = require("./user");
const role_1 = require("./role");
const sede_1 = require("./sede");
const edificio_1 = require("./edificio");
const tipoRecoleccion_1 = require("./tipoRecoleccion");
const registroPersonal_1 = require("./registroPersonal");
const detallePersonalPilas_1 = require("./detallePersonalPilas");
const detallePersonalCanastillas_1 = require("./detallePersonalCanastillas");
const detallePersonalTacho_1 = require("./detallePersonalTacho");
const registroEstudiante_1 = require("./registroEstudiante");
const detalleEstudianteVerificacion_1 = require("./detalleEstudianteVerificacion");
const setupAssociations = () => {
    // Usuario - Perfil
    user_1.Usuario.belongsTo(role_1.Perfil, {
        foreignKey: 'perfil_id',
        as: 'perfil'
    });
    role_1.Perfil.hasMany(user_1.Usuario, {
        foreignKey: 'perfil_id',
        as: 'usuarios'
    });
    // Edificio - Sede
    edificio_1.Edificio.belongsTo(sede_1.Sede, {
        foreignKey: 'sede_id',
        as: 'sede'
    });
    sede_1.Sede.hasMany(edificio_1.Edificio, {
        foreignKey: 'sede_id',
        as: 'edificios'
    });
    // RegistroPersonal - Usuario
    registroPersonal_1.RegistroPersonal.belongsTo(user_1.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario'
    });
    user_1.Usuario.hasMany(registroPersonal_1.RegistroPersonal, {
        foreignKey: 'usuario_id',
        as: 'registros_personal'
    });
    // RegistroPersonal - Edificio
    registroPersonal_1.RegistroPersonal.belongsTo(edificio_1.Edificio, {
        foreignKey: 'edificio_id',
        as: 'edificio'
    });
    edificio_1.Edificio.hasMany(registroPersonal_1.RegistroPersonal, {
        foreignKey: 'edificio_id',
        as: 'registros_personal'
    });
    // RegistroPersonal - TipoRecoleccion
    registroPersonal_1.RegistroPersonal.belongsTo(tipoRecoleccion_1.TipoRecoleccion, {
        foreignKey: 'tipo_recoleccion_id',
        as: 'tipo_recoleccion'
    });
    tipoRecoleccion_1.TipoRecoleccion.hasMany(registroPersonal_1.RegistroPersonal, {
        foreignKey: 'tipo_recoleccion_id',
        as: 'registros'
    });
    // RegistroPersonal - DetallePersonalPilas (1:1)
    registroPersonal_1.RegistroPersonal.hasOne(detallePersonalPilas_1.DetallePersonalPilas, {
        foreignKey: 'registro_personal_id',
        as: 'detalle_pilas'
    });
    detallePersonalPilas_1.DetallePersonalPilas.belongsTo(registroPersonal_1.RegistroPersonal, {
        foreignKey: 'registro_personal_id',
        as: 'registro'
    });
    // RegistroPersonal - DetallePersonalCanastillas (1:1)
    registroPersonal_1.RegistroPersonal.hasOne(detallePersonalCanastillas_1.DetallePersonalCanastillas, {
        foreignKey: 'registro_personal_id',
        as: 'detalle_canastillas'
    });
    detallePersonalCanastillas_1.DetallePersonalCanastillas.belongsTo(registroPersonal_1.RegistroPersonal, {
        foreignKey: 'registro_personal_id',
        as: 'registro'
    });
    // RegistroPersonal - DetallePersonalTacho (1:1)
    registroPersonal_1.RegistroPersonal.hasOne(detallePersonalTacho_1.DetallePersonalTacho, {
        foreignKey: 'registro_personal_id',
        as: 'detalle_tacho'
    });
    detallePersonalTacho_1.DetallePersonalTacho.belongsTo(registroPersonal_1.RegistroPersonal, {
        foreignKey: 'registro_personal_id',
        as: 'registro'
    });
    // RegistroEstudiante - Usuario
    registroEstudiante_1.RegistroEstudiante.belongsTo(user_1.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario'
    });
    user_1.Usuario.hasMany(registroEstudiante_1.RegistroEstudiante, {
        foreignKey: 'usuario_id',
        as: 'registros_estudiante'
    });
    // RegistroEstudiante - Edificio
    registroEstudiante_1.RegistroEstudiante.belongsTo(edificio_1.Edificio, {
        foreignKey: 'edificio_id',
        as: 'edificio'
    });
    edificio_1.Edificio.hasMany(registroEstudiante_1.RegistroEstudiante, {
        foreignKey: 'edificio_id',
        as: 'registros_estudiante'
    });
    // RegistroEstudiante - DetalleEstudianteVerificacion (1:1)
    registroEstudiante_1.RegistroEstudiante.hasOne(detalleEstudianteVerificacion_1.DetalleEstudianteVerificacion, {
        foreignKey: 'registro_estudiante_id',
        as: 'verificacion'
    });
    detalleEstudianteVerificacion_1.DetalleEstudianteVerificacion.belongsTo(registroEstudiante_1.RegistroEstudiante, {
        foreignKey: 'registro_estudiante_id',
        as: 'registro'
    });
};
exports.setupAssociations = setupAssociations;
//# sourceMappingURL=associations.js.map