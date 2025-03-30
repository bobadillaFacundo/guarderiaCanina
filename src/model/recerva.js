import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const recervaCollection = "recervas"
const recervaSchema = mongoose.Schema({
    fecha_desde:{type: Date, required: true},
    fecha_hasta:{type: Date, required: true},
    montoTotal:{type: Float64Array, required:true},
    id_usuario: {type:mongoose.Schema.Types.ObjectId, ref: 'usuario'},
    id_animal: {type:mongoose.Schema.Types.ObjectId, ref: 'animal'},
    medicamento:{type:String},
    alimento:{type:String},
    extras:{type:String},
    id_puntuacionUsuario: {type:mongoose.Schema.Types.ObjectId, ref: 'puntuacionsUsuario'}
})

recervaSchema.plugin(mongoosePaginate)
const recervasModel = mongoose.model(recervaCollection,recervaSchema)
export default recervasModel


