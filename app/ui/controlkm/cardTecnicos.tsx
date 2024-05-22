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
import { useToast } from "@/components/ui/use-toast"
import { getTecnicos } from '@/app/lib/actions';
import { useState, useEffect, useRef } from "react";

  
  

export default function CardTecnicos() {
    const { dataxls, tecnico, setTecnico }:any = useAppContext()
    const [ error, setError ] = useState()
    const [ isLoading, setIsLoading ] = useState(false)
    const [ tecnicos, setTecnicos ] = useState<any[]>([])
    const { toast } = useToast()

    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const fetchTecnicos = async () => {
            setIsLoading(true);

            try {
                const res:any = await getTecnicos()
                setTecnicos(res)
            } catch (e:any) {
                console.log(e)
                setError(e)
            } finally {
                setIsLoading(false)
            }
        }
        fetchTecnicos()
    }, [])

    if (error) {
        return <div>Algo salio mal. Por favor intente nuevamente.</div>;
    }

    if (Array.isArray(tecnicos)) {
        if (tecnicos.length > 0) {
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
                        {isLoading && 
                            <TableRow key='1'>
                                <TableCell><div className="font-medium mt-2 mb-2">Cargando...</div></TableCell>
                            
                            </TableRow>
                        }  
                        
                        {!isLoading && tecnicos?.map((doc) => (
                            <TableRow key={doc.tecnico} onClick={() => { setTecnico(doc.tecnico)}}>
                                <TableCell>
                                    <div className="font-medium mt-2 mb-2">{doc.tecnico}</div>
                                </TableCell>
                            </TableRow>    
                            ))
                        }
                        
                        </TableBody>
                    </Table>
                    </CardContent>
                </Card>
            )
        } 
    }
}
