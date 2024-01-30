import { NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/mongoose'
import Error from '@/app/lib/models/Error'
import ListadoParte from '@/app/lib/models/ListadoParte'
import Document from '@/app/lib/models/Document'

export async function GET() {
/*     connectDB()
    ListadoParte.find().then(docs => {
        const allNewDocs = []
        docs.forEach(doc => {
            const newDoc = {
                category: 'PARTES',
                title: doc.Parte,
                description: doc.Descripcion,
                data: doc.Equipo,
                links: [],
                images: [],
                votes: 0,
                tags: [doc.Modulo]
            }
            allNewDocs.push(newDoc)
        })
        console.log(allNewDocs)
        Document.insertMany(allNewDocs)

    });
    return NextResponse.json({
        message: "Hello world"
    }) */
}

export function POST() {
    connectDB()
    return NextResponse.json({
        message: "Crear ..."
    })
}