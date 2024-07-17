import { useAppContext } from "@/app/context";
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
import { Button } from "@/components/ui/button"
import { ArrowLeft, GitBranchPlus, LocateFixed } from "lucide-react"
import { getFechasPedidos, getParadas, getTotalKmsFecha } from '@/app/lib/actions';
import { useState, useEffect } from "react";

  
  

export default function CardFechas() {
    const { dataxls, tecnico, setFecha, setTecnico, base, setBase }:any = useAppContext()
    const [ isLoading, setIsLoading ] = useState(false)
    const [ fechas, setFechas ] = useState<any[]>([])
    const [ kms, setKms ] = useState<any[]>([])
    const [ totalKms, setTotalKms ] = useState(0)
    const { toast } = useToast()


    useEffect(() => {
        const fetchFechas = async () => {
            try {
                setIsLoading(true)
                const res:any = await getFechasPedidos(tecnico)
                setFechas(res)
            } catch (error) {
                console.log(error)
            }
        }
        fetchFechas()


        

        const fetchParadas = async () => {
            try {
                const res:any = await getParadas(tecnico)
                for (let i = 0; i < res.length; i++) {
                    if (res[i].esbase) {
                        setBase(res[i].desc)
                    }
                }                

            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchParadas()
    }, [])

    if (Array.isArray(fechas)) {
        if (fechas.length > 0) {
            return (
                <Card>
                    <CardHeader className="pb-3">
                    <CardTitle>
                        <div className='flex'>
                            <div className='pt-2 flex-auto w-64'>
                                Fechas
                            </div>
                            <div className='flex-1'>
                                <Button size="sm" className="gap-1" onClick={() => { setTecnico(''), setBase('')}}>                    
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardTitle>
                    <CardDescription>
                        {tecnico}
                    </CardDescription>
                    <CardDescription>
                        <Badge variant="destructive" className="text-xs">
                            {base}
                        </Badge>
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Table>
                        <TableBody>
                        {isLoading && 
                            <TableRow key='1'>
                                <TableCell><div className="font-medium mt-2 mb-2">Cargando...</div></TableCell>
                            
                            </TableRow>
                        }  
                        {fechas?.map((doc) => (
                            <TableRow key={doc.fechallegada} onClick={() => { setFecha(doc.fechallegada)}}>
                                <TableCell>
                                    <div className="font-medium mt-2 mb-2">{doc.fechallegada}</div>
                                </TableCell>
                            </TableRow>    
                            ))}
                        </TableBody>
                    </Table>
                    </CardContent>
                </Card>
            )
        } 
    }
}
