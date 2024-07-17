'use client'
import { useAppContext } from "../context"
import Dashboard from "../ui/controlkm/dashboard"
import InputFile from "../ui/controlkm/inputfile"

export default function ControlKM() { 
  const { dataxls }:any = useAppContext()
  
  return(<h1>En mantenimiento</h1>)
  // if (dataxls.length === 0) {
  //   return (
  //     <InputFile />
  //   )
  // }
  // return (
  //     <Dashboard />
  // )
}

