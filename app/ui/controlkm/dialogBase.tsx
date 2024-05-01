import React, {  useState } from 'react'
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/app/context";
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LocateFixed } from "lucide-react"
import { Form } from '@/components/ui/form';
import { useDebouncedCallback } from 'use-debounce';

export function DialogBase() {
    const WAIT_BETWEEN_CHANGE = 300
    const { tecnico, base, setBase } = useAppContext()
    const [open, setOpen] = React.useState(false)
    let x = ''
    
    async function onSubmit() {
        try {
          setBase(x)
          setOpen(false);
        } catch (error) {
          console.error(error)
        }
    }

    const handleChange = useDebouncedCallback((term: string) => {
        if (term) {
            x = term
        }
      }, WAIT_BETWEEN_CHANGE)
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon"><LocateFixed className="h-4 w-4" /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Base {tecnico}</DialogTitle>
          <DialogDescription>
            Domicilio base del tecnico seleccionado
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="base" className="text-right">
              Domicilio
            </Label>
            <Input id="base" defaultValue={base} className="col-span-3" onChange={(event) => handleChange(event.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSubmit}>Grabar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
