import { NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/mongoose'
import ListadoParte from '@/app/lib/models/ListadoParte'

export async function GET(request, {params}) {
    connectDB()
    const variables = params.str.split(' ')    
    var search = ''
    var linea = ''
    for (var i = 0; i < variables.length; i++) {
        linea = `{ "$or": [{"Parte": { "$regex":"${variables[i]}", "$options": "i"}}, {"Equipo": { "$regex":"${variables[i]}", "$options": "i"}}, {"Descripcion": { "$regex":"${variables[i]}", "$options": "i"}}, {"Modulo": { "$regex":"${variables[i]}", "$options": "i"}}, {"tags": { "$regex":"${variables[i]}", "$options": "i"}}]}`
    
        if (i == 0) {
            search = `[{"$match": {"$and": [` + linea
        } else {
            search = search + `,` + linea
        }
    }
    if (search != '') { search = search + `]}}]` }
    //console.log(search)
    const partes = await ListadoParte.aggregate(JSON.parse(search))
    if (partes.length == 0) return NextResponse.json({message: "Parte no encontrada"}, {status: 404})
    return NextResponse.json(partes)
}