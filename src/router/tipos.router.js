import express from "express";
import { crearTipo,listadoTipos, menuCrearTipo } from "../controller/controllerTipo.js";

const router = express.Router();

router.get('/:tipo', menuCrearTipo)
router.post('/',crearTipo)
router.get('/listado/:tipo', listadoTipos)


export default router