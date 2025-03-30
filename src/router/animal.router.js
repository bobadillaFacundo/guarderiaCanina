import express from "express";
import { crearAnimal, todosLosAnimales, busquedaAnimal } from "../controller/controllerAnimal.js";

const router = express.Router();


router.get('/',todosLosAnimales)
router.post('/',crearAnimal)
router.route('/busqueda/:nombreAnimal').get(busquedaAnimal)

export default router