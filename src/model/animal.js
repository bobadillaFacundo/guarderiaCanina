import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const animalCollection = "animal"
const animalSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    idUsuario: {type:mongoose.Schema.ObjectId, ref: 'usuario', required:true},
    idTipoAnimal:{type: mongoose.Schema.ObjectId, ref: 'tipoAnimal',required:true},
    adopcion:{type: Boolean,required:true},
    enLaGuarderia:{type: Boolean,required:true}
})

animalSchema.plugin(mongoosePaginate)
const animalesModel = mongoose.model(animalCollection,animalSchema)
export default animalesModel

