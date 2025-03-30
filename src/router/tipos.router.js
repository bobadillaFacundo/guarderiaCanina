import express from "express";
import { crearTipo, menuCrearTipo } from "../controller/controllerTipo.js";


const router = express.Router();

router.get('/', menuCrearTipo)
router.post('/', crearTipo)


export default router