import { Schema, model, models } from "mongoose"

const listadoparteSchema = new Schema({ 
    Equipo: { type: String, required: true, trim: true},
    Modulo: { type: String, required: true, trim: true},
    Descripcion: { type: String, required: true, trim: true},
    Parte: { type: String, trim: true, unique: true},
    tags: [{ type: String, trim: true}]
})

export default models.ListadoParte || model('ListadoParte', listadoparteSchema, 'listadopartes')
