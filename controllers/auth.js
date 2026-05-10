import {response, request} from 'express';

export const crearUsuario= (req = request, res= response) => {

    const {name, email, password} = req.body;

    return res.json({
        ok:true,
        msg:'registro',
        name,
        email,
        password
    });
}

export const loginUsuario= (req = request, res= response) => {

    const {email, password} = req.body;

    return res.json({
        ok:true,
        msg:'login',
        email,
        password
    });
}


export const revalidarToken= (req = request, res= response) => {

    res.json({
        ok:true,
        msg:'token'
    });
}

