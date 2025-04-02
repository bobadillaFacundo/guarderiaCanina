import express from "express"
import { calendario, guardarReserva, reservas,eliminarReserva, pagarMenu } from "../controller/controllerReserva.js"

const router = express.Router();

router.get('/calendario/:id/:tipo', calendario)
router.get('/reservas/:id/:tipo', reservas)
router.post('/guardarReserva', guardarReserva)
router.delete('/:id',eliminarReserva)
router.get('/pagar/:tipo/:reserva', pagarMenu)
export default router