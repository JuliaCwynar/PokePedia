"use client";
import { useState, ChangeEvent } from "react";

interface SearchBarProps {
  setResults: (results: any[]) => void;
  data: string;
}

export default function SearchBar({ setResults, data }: SearchBarProps) {
  const [input, setInput] = useState("");

  const fetchData = async (search: string, data: string): Promise<void> => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/${data}?limit=1000`); // Fetch all Pokémon for searching
      if (!response.ok) {
        setResults([]);
        return;
      }
      const json = await response.json();
      const results = json.results.filter((pokemon: any) => pokemon.name.includes(search));
      const detailedResults = await Promise.all(
        results.map(async (pokemon: any) => {
          const detailsResponse = await fetch(pokemon.url);
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
    <div className="justify-items-center m-auto">
      <label>Search Pokemon</label>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}