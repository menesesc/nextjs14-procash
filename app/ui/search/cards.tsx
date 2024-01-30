import {
    ExclamationTriangleIcon,
    ArchiveBoxIcon,
    BugAntIcon,
    ShareIcon
  } from '@heroicons/react/24/outline';
import { roboto } from '@/app/ui/fonts';
import { ShareCard } from './buttons';
const iconMap = {
  errores: BugAntIcon,
  partes: ArchiveBoxIcon,
};
  
   export function Card({
    category,
    title,
    description,
    data,
    votes,
    tags,
  }: {
    title: string;
    description: string;
    data: string;
    votes: string;
    category: 'errores' | 'partes';
    tags:string;
  }) {
    const Icon = iconMap[category];
  
    return (
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="mr-1 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div className={`${roboto.className} p-6`}>
                <div className='flex'>
                    {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null} 
                    <h3 className="ml-2 mb-2 text-l font-medium leading-tight text-neutral-800 dark:text-neutral-50">    
                        {title}
                    </h3>
                </div>
                <p className="mb-2 text-xs text-neutral-400 dark:text-neutral-200"> #{tags}  </p>
                <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-200">
                    {description}
                </p>
                <p className="mb-4 text-xs text-neutral-600 dark:text-neutral-200 whitespace-break-spaces">
                    {data}
                </p>
                <div className="grid justify-items-end ...">
                  <div className="flex flex-row gap-4">
                    {/* <ShareCard title={title} /> */}
                  </div>
                </div>
                

            </div>
        </div>
      </div>
    );
  }
  