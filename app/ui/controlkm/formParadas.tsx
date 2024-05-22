import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
    Form,
    FormField,
    FormControl,
    FormLabel,
    FormMessage,
    FormDescription,
    FormItem
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/app/context";
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { DialogBase } from "./dialogBase"
import { GitBranchPlus, LocateFixed } from "lucide-react"
import { getParadas, postParadaPedido } from "@/app/lib/actions"


const FormSchema = z.object({
    parada: z.string({
        required_error: "Por favor seleccione una parada",
      }),
    hora: z.string({
        required_error: "Debe poner un horario",
      })
      .time(),
  })

export default function FormParadas() {
    const { tecnico, fecha, setBase }:any = useAppContext()
    const [paradas, setParadas] = useState<any[]>([])

    const { toast } = useToast()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })


    useEffect(() => {
        const fetchParadas = async () => {
            try {
                let res:any = await getParadas(tecnico)
                setParadas(res)
            } catch (error) {
                console.log(error)
            }
        }
        fetchParadas()
    }, [])

    async function onSubmitParada(data: z.infer<typeof FormSchema>) {
        const pp = await postParadaPedido(tecnico, data.parada, fecha, data.hora)
        if (pp) {
            toast({
                title: "Agreste la siguiente parada:",
                description: data.parada
              })      
        } else {
            toast({
                title: "Error"
            })
        }
    }
        
    return (
        <div>
        <p className="mt-5 text-g"> AGREGAR PARADA </p>
        <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitParada)} className="w-full space-y-2">
                        <FormField
                        control={form.control}
                        name="parada"
                        render={({ field }) => (
                            <FormItem className='mt-5'>
                            <FormLabel >Parada</FormLabel>
                            
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>

                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    
                                        { paradas ? (
                                            <SelectContent>
                                            {paradas.map((item, index) => (
                                                <SelectItem key={item.desc} value={item.desc}>{ item.desc }</SelectItem>
                                            ))}
                                            </SelectContent>
                                        ): <SelectContent />}
                                    
                                </Select> 

                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                                control={form.control}
                                name="hora"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Hora</FormLabel>
                                    <FormControl>
                                        <Input placeholder="08:00:00" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Escribe en formato hh:mm:ss
                                    </FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                        <div className="pt-5 flex flex-row items-stretch gap-2">

                        <Button type="submit">Agregar Parada</Button>
                        <DialogBase />
                        </div>

                    </form>
                </Form>  
                </div>

    )

}