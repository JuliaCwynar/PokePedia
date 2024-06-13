"use client";
import { useEffect, useState } from "react";
import PokemonTile from "./_components/PokemonTile";
import SearchBar from "../../_components/SearchBar";
import Pagination from "../../_components/Pagination";

export default function Pokemons() {
  interface PokemonData {
    id: number;
    name: string;
    image: string;
  }

  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function getPokemons() {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`);
      let data = await response.json();

      const pokemonInfo = await Promise.all(
        data.results.map(async (pokemon: any) => {
          let response = await fetch(pokemon.url);
          const details = await response.json();
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.front_default,
          };
        })
      );
      setPokemons(pokemonInfo);
    }
    getPokemons();
  }, [page]);

  return (
    <div>
      <h1 className="text-center">Pokémons</h1>
      <SearchBar setResults={setPokemons} data="pokemon" />
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {pokemons.map((pokemonData, index) => (
          <PokemonTile key={index} pokemon={pokemonData} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}