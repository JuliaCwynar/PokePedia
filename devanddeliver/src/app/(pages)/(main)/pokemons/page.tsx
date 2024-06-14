"use client";
import { useEffect, useState } from "react";
import PokemonTile from "./_components/PokemonTile";
import SearchBar from "../../../_components/SearchBar";
import Pagination from "../../../_components/Pagination";
import Filter from "@/app/_components/Filter";

export default function Pokemons() {
  interface PokemonData {
    id: number;
    name: string;
    image: string;
    type: string;
  }

  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function getPokemons() {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=21&offset=${(page - 1) * 21}`);
      let data = await response.json();

      const pokemonInfo = await Promise.all(
        data.results.map(async (pokemon: any) => {
          let response = await fetch(pokemon.url);
          const details = await response.json();
          // console.log(details)
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.front_default,
            type: details.types[0].type.name,
          };
        })
      );
      setPokemons(pokemonInfo);
    }
    getPokemons();
  }, [page]);

  return (
      <div className="min-h-screen">
        <div className="container mx-auto">
          {/* <h1 className="text-center text-4xl font-bold mb-8 text-gray-800">Pokémons</h1> */}
          <div className="my-5 rounded-lg px-5 bg-white m-auto flex flex-row justify-between items-center max-w-screen-lg">
            <SearchBar setResults={setPokemons} data="pokemon" />
            <Filter />
          </div>
          <div className="p-10 flex flex-wrap justify-between bg-white shadow-md rounded-lg max-w-screen-lg">
            {pokemons.map((pokemonData, index) => (
              <PokemonTile key={index} pokemon={pokemonData} />
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Pagination page={page} setPage={setPage} />
          </div>
        </div>
      </div>
    );
  }