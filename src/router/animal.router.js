import express from "express";
import { registrarMascota, todosLosAnimales, busquedaAnimal, menuCrearAnimal } from "../controller/controllerAnimal.js";

const router = express.Router();


router.get('/', todosLosAnimales)
router.get('/altaAnimal', menuCrearAnimal)
router.post('/registrarMascota', registrarMascota)
router.route('/busqueda/:nombreAnimal').get(busquedaAnimal)

export default router