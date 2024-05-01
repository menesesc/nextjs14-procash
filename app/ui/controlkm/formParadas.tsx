"use client"
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
    const { tecnico, setBase } = useAppContext()
    const [data, setData] = useState<any[]>([])

    const { toast } = useToast()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const getParadas = async () => {
        try {
            const response = await fetch('/api/tecnicos/t?tecnico='+tecnico, {
                headers: {
                    Accept: "application/json",
                    method: "GET"
                }})
            
            const jsonData = await response.json()
            setData(jsonData)

            for (let i = 0; i < jsonData.length; i++) {
                if (jsonData[i].esbase) {
                    setBase(jsonData[i].desc)
                }
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        getParadas()
    })

    function onSubmitParada(data: z.infer<typeof FormSchema>) {
        toast({
          title: "Agreste la siguiente parada:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        })
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
                                    
                                        { data ? (
                                            <SelectContent>
                                            {data.map((item, index) => (
                                                <SelectItem key={item.id} value={item.desc}>{ item.desc }</SelectItem>
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
                                        <Input placeholder="08:00" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Escribe en formato hh:mm
                                    </FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                        <div className="pt-5 flex flex-row items-stretch gap-2">

                        <Button type="submit">Agregar Parada</Button>
                        <DialogBase />
                        <Button variant="outline" size="icon"><GitBranchPlus className="h-4 w-4" /></Button>
                        </div>

                    </form>
                </Form>  
                </div>

    )

}