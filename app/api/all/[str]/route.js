import { NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/mongoose'
import Document from '@/app/lib/models/Document'

export async function GET(request, {params}) {
    connectDB()
    const variables = params.str.split(' ')    
    var search = ''
    var linea = ''
    for (var i = 0; i < variables.length; i++) {
        linea = `{ "$or": [
            {"category": { "$regex":"${variables[i]}", "$options": "i"}}, 
            {"title": { "$regex":"${variables[i]}", "$options": "i"}}, 
            {"description": { "$regex":"${variables[i]}", "$options": "i"}}, 
            {"data": { "$regex":"${variables[i]}", "$options": "i"}}, 
            {"tags": { "$regex":"${variables[i]}", "$options": "i"}}
        ]}`
    
        if (i == 0) {
            search = `[{"$match": {"$and": [` + linea
        } else {
            search = search + `,` + linea
        }
    }
    if (search != '') { search = search + `]}}]` }
    //console.log(search)
    const documents = await Document.aggregate(JSON.parse(search))

    if (documents.length == 0) return NextResponse.json({message: "Nada encontrado"}, {status: 404})
    return NextResponse.json(documents)
}