import { NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/mongoose'
import Error from '@/app/lib/models/Error'

export async function GET(request, {params}) {
    connectDB()
    const variables = params.str.split(' ')    
    var search = ''
    var linea = ''
    for (var i = 0; i < variables.length; i++) {
        linea = `{ "$or": [{"CodigoError": { "$regex":"${variables[i]}", "$options": "i"}}, {"Descripcion": { "$regex":"${variables[i]}", "$options": "i"}}, {"Modulo": { "$regex":"${variables[i]}", "$options": "i"}}, {"tags": { "$regex":"${variables[i]}", "$options": "i"}}]}`
    
        if (i == 0) {
            search = `[{"$match": {"$and": [` + linea
        } else {
            search = search + `,` + linea
        }
    }
    if (search != '') { search = search + `]}}]` }
    //console.log(search)
    const errores = await Error.aggregate(JSON.parse(search))
    if (errores.length == 0) return NextResponse.json({message: "Error no encontrado"}, {status: 404})
    return NextResponse.json(errores)
}