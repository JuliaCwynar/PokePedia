import { useState, useEffect, ChangeEvent } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { searchPokemons } from "@/app/redux/features/pokemonSlice";


const SearchBar = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("query") || "";
  const [input, setInput] = useState<string>(currentSearch);
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    setInput(currentSearch);
  }, [currentSearch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);
    //console.log(input)
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const params = new URLSearchParams(searchParams);
      if (input) {
        params.set("query", input);
      } else {
        params.delete("query");
      }
      replace(`${pathname}?${params.toString()}`);
      console.log(input)
      dispatch(searchPokemons(input));
    }
  };

  return (
    <div className="w-1/2 flex flex-row items-center py-4">
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