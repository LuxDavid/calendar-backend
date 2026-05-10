import express from "express";
import {config} from "dotenv";
import {router} from "./routes/auth.js";

//Crear el servidor de express
config();
const app= express();

// console.log(process.env);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Directorio publico
app.use(express.static('public'))

//Rutas 
app.use('/api/auth', router);

//Escuchar peticiones
app.listen(process.env.PORT, () => console.log(`Servidor corriendo en el puerto ${process.env.PORT}`));