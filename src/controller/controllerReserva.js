import reservasModel from "../model/reserva.js"
import moongose from "mongoose"
import animalesModel from "../model/animal.js"


export const calendario = (async(req, res) => {
    try {
        const {id} = req.params
        const animales = await animalesModel.find(id).populate('idTipoAnimal', 'tipo')        
        return res.render('calendario',{animales:animales})
    } catch (error) {
        console.log(error)
    }
})


// Obtener todas las reservas
export const reservas =  async (req, res) => {
    const reservas = await reservasModel.find().select("fecha_desde fecha_hasta id_animal id_usuario").populate("id_animal").select("nombre").populate("id_usuario").select("nombre")
    console.log(reservas);
    
    res.json({reservas});
}

// Crear una nueva reserva
export const guardarReserva = async (req, res) => {
    const reserva = req.body.newEvent
    
    console.log(reserva);

    const nuevaReserva = new  reservasModel({
            fecha_desde:reserva.fecha_desde,
            fecha_hasta:reserva.fecha_hasta,
            montoTotal:reserva.montoTotal,
            id_usuario:reserva.id_usuario,
            id_animal:reserva.id_animal,
            medicamento:reserva.medicamento,
            alimento:reserva.alimento,
            extras:reserva.extras
    })
    await nuevaReserva.save()
    res.json(nuevaReserva)
}