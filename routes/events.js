import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { actualizarEvento, crearEvento, eliminarEvento, getEventos } from "../controllers/events.js";
import {check} from "express-validator";
import {validarCampos} from "../middlewares/validar-campos.js";
import { isDate } from "../helpers/isDate.js";

export const routerEvents= Router();

routerEvents.use(validarJWT);

routerEvents.get('/',  getEventos);

routerEvents.post('/',[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obliagoria').custom(isDate),
    // check('end', 'Fecha de finalizacion es obliagoria').custom(isDate),
    validarCampos
],crearEvento);

routerEvents.put('/:id',  actualizarEvento);

routerEvents.delete('/:id',  eliminarEvento);