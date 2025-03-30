import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

const puntuacionUsuarioCollection = "puntuacionsUsuario"
const puntuacionUsuarioSchema = mongoose.Schema({
    puntuacion: {type: Number, required: true},
    descripcion: {type: String, required: true},
    idRecerva: {type:mongoose.Schema.Types.ObjectId, ref: 'recerva'}
})

puntuacionUsuarioSchema.plugin(mongoosePaginate)
const puntuacionUsuariosModel = mongoose.model(puntuacionUsuarioCollection,puntuacionUsuarioSchema)
export default puntuacionUsuariosModel