"use client";
import { useState, ChangeEvent } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface SearchBarProps {
  setResults: (results: any[]) => void;
  data: string;
}

export default function SearchBar({ setResults, data }: SearchBarProps) {
  
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("query") || "";
  const [input, setInput] = useState(currentSearch);
  const pathname = usePathname();
  const {replace} = useRouter();

  const fetchData = async (search: string, data: string): Promise<void> => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/${data}?limit=10000`); 
      if (!response.ok) {
        setResults([]);
        return;
      }
      const json = await response.json();
      const results = json.results.filter((result: any) => result.name.startsWith(search));
      const detailedResults = await Promise.all(
        results.map(async (result: any) => {
          const detailsResponse = await fetch(result.url);
          const details = await detailsResponse.json();
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.front_default,
            type: details.types[0].type.name,
          };
        })
      );
      setResults(detailedResults);
    } catch (error) {
      setResults([]);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);
  };

  console.log(currentSearch)
  console.log(input)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const params = new URLSearchParams(searchParams);
    if (input) {
      params.set('query', input);
    }
    else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
      fetchData(input, data);
    }
  };

  console.log(input)

  return (
    <div className="w-1/2 flex flex-row  items-center py-4">
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