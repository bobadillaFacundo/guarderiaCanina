import express from "express";
import { crearUsuario } from "../controller/controllerUsuario.js";


const router = express.Router();

router.post('/', crearUsuario)

export default router