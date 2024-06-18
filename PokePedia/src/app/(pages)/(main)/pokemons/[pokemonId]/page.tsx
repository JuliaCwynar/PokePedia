"use client"
import React, { useEffect, useState } from "react";
import Evolution from "./_components/Evolution";

interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
  };
  height: number;
  weight: number;
  base_experience: number;
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  species: { url: string };
}

interface PokemonDetailsProps {
  params: { pokemonId: string };
}

const PokemonDetails = ({ params }: PokemonDetailsProps) => {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [evolutionChainId, setEvolutionChainId] = useState<string | null>(null);

  useEffect(() => {
    async function getPokemon() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`);
        if (!response.ok) {
          throw new Error("Pokemon not found");
        }
        const data: PokemonData = await response.json();
        setPokemon(data);

        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();

        const evolutionChainUrl = speciesData.evolution_chain.url;
        const evolutionId = evolutionChainUrl.split("/").slice(-2, -1)[0];
        setEvolutionChainId(evolutionId);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    }

    getPokemon();
  }, [params.pokemonId]);

  if (!pokemon) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  return (
    <div className="bg-zinc-100 flex flex-col items-center my-10 rounded-lg min-w-[800px] py-10">
      <h1 className="text-2xl font-semibold mb-8 text-gray-800">Pokémon Details</h1>
      <h2 className="text-5xl font-bold mb-6 text-gray-800">{capitalizeFirstLetter(pokemon.name)}</h2>
      <div className="flex justify-center">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="h-60 w-60 mx-4 rounded-lg" />
        {pokemon.sprites.back_default && <img src={pokemon.sprites.back_default} alt={pokemon.name} className="h-60 w-60 mx-4 rounded-lg" />}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-4/5">
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="text-3xl font-semibold mb-2">Statistics</h3>
            <p><strong>Height:</strong> {pokemon.height} dm</p>
            <p><strong>Weight:</strong> {pokemon.weight} hg</p>
            <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
          </div>
          <div>
            <h3 className="text-3xl font-semibold mb-2">Abilities</h3>
            {pokemon.abilities.map((ability, index) => (
              <p key={index}>{capitalizeFirstLetter(ability.ability.name)}</p>
            ))}
          </div>
          <div>
          <h3 className="text-3xl font-semibold mb-2">Types</h3>
          <div className="flex space-x-2">
            {pokemon.types.map((type, index) => (
              <span key={index} className="px-2 py-1 bg-gray-200 rounded-md text-gray-800">{capitalizeFirstLetter(type.type.name)}</span>
            ))}
          </div>
        </div>
    
        </div>
        <div className="mt-10">
          <h3 className="text-3xl font-semibold mb-2">Stats</h3>
          {pokemon.stats.map((stat, index) => (
            <div key={index} className="flex justify-between">
              <p>{capitalizeFirstLetter(stat.stat.name)}</p>
              <p>{stat.base_stat}</p>
            </div>
          ))}
        </div>
      </div>
      {evolutionChainId && <Evolution pokemonId={evolutionChainId} />}
    </div>
  );
};

export default PokemonDetails;