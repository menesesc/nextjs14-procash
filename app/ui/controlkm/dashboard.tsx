'use client'
import React from 'react';
import { Separator } from "@/components/ui/separator"
import CardTecnicos from './cardTecnicos';
import CardFechas from './cardFechas';
import { useAppContext } from "@/app/context";
import CardPedidos from './cardPedidos';
import CardMapa from './cardMapa';

export default function Dashboard() {
    const { tecnico, fecha }:any = useAppContext()
    if (tecnico.length === 0) {
        return (
            <div>
                <Separator className="my-4" />
                <div className='flex pl-4'>
                    <div className='w-80'>
                        <CardTecnicos />
                    </div>
                </div>
            </div>
        )
    }
    if (fecha.length === 0) {
        return (
            <div>
                <Separator className="my-4" />
                <div className='flex pl-4'>
                    <div className='w-80'>
                        <CardFechas />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Separator className="my-4" />
            <div className='flex pl-4'>
                <div className='w-80'>
                    <CardPedidos />
                </div>
                <div className='w-full pl-5 pr-5'>
                    <CardMapa />
                </div>
            </div>
        </div>
    )
    
}

