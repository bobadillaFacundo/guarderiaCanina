import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import usuariosModel from "../model/usuario.js";
import dotenv from 'dotenv'

dotenv.config()

function generarToken(payload, claveSecreta, expiresIn) {
    const token = jwt.sign(
        payload,
        claveSecreta,
        { expiresIn: expiresIn } // El token expira en 1 hora            
    )
    return token
}
// Función para realizar el login
export const loginUsuario = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await usuariosModel.findOne({ email: username })
        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' })
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Credenciales incorrectas' })
        }

        const token = generarToken({ id: user._id, email: user.email }, process.env.JWT, '1h')
        res.json({ token })
    } catch (error) {
        console.error(`Error en el login: ${error}`)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}

export const login = ((req, res) => {
    try {
        return res.render('login')
    } catch (error) {
        console.log(error)
    }
})

export const crearUsuario = ((req, res) => {
    try {
        return res.render('crearUsuario')
    } catch (error) {
        console.log(error)
    }
})