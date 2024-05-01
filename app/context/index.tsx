'use client';
import { createContext, useState, useContext } from "react";

const AppContext = createContext({
    dataxls: '',
    setDataxls: '',
    tecnico: '',
    setTecnico: '',
    base: '',
    setBase: '',
    datafechas: '',
    setDatafechas: '',
    fecha:'',
    setFecha: '',
    dataPedidos: '',
    setDatapedidos: '',
    distancia: '',
    setDistancia: ''
})

export function AppWrapper({children }: {
    children: React.ReactNode;
  }) {
    let [dataxls, setDataxls] = useState('')
    let [tecnico, setTecnico] = useState('')
    let [base, setBase] = useState('')
    let [datafechas, setDatafechas] = useState('')
    let [fecha, setFecha] = useState('')
    let [dataPedidos, setDatapedidos] = useState('')
    let [distancia, setDistancia] = useState('')


    return (
        <AppContext.Provider value={{
            dataxls, setDataxls, 
            tecnico, setTecnico, 
            base, setBase,
            datafechas, setDatafechas, 
            fecha, setFecha, 
            dataPedidos, setDatapedidos,
            distancia, setDistancia}}>
            {children}
        </AppContext.Provider>
    )
  }

  export function useAppContext() {
    return useContext(AppContext)
  }