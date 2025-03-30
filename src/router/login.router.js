import express from "express";
import { crearUsuario, login, loginUsuario } from "../controller/controllerLogin.js"

const router = express.Router();

router.get('/', login)
router.get('/crearUsuario',crearUsuario)
router.post('/',loginUsuario)

export default router