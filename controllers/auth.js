import {response, request} from 'express';

export const crearUsuario= (req = request, res= response) => {

    res.json({
        ok:true,
        msg:'registro'
    });
}

export const loginUsuario= (req = request, res= response) => {

    res.json({
        ok:true,
        msg:'login'
    });
}


export const revalidarToken= (req = request, res= response) => {

    res.json({
        ok:true,
        msg:'token'
    });
}

