import { Schema, model, models } from "mongoose"

const tecnicoSchema = new Schema({ 
    tecnico: { type: String, required: true, trim: true},
    desc: { type: String, trim: true},
    esbase: { type: Boolean, required: false, default: false}
}, {timestamps: false})

export default models.Tecnico || model('Tecnico', tecnicoSchema, 'tecnicos')
