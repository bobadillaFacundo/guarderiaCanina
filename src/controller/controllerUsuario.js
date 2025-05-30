import mongoose from "mongoose"
import usuariosModel from "../model/usuario.js";
import bcrypt from 'bcryptjs'


// Función para crear un usuario
export const crearUsuario = async (req, res) => {
    const usuario = req.body;

    if (!usuario.username || !usuario.password || !usuario.nombre) {
        return res.status(400).json({ message: 'Campos vacíos' });
    }

    try {
        // Verificar si el usuario ya existe
        const usuarioExistente = await usuariosModel.findOne({ email: usuario.username });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        // Crear nuevo usuario
        const nuevoUsuario = new usuariosModel({
            nombre: usuario.nombre,
            email: usuario.username,
            password: bcrypt.hashSync(usuario.password, 10),
            animales: [],
            reservas: [],
            tipoUsuario: "comun",
        });

        await nuevoUsuario.save(); // Guardar en MongoDB

        res.json({ nuevoUsuario });
    } catch (error) {
        // Si el error es por clave duplicada (E11000)
        if (error.code === 11000) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }
        console.error(`Error al insertar documento: ${error}`);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};



export const traerPerfilUsuario = async (req, res) => {
    try {

    const { id, tipo } = req.params


    
    const usuario = await usuariosModel.findById(new mongoose.Types.ObjectId(id))
    .populate({
        path: 'animales',
        populate: {
            path: 'idTipoAnimal',
            select: 'tipo'
        }
    })

    res.render('viewPerfilUsuario', { usuario, tipoUsuario: tipo })
    } catch (error) {
        console.log(error)
    }
}

export const principal = async (req, res) => {
    try {
        const {tipo} = req.params
        res.render('viewPrincipal',{tipoUsuario:tipo })
        }
    catch (error) {
        console.log(error)
    }
}