import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const tipoAnimalCollection = "tipoAnimal"
const tipoAnimalSchema = mongoose.Schema({
    tipo: { type: String, required: true, unique: true},
    animales: [{type: mongoose.Schema.ObjectId, ref: 'animal'}]
})

tipoAnimalSchema.plugin(mongoosePaginate)
const tipoAnimalesModel = mongoose.model(tipoAnimalCollection,tipoAnimalSchema)
export default tipoAnimalesModel
