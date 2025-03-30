import usuariosModel from "../model/usuario.js";


export const crearusuario = ('/', async (req, res) => {
    try {
        let {nombre, mail, password,animales,recervas} = req.body
        const nuevoUsuario = await new usuariosModel({
            nombre:nombre, mail:mail, password:password, animales:animales, recervas:recervas
        })
        const usuarioGuardado = await nuevoUsuario.save()
        res.status(201).json(usuarioGuardado)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})