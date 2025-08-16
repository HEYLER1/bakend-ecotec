"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = async (req, res) => {
    const { username, password } = req.body;
    // Validamos si el usuario ya existe en la base de datos
    const user = await user_1.User.findOne({ where: { username: username } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
        });
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    try {
        // Guardarmos usuario en la base de datos
        await user_1.User.create({
            username: username,
            password: hashedPassword
        });
        res.json({
            msg: `Usuario ${username} creado exitosamente!`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        });
    }
};
exports.newUser = newUser;
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    // Validamos si el usuario existe en la base de datos
    const user = await user_1.User.findOne({ where: { username: username } });
    if (!user) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} en la base datos`
        });
    }
    // Validamos password
    const passwordValid = await bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Password Incorrecta`
        });
    }
    // Generamos token
    const token = jsonwebtoken_1.default.sign({
        username: username
    }, process.env.SECRET_KEY || 'pepito123');
    res.json(token);
};
exports.loginUser = loginUser;
//# sourceMappingURL=user.js.map