import Search from '@/app/ui/search';
import Table from '@/app/ui/search/table';
import { CardsInfoSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
 
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