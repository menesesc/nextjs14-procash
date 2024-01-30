import { Schema, model, models } from "mongoose"

const errorSchema = new Schema({ 
    Modulo: { type: String, required: true, trim: true},
    CodigoError: { type: String, required: true, trim: true, unique: true},
    Descripcion: { type: String, required: true, trim: true},
    Causa: { type: String, trim: true},
    Reparacion:  { type: String, trim: true},
    Ref:  { type: String, trim: true},
    tags: [{ type: String, trim: true}]
})

export default models.Error || model('Error', errorSchema, 'errores')
