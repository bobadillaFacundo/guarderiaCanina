import mongoose from "mongoose"
import usuariosModel from "../model/usuario.js";
import bcrypt from 'bcryptjs'


// Función para crear un usuario
export const crearUsuario = async (req, res) => {
    const usuario = req.body

    if (!usuario.username || !usuario.password || !usuario.nombre) {
        return res.status(400).json({ message: 'Campos vacios' })
    }

    try {
        const nuevoUsuario = new usuariosModel({
            nombre: usuario.nombre,
            email: usuario.username,
            password: bcrypt.hashSync(usuario.password, 10),
            animales: [],
            reservas: [],
            tipoUsuario: "comun",
        })
        nuevoUsuario.save()
        res.json({nuevoUsuario})
    } catch (error) {
        console.error(`Error al insertar documento, ${error}`)
        res.status(500).json({ message: 'Error al crear el usuario' })
    }
}


export const traerPerfilUsuario = async (req, res) => {
    try {

    const { id } = req.params
    console.log(id);
    
    const usuario = await usuariosModel.findById(new mongoose.Types.ObjectId(id))
    .populate({
        path: 'animales',
        populate: {
            path: 'idTipoAnimal',
            select: 'tipo'
        }
    })
    res.render('viewPerfilUsuario', { usuario })
    } catch (error) {
        console.log(error)
    }
}

export const principal = async (req, res) => {
    try {
        res.render('viewPrincipal')
        }
    catch (error) {
        console.log(error)
    }
}