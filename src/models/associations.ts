import { Usuario } from './user';
import { Perfil } from './role';
import { Sede } from './sede';
import { Edificio } from './edificio';
import { TipoRecoleccion } from './tipoRecoleccion';
import { RegistroPersonal } from './registroPersonal';
import { DetallePersonalPilas } from './detallePersonalPilas';
import { DetallePersonalCanastillas } from './detallePersonalCanastillas';
import { DetallePersonalTacho } from './detallePersonalTacho';
import { RegistroEstudiante } from './registroEstudiante';
import { DetalleEstudianteVerificacion } from './detalleEstudianteVerificacion';

export const setupAssociations = () => {
    // Usuario - Perfil
    Usuario.belongsTo(Perfil, {
        foreignKey: 'perfil_id',
        as: 'perfil'
    });
    Perfil.hasMany(Usuario, {
        foreignKey: 'perfil_id',
        as: 'usuarios'
    });

    // Edificio - Sede
    Edificio.belongsTo(Sede, {
        foreignKey: 'sede_id',
        as: 'sede'
    });
    Sede.hasMany(Edificio, {
        foreignKey: 'sede_id',
        as: 'edificios'
    });

    // RegistroPersonal - Usuario
    RegistroPersonal.belongsTo(Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario'
    });
    Usuario.hasMany(RegistroPersonal, {
        foreignKey: 'usuario_id',
        as: 'registros_personal'
    });

    // RegistroPersonal - Edificio
    RegistroPersonal.belongsTo(Edificio, {
        foreignKey: 'edificio_id',
        as: 'edificio'
    });
    Edificio.hasMany(RegistroPersonal, {
        foreignKey: 'edificio_id',
        as: 'registros_personal'
    });

    // RegistroPersonal - TipoRecoleccion
    RegistroPersonal.belongsTo(TipoRecoleccion, {
        foreignKey: 'tipo_recoleccion_id',
        as: 'tipo_recoleccion'
    });
    TipoRecoleccion.hasMany(RegistroPersonal, {
        foreignKey: 'tipo_recoleccion_id',
        as: 'registros'
    });

    // RegistroPersonal - DetallePersonalPilas (1:1)
    RegistroPersonal.hasOne(DetallePersonalPilas, {
        foreignKey: 'registro_personal_id',
        as: 'detalle_pilas'
    });
    DetallePersonalPilas.belongsTo(RegistroPersonal, {
        foreignKey: 'registro_personal_id',
        as: 'registro'
    });

    // RegistroPersonal - DetallePersonalCanastillas (1:1)
    RegistroPersonal.hasOne(DetallePersonalCanastillas, {
        foreignKey: 'registro_personal_id',
        as: 'detalle_canastillas'
    });
    DetallePersonalCanastillas.belongsTo(RegistroPersonal, {
        foreignKey: 'registro_personal_id',
        as: 'registro'
    });

    // RegistroPersonal - DetallePersonalTacho (1:1)
    RegistroPersonal.hasOne(DetallePersonalTacho, {
        foreignKey: 'registro_personal_id',
        as: 'detalle_tacho'
    });
    DetallePersonalTacho.belongsTo(RegistroPersonal, {
        foreignKey: 'registro_personal_id',
        as: 'registro'
    });

    // RegistroEstudiante - Usuario
    RegistroEstudiante.belongsTo(Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario'
    });
    Usuario.hasMany(RegistroEstudiante, {
        foreignKey: 'usuario_id',
        as: 'registros_estudiante'
    });

    // RegistroEstudiante - Edificio
    RegistroEstudiante.belongsTo(Edificio, {
        foreignKey: 'edificio_id',
        as: 'edificio'
    });
    Edificio.hasMany(RegistroEstudiante, {
        foreignKey: 'edificio_id',
        as: 'registros_estudiante'
    });

    // RegistroEstudiante - DetalleEstudianteVerificacion (1:1)
    RegistroEstudiante.hasOne(DetalleEstudianteVerificacion, {
        foreignKey: 'registro_estudiante_id',
        as: 'verificacion'
    });
    DetalleEstudianteVerificacion.belongsTo(RegistroEstudiante, {
        foreignKey: 'registro_estudiante_id',
        as: 'registro'
    });
};