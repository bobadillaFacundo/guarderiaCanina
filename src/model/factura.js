import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const facturaCollection = "factura"
const facturaSchema = mongoose.Schema({
    fecha_facturacion: { type: Date, required: true },
    monto: {type:Float64Array,required:true},
    id_recerva: {type: mongoose.Schema.ObjectId, ref: 'recerva'}
})

facturaSchema.plugin(mongoosePaginate)
const facturasModel = mongoose.model(facturaCollection ,facturaSchema)
export default facturasModel
