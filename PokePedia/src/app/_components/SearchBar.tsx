import { useState, useEffect, useRef, ChangeEvent } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { searchPokemons } from "@/app/redux/features/pokemonSlice";
import { resetPage } from "../redux/features/pageSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("query") || "";
  const [input, setInput] = useState<string>(currentSearch);
  const pathname = usePathname();
  const router = useRouter();
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInput(currentSearch);
    dispatch(searchPokemons(currentSearch));
    dispatch(resetPage());
  }, [currentSearch, dispatch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const params = new URLSearchParams(searchParams);
      if (input) {
        params.set("query", input);
      } else {
        params.delete("query");
      }
      router.replace(`${pathname}?${params.toString()}`);
      dispatch(searchPokemons(input));
      dispatch(resetPage());
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
      setInput("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchBarRef} className="w-1/2 flex flex-row items-center py-4">
      <div className="w-full max-w-md relative">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 h-5 w-5" />
      </div>
    </div>
  );
};

export default SearchBar;