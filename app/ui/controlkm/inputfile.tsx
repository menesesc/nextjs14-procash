'use client'
import { useAppContext } from "@/app/context";
import * as XLSX from "xlsx"
import React, { useState } from 'react';
import { agregarBases, createBulkUPedidos } from "@/app/lib/actions";

export default function InputFile (data: any, setdata: any) {
    const { dataxls, setDataxls }:any = useAppContext()
    const [isLoading, setIsLoading] = useState(false);
    const [textLoading, setTextLoading] = useState('')

    const handleFileUpload = (e: any ) => {
        if (!e.target.files || e.target.files.length === 0) {
          // you can display the error to the user
          console.error("Select a file");
          return;
        }
        
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0])
        reader.onload = (e) => {
          const data = e.target!.result
          const workbook = XLSX.read(data, { type: "binary" })
          const sheetName = workbook.SheetNames[0]
          const sheet = workbook.Sheets[sheetName]
          const parsedData:any = XLSX.utils.sheet_to_json(sheet)

          
          var pedidos = []        
          for (let i = 0; i < parsedData.length; i++) {
            var newpedido = {
                "pedido": parsedData[i].PEDIDO,
                "cliente": parsedData[i].CLIENTE,
                "atm": parsedData[i].ATM,
                "direccion": parsedData[i].DIRECCION, 
                "localidad": parsedData[i].LOCALIDAD,
                "provincia": parsedData[i].PROVINCIA,
                "tecnicoasistio": parsedData[i].TECNICOASISTIO,
                "zona": parsedData[i].ZONA,
                "fechaalta": parsedData[i].FECHAALTA,
                "horaalta": parsedData[i].HORAALTA,
                "fechallegada": parsedData[i].FECHALLEGADA,
                "horallegada": parsedData[i].HORALLEGADA,
                "fechafin": parsedData[i].FECHAFIN,
                "horafin": parsedData[i].HORAFIN
            }
            pedidos.push(newpedido)
          }
          
          const parsedPedidos = pedidos
          saveData(parsedPedidos)
        }
      }

    async function saveData(data: any) {
        try {
            setIsLoading(true)
            setTextLoading('Cargando informacion del archivo...')
            await createBulkUPedidos(data)
            setTextLoading('Ingresando Bases configuradas...')
            await agregarBases()
            setDataxls('1')
          } catch (error) {
            setDataxls('')
            console.log(error)
          } finally {
            setIsLoading(false)
          }
    }
    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center w-full">
              {isLoading && <div>{textLoading}</div>}
              {!isLoading && (
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Haga click para subir un archivo</span> o arrastre y suelte aqui</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Archivo de Excel (.xlsx, .xls)</p>
                    </div>
                    <input id="dropzone-file" type="file" accept=".xlsx, .xls" className="hidden" onChange={handleFileUpload} />
                </label>
              )}
            </div> 
        </div>

    )
}

