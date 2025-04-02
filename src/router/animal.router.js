import express from "express";
import { registrarMascota, todosLosAnimales, busquedaAnimal, menuCrearAnimal,todasLasMascotasAdopcion } from "../controller/controllerAnimal.js";

const router = express.Router();


router.get('/:tipo', todosLosAnimales)
router.get('/altaAnimal/:tipo', menuCrearAnimal)
router.get('/adopcionAnimal/:tipo', todasLasMascotasAdopcion)
router.post('/registrarMascota', registrarMascota)
router.route('/busqueda/:nombreAnimal/:tipo').get(busquedaAnimal)

export default router