import express from "express"
import { calendario, guardarReserva, reservas,eliminarReserva } from "../controller/controllerReserva.js"

const router = express.Router();

router.get('/calendario/:id/:tipo', calendario)
router.get('/reservas/:id/:tipo', reservas)
router.post('/guardarReserva', guardarReserva)
router.delete('/:id',eliminarReserva)

export default router