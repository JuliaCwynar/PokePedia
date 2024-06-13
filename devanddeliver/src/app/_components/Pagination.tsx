export default function Pagination({page, setPage} : {page: number, setPage: any}) {

    function changePage(number: number) {
        setPage(page + number)
        window.scrollTo(0, 0)
    }
    return (
        <div className="flex justify-center gap-4">
            <button onClick={() => changePage(-1)} disabled={page === 1} className="bg-blue-500 text-white p-2 rounded">&lt;&lt;</button>
            <span>{page}</span>
            <button onClick={() => changePage(+1)} disabled={page === 20} className="bg-blue-500 text-white p-2 rounded">&gt;&gt;</button>
        </div>
    )
}