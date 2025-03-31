import express from "express"
import { calendario, guardarReserva, reservas } from "../controller/controllerReserva.js"

const router = express.Router();

router.get('/calendario', calendario)
router.get('/reservas', reservas)
router.post('/guardarReserva', guardarReserva)

export default router