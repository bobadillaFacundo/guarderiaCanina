import mongoose from "mongoose";
import animalesModel from "../model/animal.js";
import tipoAnimalModel from "../model/tipoAnimal.js";
import usuariosModel from "../model/usuario.js";
import { populate } from "dotenv";

export const todosLosAnimales = async (req, res) => {
    try {
        const animales = await animalesModel.find()
            .populate('idTipoAnimal', 'tipo') // Trae solo el campo tipo del idTipoAnimal
            .populate('idUsuario', 'nombre mail'); // Trae los campos nombre y mail del idUsuario

        res.render('listaAnimales', { animales });
    } catch (error) {
        console.error('Error al obtener los animales:', error);
        res.status(500).send('Error al obtener los animales');
    }
}


// Crear un nuevo animal
export const crearAnimal = async (req, res) => {
    try {
        let { nombre, idUsuario, idTipoAnimal } = req.body

        const usuarioId = new mongoose.Types.ObjectId(idUsuario)
        const tipoAnimalId = new mongoose.Types.ObjectId(idTipoAnimal)

        const nuevoAnimal = new animalesModel({
            nombre, idUsuario, idTipoAnimal
        })

        // Guardar el nuevo animal en la base de datos
        const animalGuardado = await nuevoAnimal.save()

        // Actualizar el usuario y el tipo de animal con el ID del nuevo animal
        await usuariosModel.updateOne(
            { _id: usuarioId },
            { $push: { animales: animalGuardado._id } }
        )

        await tipoAnimalModel.updateOne(
            { _id: tipoAnimalId },
            { $push: { animales: animalGuardado._id } }
        )

        res.status(201).json(animalGuardado)
    } catch (error) {
        res.status(400).json({ error: error.message })
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
    
        console.log(usuarios)
        
    res.render('busquedaAnimal', { animales, usuarios  })

    } catch (error) {
        res.status(404).json({ error: error.message })

    }
}
