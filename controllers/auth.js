import { response, request } from 'express';
import { userModel } from '../models/Usuario.js';
import bcrypt from "bcryptjs";
import { generarJWT } from '../helpers/jwt.js';

export const crearUsuario = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        let usuarioExist = await userModel.findOne({ email });

        if (usuarioExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        }

        const usuario = new userModel(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario._id, usuario.name);

        return res.status(201).json({
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            msg: 'registro',
            token
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

export const loginUsuario = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        let usuario = await userModel.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario y contraseña no son corrector'
            })
        }

        //Confirmar los password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
                return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario._id, usuario.name);

        return res.status(201).json({
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            msg: 'login',
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

export const revalidarToken = async (req = request, res = response) => {

    const {uid, name} = req;

    //Generar JWT
        const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    });
}

