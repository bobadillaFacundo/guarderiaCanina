import express from "express";
import { principal, crearUsuario,traerPerfilUsuario } from "../controller/controllerUsuario.js";
import authMiddeleware from "../middlewares/authMiddleware.js";


const router = express.Router();


router.post('/', crearUsuario)
router.get('/principal',authMiddeleware,principal)
router.route('/perfil/:id',authMiddeleware).get(traerPerfilUsuario)

export default router