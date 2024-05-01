import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/mongoose'
import Tecnico from '@/app/lib/models/Tecnico'

export async function GET(request, {params}) {
    try {    
        connectDB()
        const searchParams = request.nextUrl.searchParams
        var name = searchParams.get('tecnico')
        const tecnicoRes = await Tecnico.find({"tecnico": name})

        if (tecnicoRes.length == 0) return NextResponse.json({message: "Nada encontrado"}, {status: 404})
        return NextResponse.json(tecnicoRes, {status: 200})
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 })
    }
}