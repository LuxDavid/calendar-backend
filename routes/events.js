import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { actualizarEvento, crearEvento, eliminarEvento, getEventos } from "../controllers/events.js";

export const routerEvents= Router();

// routerEvents.use(validarJWT);

routerEvents.get('/',  getEventos);

routerEvents.post('/',  crearEvento);

routerEvents.put('/',  actualizarEvento);

routerEvents.delete('/',  eliminarEvento);