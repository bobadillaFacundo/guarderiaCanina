import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const usuarioCollection = "usuario"
const usuarioSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    email: {type: String, required: true, unique: true},
    password: {type: String, required:true},
    animales: [{ type : mongoose.Schema.Types.ObjectId, ref: 'animal' }],
    recervas: [{ type: mongoose.Schema.ObjectId, ref: 'recerva'}],
    tipoUsuario: {type: String, required: true}
})
usuarioSchema.plugin(mongoosePaginate)
const usuariosModel = mongoose.model(usuarioCollection,usuarioSchema)
export default usuariosModel


