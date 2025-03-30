import express from "express";
import { crearTipo } from "../controller/controllerTipo.js";


const router = express.Router();

router.post('/', crearTipo)


export default router