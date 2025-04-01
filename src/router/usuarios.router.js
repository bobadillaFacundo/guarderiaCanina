import express from "express";
import { principal, crearUsuario,traerPerfilUsuario } from "../controller/controllerUsuario.js";
import authMiddeleware from "../middlewares/authMiddleware.js";


const router = express.Router();


router.post('/', crearUsuario)
router.get('/principal/:tipo',authMiddeleware,principal)
router.get('/perfil/:id/:tipo',authMiddeleware,traerPerfilUsuario)

export default router