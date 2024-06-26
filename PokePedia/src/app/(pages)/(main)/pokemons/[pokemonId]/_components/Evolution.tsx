"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface PokemonSpecies {
  name: string;
  url: string;
}

interface EvolutionDetail {
  evolves_to: EvolutionDetail[];
  species: PokemonSpecies;
}

interface EvolutionChain {
  chain: EvolutionDetail;
}

interface EvolutionProps {
  pokemonId: string;
}

const Evolution = ({ pokemonId }: EvolutionProps) => {
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);

  useEffect(() => {
    async function getEvolution() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch evolution chain');
        }
        const data: EvolutionChain = await response.json();
        setEvolutionChain(data);
      } catch (error) {
        throw new Error('Failed to fetch evolution chain');
      }
    }

    getEvolution();
  }, [pokemonId]);

  const renderEvolutionChain = (chain: EvolutionDetail) => {
    const evolutions: PokemonSpecies[] = [];

    const traverseChain = (node: EvolutionDetail) => {
      evolutions.push(node.species);
      if (node.evolves_to.length > 0) {
        node.evolves_to.forEach((evolution) => traverseChain(evolution));
      }
    };

    traverseChain(chain);

    const getPokemonId = (url: string) => {
      const parts = url.split('/');
      return parts[parts.length - 2];
    };

    return evolutions.map((species) => (
      <Link href={`/pokemons/${getPokemonId(species.url)}`} className="flex flex-col items-center text-center hover:text-blue-500">
        <h2 className="text-xl font-bold">{species.name.charAt(0).toUpperCase() + species.name.slice(1)}</h2>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(species.url)}.png`}
          alt={species.name}
          className="h-40 w-40"
        />
      </Link>
    ));
  };



  return (
    <div className="bg-zinc-100 flex flex-col items-center my-5 p-5">
      <h2 className="text-center text-3xl font-semibold mb-10 ">Pokemon Evolution</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {evolutionChain ? renderEvolutionChain(evolutionChain.chain) : <p>No evolution data available.</p>}
      </div>
    </div>
  );
};

export default Evolution;