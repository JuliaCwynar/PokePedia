"use client";
import { useState, ChangeEvent } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchBarProps {
  setResults: (results: any[]) => void;
  data: string;
}

export default function SearchBar({ setResults, data }: SearchBarProps) {
  const [input, setInput] = useState("");

  const fetchData = async (search: string, data: string): Promise<void> => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/${data}?limit=10000`); // Fetch all Pokémon for searching
      if (!response.ok) {
        setResults([]);
        return;
      }
      const json = await response.json();
      const results = json.results.filter((result: any) => result.name.includes(search));
      const detailedResults = await Promise.all(
        results.map(async (result: any) => {
          const detailsResponse = await fetch(result.url);
          const details = await detailsResponse.json();
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.front_default,
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchData(input, data);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center p-4">
    <div className="w-full max-w-md relative">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-100 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 h-5 w-5" />
    </div>
  </div>
);
};