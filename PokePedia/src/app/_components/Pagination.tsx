import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPokemons,
  setFilteredPokemonsByPage,
} from "@/app/redux/features/pokemonSlice";

export default function Pagination() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1); 

  const pageSize = 21; 

  const allPokemons = useSelector((state: any) => state.pokemons.allPokemons);
  const filteredPokemons = useSelector(
    (state: any) => state.pokemons.filteredPokemons
  );

  const maxPage = Math.ceil(filteredPokemons.length / pageSize);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  useEffect(() => {
    const parsedPage = parseInt(searchParams.get("page") || "1", 10);
    dispatch(setFilteredPokemonsByPage({ page: parsedPage, limit: pageSize }));
    setPage(parsedPage);
  }, [searchParams]);

  const changePage = (number: number) => {
    const params = new URLSearchParams(searchParams);
    const newPage = page + number;
    setPage(newPage);
    if (newPage > 1) {
      params.set("page", String(newPage));
    } else {
      params.delete("page");
    }

    replace(`${pathname}?${params.toString()}`);
    window.scrollTo(0, 0);

  };

  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        onClick={() => changePage(-1)}
        disabled={page === 1}
        className={`bg-blue-500 text-white p-2 rounded ${
          page === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-600 transition duration-300 ease-in-out"
        }`}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <p className="bg-white rounded py-2 px-4 font-semibold">{page}</p>
      <button
        onClick={() => changePage(+1)}
        disabled={page === maxPage}
        className={`bg-blue-500 text-white p-2 rounded ${
          page === maxPage
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-600 transition duration-300 ease-in-out"
        }`}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
}