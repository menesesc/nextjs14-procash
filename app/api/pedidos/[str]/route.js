import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/mongoose'
import Pedidos from '@/app/lib/models/Pedido'

export async function POST(request, {params}) {
    try {    
        connectDB()
        const body = JSON.parse(request.nextUrl.body)
        console.log(body)
        let pedidosPost = await Pedidos.insertOne(body)
        console.log(pedidosPost)
        //if (tecnicoRes.length == 0) return NextResponse.json({message: "Nada encontrado"}, {status: 404})
        return NextResponse.json(pedidosPost, {status: 200})
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 })
    }
}