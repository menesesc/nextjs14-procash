'use client'
import React from 'react';
import Link from "next/link"
import { useAppContext } from "@/app/context";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/components/ui/use-toast"


export default function CardFechas() {
    const { dataxls, tecnico, setTecnico, setFecha, setBase, setDistancia } = useAppContext()
    const { toast } = useToast()

    const llenarLista = () => {
        var unique = []
        var fechas = []
        var id = 1
        
        for (let i = 0; i < dataxls.length; i++) {
            if (tecnico === dataxls[i].TECNICOASISTIO && !unique[dataxls[i].FECHALLEGADA] && dataxls[i].FECHALLEGADA !== undefined) {
                var newfecha = {"ID": id, "FECHA": dataxls[i].FECHALLEGADA}
                fechas.push(newfecha)
                id = id + 1;
                unique[dataxls[i].FECHALLEGADA] = 1
            }
        }
        
        fechas.sort((a, b) => {
            let x = a.FECHA.toUpperCase()
            let y = b.FECHA.toUpperCase()
            if (x < y) { return -1}
            if (x > y) { return 1 }
            return 0
        } )
        
        return fechas.map((item, index) => (
            <TableRow key={item.ID} onClick={() => { setFecha(item.FECHA)}}>
                <TableCell>
                    <div className="font-medium">{item.FECHA}</div>
                </TableCell>
            </TableRow>
        ));
    }
    
    return (
        <Card>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>
                        <div className='flex'>
                            <div className='pt-2 flex-auto w-60'>
                                Fechas
                            </div>
                            <div className='flex-1'>
                                <Button size="sm" className="gap-1" onClick={() => { setTecnico(''), setBase(''), setDistancia('')}}>                    
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardTitle>
                    <CardDescription>
                        {tecnico}
                    </CardDescription>
                </div>
            </CardHeader>
            
            <CardContent>
            <Table>
                <TableBody>
                    {llenarLista()}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
    )
}

