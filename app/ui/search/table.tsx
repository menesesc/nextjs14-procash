import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInfo } from '@/app/lib/data';
import { Card } from '@/app/ui/search/cards';

export default async function InfoTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  if (query.length > 2) { 
    const documents = await fetchFilteredInfo(query, currentPage);
    if (Array.isArray(documents)) {
        if (documents.length > 0) {
            return (
                <div className="mt-6 flow-root">
                        {documents?.map((doc) => (
                        <div
                            key={doc._id}
                            className="mb-2 w-full rounded-md bg-white"
                        >
                            <Card 
                            title={doc.title} 
                            description={doc.description}
                            data={doc.data} 
                            votes= {doc.votes} 
                            category={(doc.category==="ERRORES"?"errores":"partes")}
                            tags={String(doc.tags)}/>
                        </div>
                        ))}
                </div>
            )
        } else {
            return (
                <h1>No se encontro nada</h1>
            )
        }
    }}
}
