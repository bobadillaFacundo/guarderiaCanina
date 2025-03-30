import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const authMiddleware = (req, res, next) => {    
    const token = req.cookies['token']
    
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT)  // Verifica el token
        req.user = decoded // Agrega los datos del usuario al request
        next() // Continúa con la siguiente función en la ruta
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado.' })
    }
}

export default authMiddleware