import { Schema, model, models } from "mongoose"

const pedidoSchema = new Schema({ 
    pedido: { type: String, required: true, trim: true},
    cliente: { type: String, trim: true},
    atm: { type: String, trim: true},
    direccion: { type: String, required: true, trim: true},
    localidad: { type: String, required: true, trim: true},
    provincia: { type: String, required: true, trim: true},
    tecnicoasistio: { type: String,  trim: true},
    fechaalta: { type: String,  trim: true},
    horaalta: { type: String,  trim: true},
    fechallegada: { type: String,  trim: true},
    horallegada: { type: String,  trim: true},
    fechafin: { type: String,  trim: true},
    horafin: { type: String,  trim: true},
}, {timestamps: true})

export default models.Pedido || model('Pedido', pedidoSchema, 'pedidos')
