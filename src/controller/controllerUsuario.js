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
            recervas: [],
            tipoUsuario: "comun",
        })
        nuevoUsuario.save()
        res.json({nuevoUsuario})
    } catch (error) {
        console.error(`Error al insertar documento, ${error}`)
        res.status(500).json({ message: 'Error al crear el usuario' })
    }
}