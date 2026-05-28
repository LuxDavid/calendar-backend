import { response, request } from 'express';
import { userModel } from '../models/Usuario.js';
import bcrypt from "bcryptjs";
import { generarJWT } from '../helpers/jwt.js';
import EventModel from '../models/Eventos.js';

export const getEventos = async (req = request, res = response) => {

    const eventos = await EventModel.find()
        .populate('user', 'name');

    return res.status(200).json({
        ok: true,
        eventos
    })
}

export const crearEvento = async (req = request, res = response) => {

    const evento = new EventModel(req.body);

    try {

        evento.user = req.uid;

        const eventoGuardato = await evento.save();

        res.json({
            ok: true,
            msg: 'Evento creado',
            evento
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })
    }

}

export const actualizarEvento = async (req = request, res = response) => {

    const eventoId = req.params.id
    const uid = req.uid;

    try {

        const evento = await EventModel.findById(eventoId);

        if (!evento) {
            return res.status(400).json({
                ok: false,
                msg: 'Evento no existe con ese id'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        };

        const eventoActualizado = await EventModel.findByIdAndUpdate(eventoId, evento, {
            returnDocument: 'after'
        });

        return res.json({
            ok: true,
            msg: 'Evento actualizado',
            eventoActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })
    }
}

export const eliminarEvento = async (req = request, res = response) => {

    const eventoId = req.params.id
    const uid = req.uid;

    try {

        const evento = await EventModel.findById(eventoId);

        if (!evento) {
            return res.status(400).json({
                ok: false,
                msg: 'Evento no existe con ese id'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const eventoActualizado = await EventModel.findByIdAndDelete(eventoId, evento, {
            returnDocument: 'after'
        });

        return res.status(200).json({
            ok: true,
            msg: 'Evento eliminado',
            eventoActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })
    }
}