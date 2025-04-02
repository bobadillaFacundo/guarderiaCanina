import reservasModel from "../model/reserva.js"
import moongose from "mongoose"
import animalesModel from "../model/animal.js"


export const calendario = (async(req, res) => {
    try {
        const {id} = req.params
        const {tipo} = req.params
        let animales = null
        if(tipo==="admin"){
             animales = await animalesModel.find().populate('idTipoAnimal', 'tipo').populate('idUsuario', 'nombre email')           
        } else {
             animales = await animalesModel.find({idUsuario:id}).populate('idTipoAnimal', 'tipo').populate('idUsuario', 'nombre email')          
        }
        return res.render('calendario',{animales:animales, tipoUsuario:tipo})
    } catch (error) {
        console.log(error)
    }
})


// Obtener todas las reservas
export const reservas =  async (req, res) => {
    const tipo = req.params.tipo
    const id =req.params.id
    let reservas  = null
    if(tipo==="admin"){
    reservas = await reservasModel.find()
    .select("fecha_desde fecha_hasta id_animal id_usuario")
    .populate("id_animal")
    .select("nombre")
    .populate("id_usuario")
    .select("nombre")    
    }else{
     reservas = await reservasModel
    .find({ id_usuario: id }) // Filtrar por id_usuario
    .select("fecha_desde fecha_hasta id_animal id_usuario")
    .populate({
        path: "id_animal",
        select: "nombre"
    })
    .populate({
        path: "id_usuario",
        select: "nombre"
    })    
    }
    res.json({reservas})
}

// Crear una nueva reserva
export const guardarReserva = async (req, res) => {
    const reserva = req.body.newEvent
    

    const nuevaReserva = new  reservasModel({
            fecha_desde:reserva.fecha_desde,
            fecha_hasta:reserva.fecha_hasta,
            montoTotal:reserva.montoTotal,
            id_usuario:reserva.id_usuario,
            id_animal:reserva.id_animal,
            medicamento:reserva.medicamento,
            alimento:reserva.alimento,
            extras:reserva.extras,
            isPagada:false
    })
    await nuevaReserva.save()
    res.json(nuevaReserva)
}

export const eliminarReserva = async (req, res) => {
    try {
    const {id} = req.params
    const id_obj = new moongose.Types.ObjectId(id)
    await reservasModel.findByIdAndDelete(id_obj)
    res.json({message:"Reserva eliminada"})
    } catch (error) {
        console.log(error)
    }
}

export const pagarMenu = async (req, res) => {
    try {
        const {tipo} = req.params
        const reserva = req.params.reserva
        const reservaId = new moongose.Types.ObjectId(reserva)
        const nuevaReserva = await reservasModel.findById(reservaId)
        return res.render('mercadoPago', { tipoUsuario: tipo, reserva:nuevaReserva })
    } catch (error) {
        console.log(error)
    }
}