'use client'
import React from 'react';
import Link from "next/link"
import { useAppContext } from "@/app/context";
import { Button } from "@/components/ui/button"
import { ArrowLeft, GitBranchPlus, LocateFixed } from "lucide-react"

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

import { Separator } from "@/components/ui/separator"
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/components/ui/use-toast"
import { DialogBase } from './dialogBase';
import FormParadas from './formParadas';
  
  




export default function CardPedidos() {
    const { dataxls, tecnico, fecha, setFecha, base, setDatapedidos, distancia } = useAppContext()
    const { toast } = useToast()


    const llenarLista = () => {
        var pedidos = []
        var id = 1
        for (let i = 0; i < dataxls.length; i++) {

            if (base !== '' && id===1 ) {
                var newpedido = {"ID": id, "ESBASE": true, "PEDIDO": '-', "CLIENTE": "### BASE ###", "ATM": "-", "DIRECCION": base, "LOCALIDAD": "-", "HORALLEGADA": "00:01", "HORAFIN": "00:01"}
                pedidos.push(newpedido)
                id = id + 1
            }
            if (tecnico === dataxls[i].TECNICOASISTIO && fecha === dataxls[i].FECHALLEGADA) {
                var newpedido = {"ID": id, "ESBASE": false, "PEDIDO": dataxls[i].PEDIDO, "CLIENTE": dataxls[i].CLIENTE, "ATM": dataxls[i].ATM, "DIRECCION": dataxls[i].DIRECCION, "LOCALIDAD": dataxls[i].LOCALIDAD, "HORALLEGADA": dataxls[i].HORALLEGADA, "HORAFIN": dataxls[i].HORAFIN}
                pedidos.push(newpedido)
                id = id + 1
            }
        }
        if (base !== '') {
            var newpedido = {"ID": id, "ESBASE": true, "PEDIDO": '-', "CLIENTE": "### BASE ###", "ATM": "-", "DIRECCION": base, "LOCALIDAD": "-", "HORALLEGADA": "23:59", "HORAFIN": "23:59"}
            pedidos.push(newpedido)
            id = id + 1
        }
    
        pedidos.sort((a, b) => {
            let x = a.HORALLEGADA
            let y = b.HORALLEGADA
            if (x < y) { return -1}
            if (x > y) { return 1 }
            return 0
        } )

        

        return pedidos.map((item, index) => (
            
            <TableRow key={item.ID}>
                <TableCell>
                    <div className="text-base">{item.CLIENTE}</div>
                    <div className="text-sm">{item.HORALLEGADA} - {item.HORAFIN}</div>
                    <div className="text-xs">{item.DIRECCION}</div>
                    <div className="text-xs">{item.LOCALIDAD}</div>
                    <Badge variant="secondary" className="text-xs">
                        ATM {item.ATM} - PED {item.PEDIDO}
                    </Badge>
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
                                Pedidos
                            </div>
                            <div className='flex-1'>
                                <Button size="sm" className="gap-1" onClick={() => { setFecha('')}}>                    
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardTitle>
                    <CardDescription>
                        {tecnico}
                    </CardDescription>
                    <CardDescription>
                        {fecha}
                    </CardDescription>
                    <CardDescription>
                    <CardDescription>
                    <Badge variant="destructive" className="text-xs">
                        {base}
                    </Badge>
                    </CardDescription>
                    <Badge variant="outline" className="text-lg">
                        {distancia} kms
                    </Badge>
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
            <CardFooter className="flex pt-2">
                <div>
                <Separator />
                <FormParadas />
                </div>
            </CardFooter>
        </Card>
            
    )
}

