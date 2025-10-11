"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = void 0;
const user_1 = require("../models/user");
const role_1 = require("../models/role");
const getProfile = async (req, res) => {
    try {
        const id_usuario = req.usuario?.id_usuario;
        if (!id_usuario) {
            return res.status(401).json({
                msg: 'Usuario no autenticado'
            });
        }
        const usuario = await user_1.Usuario.findOne({
            where: { id_usuario },
            attributes: [
                'id_usuario',
                'email',
                'nombre',
                'apellido',
                'telefono',
                'dni'
            ],
            include: [{
                    model: role_1.Perfil,
                    as: 'perfil',
                    attributes: ['nombre']
                }]
        });
        if (!usuario) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            });
        }
        return res.json({
            success: true,
            data: usuario
        });
    }
    catch (error) {
        console.error('Error al obtener perfil:', error);
        return res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};
exports.getProfile = getProfile;
//# sourceMappingURL=Perfil.Controller.js.map