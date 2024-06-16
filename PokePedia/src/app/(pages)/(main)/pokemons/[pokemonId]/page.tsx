"use client";
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
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`);
      const data: PokemonData = await response.json();
      setPokemon(data);

      const speciesResponse = await fetch(data.species.url);
      const speciesData = await speciesResponse.json();

      const evolutionChainUrl = speciesData.evolution_chain.url;
      const evolutionId = evolutionChainUrl.split("/").slice(-2, -1)[0];
      setEvolutionChainId(evolutionId);
    }

    getPokemon();
  }, [params.pokemonId]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-zinc-100 min-h-screen flex flex-col items-center my-10 p-5">
      <h1 className="text-center text-4xl font-semibold mb-8 text-gray-600">Pokémon Details</h1>
      <h2 className="text-center text-3xl font-bold mb-6 text-gray-800">{pokemon.name}</h2>
      <div className="flex justify-center mb-8">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="h-48 w-48 mx-4" />
        <img src={pokemon.sprites.back_default} alt={pokemon.name} className="h-48 w-48 mx-4" />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md w-4/5">
        <h3 className="text-2xl font-semibold mb-4">Statistics</h3>
        <p><strong>Height:</strong> {pokemon.height}</p>
        <p><strong>Weight:</strong> {pokemon.weight}</p>
        <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
        <p><strong>Abilities:</strong> {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}</p>
      </div>
      {evolutionChainId && <Evolution pokemonId={evolutionChainId} />}
    </div>
  );
};

export default PokemonDetails;