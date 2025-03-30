import mongoose from "mongoose"
import animalesModel from "../model/animal.js"
import tipoAnimalModel from "../model/tipoAnimal.js"
import usuariosModel from "../model/usuario.js"

export const menuCrearAnimal = async (req, res) => {
    try {
        const animalesTipos = await tipoAnimalModel.find().select("-animales")
        
        return res.render('crearAnimal',{animalesTipos})
    } catch (error) {
        console.log(error)
    }
}

export const todosLosAnimales = async (req, res) => {
    try {
        const animales = await animalesModel.find()
            .populate('idTipoAnimal', 'tipo') // Trae solo el campo tipo del idTipoAnimal
            .populate('idUsuario', 'nombre email'); // Trae los campos nombre y email del idUsuario

        res.render('listaAnimales', { animales });
    } catch (error) {
        console.error('Error al obtener los animales:', error);
        res.status(500).send('Error al obtener los animales');
    }
}

export const busquedaAnimal = async (req, res) => {
    try {
        const { nombreAnimal } = req.params
        // Buscar animales que coincidan con el nombre
        const animales = await animalesModel.find({ nombre: { $regex: nombreAnimal, $options: 'i' } })
        .populate({
            path: 'idTipoAnimal', // La propiedad que quieres poblar
            select: 'tipo',       // Campos que deseas que se muestren de idTipoAnimal
        })
        .populate({
            path: 'idUsuario',    // La propiedad que quieres poblar
            select: 'nombre',     // Campos que deseas que se muestren de idUsuario
        })

        // Buscar usuarios que coincidan con el nombre
        const usuarios = await usuariosModel.find({ nombre: { $regex: nombreAnimal, $options: 'i' } })
        .populate({
            path: 'animales',    // Campo que quieres poblar
            ref: 'animal', 
            select: 'nombre animales',      // El modelo de la referencia
            populate: { path: 'idTipoAnimal', select: 'tipo' }
        })
            
    res.render('busquedaAnimal', { animales, usuarios  })

    } catch (error) {
        res.status(404).json({ error: error.message })

    }
}

export const registrarMascota = async (req, res) => {
    try {
        const { mascota } = req.body
        console.log(mascota);
        
        const nuevoAnimal = new animalesModel({
            nombre: mascota.nombre,
            idUsuario: new mongoose.Types.ObjectId(mascota.idUsuario),
            idTipoAnimal: new mongoose.Types.ObjectId(mascota.tipo),
            adopcion: mascota.adopcion,
            enLaGuarderia: false
        })        
        const result = await nuevoAnimal.save()
        res.status(201).json({result})
    }catch(error){
        console.log(error)
    }

}