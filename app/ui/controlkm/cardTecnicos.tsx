'use client'
import React from 'react';
import Link from "next/link"
import { useAppContext } from "@/app/context";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
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

  
  

export default function CardTecnicos() {
    const { dataxls, setTecnico } = useAppContext()
    const { toast } = useToast()

    const llenarLista = () => {
        var unique = []
        var tecnicos = []
        var id = 1
        for (let i = 0; i < dataxls.length; i++) {
            if (!unique[dataxls[i].TECNICOASISTIO] && dataxls[i].TECNICOASISTIO !== undefined) {
                var newtecnico = {"ID": id, "TECNICO": dataxls[i].TECNICOASISTIO, "ZONA": dataxls[i].ZONA}
                tecnicos.push(newtecnico)
                id = id + 1;
                unique[dataxls[i].TECNICOASISTIO] = 1
            }
        }        
        tecnicos.sort((a, b) => {
            let x = a.TECNICO.toUpperCase()
            let y = b.TECNICO.toUpperCase()
            if (x < y) { return -1}
            if (x > y) { return 1 }
            return 0
        } )
        
        return tecnicos.map((item, index) => (
            <TableRow key={item.ID} onClick={() => { setTecnico(item.TECNICO)}}>
                <TableCell>
                    <div className="font-medium">{item.TECNICO}</div>
                    <div>
                    <Badge variant="secondary" className="text-xs">
                        {item.ZONA}
                    </Badge>
                    </div>
                </TableCell>
            </TableRow>
        ));
    }
    
    return (
        <Card>
            <CardHeader className="pb-3">
            <CardTitle>
                <div className='flex'>
                    <div className='pt-2 flex-auto w-64'>
                        Tecnicos
                    </div>

                </div>
            </CardTitle>
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

