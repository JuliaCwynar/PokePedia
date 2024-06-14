"use client"
import React, {useEffect, useState} from 'react';

export default function Evolution({params}: {params: {pokemonId: string}}) {

    const [evolutionChain, setEvolutionChain] = useState<any>(null);

    useEffect(() => {
    async function getEvolution() {
        let response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${params.pokemonId}`);
        let data = await response.json();
        setEvolutionChain(data);
    }

   getEvolution();
}, [params.pokemonId]);

const renderEvolutionChain = (chain) => {
    const evolutions = [];

    const traverseChain = (node) => {
      evolutions.push(node.species);
      if (node.evolves_to.length > 0) {
        node.evolves_to.forEach((evolution) => traverseChain(evolution));
      }
    };

    traverseChain(chain);

    return evolutions.map((species, index) => (
      <div key={index}>
        <h1>{species.name}</h1>
        <img src={`https://pokeapi.co/media/sprites/pokemon/${species.url.split('/')[6]}.png`} alt={species.name} />
      </div>
    ));
  };

  return (
    <div>
      <h1>Evolution</h1>
      <div>
        {evolutionChain ? renderEvolutionChain(evolutionChain.chain) : <p>No evolution data available.</p>}
      </div>
    </div>
  );
}