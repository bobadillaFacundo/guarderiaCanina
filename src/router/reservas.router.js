import express from "express"
import { calendario, guardarReserva, reservas,eliminarReserva } from "../controller/controllerReserva.js"

const router = express.Router();

router.get('/calendario', calendario)
router.get('/reservas', reservas)
router.post('/guardarReserva', guardarReserva)
router.delete('/:id',eliminarReserva)

export default router