import express from "express";
import {principal,crearUsuario, login, loginUsuario } from "../controller/controllerLogin.js"

const router = express.Router();

router.get('/', login)
router.get('/crearUsuario',crearUsuario)
router.post('/',loginUsuario)
router.get('/principal',principal)
export default router