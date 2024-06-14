import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function Pagination({page, setPage} : {page: number, setPage: any}) {

    const pathname = usePathname();
    const {replace} = useRouter();
    const searchParams = useSearchParams();

    function changePage(number: number) {
        const params = new URLSearchParams(searchParams);
        setPage(page + number)
        if(page) {
            params.set('page', String(page + number));
            window.scrollTo(0, 0)
        }
        else {
            params.delete('page');
        }
        replace(`${pathname}?${params.toString()}`);
        
    }
    return (
        <div className="flex justify-center gap-4 ">
            <button onClick={() => changePage(-1)} disabled={page === 1} className="bg-blue-500 text-white p-2 rounded">
                <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <p className="bg-white rounded py-2 px-4 text-bold">
                {page}
            </p>
            <button onClick={() => changePage(+1)} disabled={page === 20} className="bg-blue-500 text-white p-2 rounded">
                <ChevronRightIcon className="h-6 w-6" />
            </button>
        </div>
    )
}