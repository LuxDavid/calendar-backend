import {Router} from "express";
import { crearUsuario, revalidarToken, loginUsuario } from "../controllers/auth.js";
import {check} from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

export const router= Router();

router.get('/',(req,res) => {
    res.json({ok:true});
});

router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({min: 6}),
    validarCampos
]  , loginUsuario);

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({min: 6}),
    validarCampos
] 
    ,crearUsuario);

router.get('/renew', validarJWT, revalidarToken);

// export default router;