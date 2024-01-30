import * as React from "react";
import Image from 'next/image';

export default function Page() {
  return (
      <main className="flex min-h-screen flex-col p-6">
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:px-40">
            
            <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
              <strong>Bienvenido a ProCash</strong> 
            </p>
            <div className='gap-3 md:text-xl md:leading-normal'>
              <p>Herramientas de uso diario</p>
              <p>para tecnicos de Prosegur Cash</p>
            </div>
          </div>
          <div className="flex items-center justify-center p-6 md:px-6 md:py-6">
          <Image 
            src='/tecnico.jpg'
            alt="Screenshots of the dashboard"
            width={1000}
            height={760}
            className='hidden md:block' />
          <Image 
            src='/tecnico.jpg'
            alt="Screenshots of the dashboard"
            width={560}
            height={620}
            className='block md:hidden' />
        </div>

        </div>
      </main>
  );
}
