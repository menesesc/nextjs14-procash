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
        <div className="w-[95%] mx-auto">     
            <div className="mt-4 flex items-center justify-between gap-2">
                <Search placeholder="Buscar..." />
            </div>
            <div className="mt-4">
                <Suspense 
                        key={query + currentPage} 
                        fallback={<CardsInfoSkeleton />}>
                    <Table query={query} currentPage={currentPage} />
                </Suspense>
            </div>
        </div>
    );
}