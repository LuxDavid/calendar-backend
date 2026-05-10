import {Router} from "express";
import { crearUsuario, revalidarToken, loginUsuario } from "../controllers/auth.js";

export const router= Router();

router.get('/', (req,res) => {
    res.json({ok:true});
});

router.post('/', loginUsuario);

router.post('/new', crearUsuario);

router.post('/renew', revalidarToken);

// export default router;