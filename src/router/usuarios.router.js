import express from "express";
import { crearusuario } from "../controller/controllerUsuario.js";


const router = express.Router();

router.post('/', crearusuario)

export default router