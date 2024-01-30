import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/search/table';
import { Card } from '@/app/ui/search/cards';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { CardsInfoSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
 
export default async function Page({ 
    searchParams 
} : { 
    searchParams?: {
        query?:string
        page?: string
     }
}) {
    const query = searchParams?.query || ''
    const currentPage = Number(searchParams?.page) || 1

    //const totalPages = await fetchInvoicesPages(query)
    
    return (
        <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>ProCash</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Buscar..." />
        </div>
        <div className="mt-4">
            <Suspense 
                    key={query + currentPage} 
                    fallback={<CardsInfoSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            {/* <Card 
                title="2C03" 
                description="Display Code: 2C03 FPGA file didn't load properly" 
                data="FPGA file didn't load properly" 
                votes= "0" 
                category="errores"
                tags=""/> */}
        </div>
{/*         <Suspense 
                key={query + currentPage} 
                fallback={<InvoicesTableSkeleton />}>
            <Table query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
        </div> */}
        </div>
    );
}