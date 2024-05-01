'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Search, Route } from "lucide-react"
export default function TopNav() {
    const [header, setHeader] = useState(false)
    const scrollHeader = () => {
        if (window.scrollY >= 20) {
            setHeader(true)
        } else {
            setHeader(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollHeader)
        return ()=>{
            window.addEventListener('scroll', scrollHeader)
        }
    },[])

    return (
        <div className={header ? "fixed w-full top-0 text-[white] bg-[#000000]" : "bg-[transparent]"}>
            <div className='header flex justify-between m-auto-y-[15px] mt-5 mb-5'>
                <div className='logo ml-5'>
                    <Link href='/'>
                        <Image 
                            src={header ? '/logo-fondo-negro.png' : '/logo-fondo-blanco.png'}
                            alt="Logo Prosegur"
                            width={165}
                            height={30} />                        
                    </Link>
                </div>
                <div className='menu mr-5'>
                    <nav>
                        <ul className='flex gap-[20px]'>
                            <li className='py-2'>                                
                                <Link href='/search'><Search className="w-5 md:w-6" /></Link>
                            </li>
                            <li className='py-2'>
                                <Link href='/controlkm'><Route className="w-5 md:w-6" /></Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}