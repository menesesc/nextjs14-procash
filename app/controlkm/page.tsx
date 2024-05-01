'use client'
import { useAppContext } from "../context"
import Dashboard from "../ui/controlkm/dashboard"
import InputFile from "../ui/controlkm/inputfile"

export default function ControlKM() { 
  const { dataxls } = useAppContext()
  
  if (dataxls.length ===0) {
    return (
      <InputFile />
    )
  }
  return (
      <Dashboard />
  )
}

