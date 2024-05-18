'use client'
import { useAppContext } from "@/app/context";
import * as XLSX from "xlsx"
import React from 'react';
import { createBulkUPedidos } from "@/app/lib/actions";

export default function InputFile (data: any, setdata: any) {
    const { dataxls, setDataxls } = useAppContext()
    const handleFileUpload = (e: { target: { files: Blob[] } }) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0])
        reader.onload = (e) => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: "binary" })
          const sheetName = workbook.SheetNames[0]
          const sheet = workbook.Sheets[sheetName]
          const parsedData = XLSX.utils.sheet_to_json(sheet)

          
          //console.log(parsedData)

          var pedidos = []        
          for (let i = 0; i < parsedData.length; i++) {
            var newpedido = {
                "pedido": parsedData[i].pedido,
                "cliente": parsedData[i].cliente,
                "atm": parsedData[i].atm,
                "direccion": parsedData[i].direccion, 
                "localidad": parsedData[i].localidad,
                "provincia": parsedData[i].provincia,
                "tecnicoasistio": parsedData[i].tecnicoasistio,
                "fechaalta": parsedData[i].fechaalta,
                "horaalta": parsedData[i].horaalta,
                "fechallegada": parsedData[i].fechallegada,
                "horallegada": parsedData[i].horallegada,
                "fechafin": parsedData[i].fechafin,
                "horafin": parsedData[i].horafin
            }
            pedidos.push(newpedido)
          }
          
          const parsedPedidos = pedidos
          console.log(parsedPedidos)
          saveData(parsedPedidos)
          
          // console.log(parsedData.filter(row => row.TECNICOASISTIO==="Meneses, Cristian"))
          //setDataxls(parsedData)
        }
      }

    async function saveData(data: any) {
        try {
            await createBulkUPedidos(data)
          } catch (error) {
            console.log(error)
          }
    }
    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Haga click para subir un archivo</span> o arrastre y suelte aqui</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Archivo de Excel (.xlsx, .xls)</p>
                    </div>
                    <input id="dropzone-file" type="file" accept=".xlsx, .xls" className="hidden" onChange={handleFileUpload} />
                </label>
            </div> 
        </div>

    )
}

