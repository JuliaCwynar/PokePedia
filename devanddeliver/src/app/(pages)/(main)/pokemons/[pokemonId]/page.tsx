import { get } from "http"
import { Metadata } from "next"

// export const generateMetadata = ({params} : Props): Metadata => ({
//     title: `${params.pokemonId}`,
//     description: `Pokemon Details`,
//     keywords: ['Pokemon', 'Details', params.pokemonId],
// })

// interface Pokemon {
//     id: number;
//     name: string;
//     image: string;

// }

export default async function PokemonDetails( {params}: {params: {pokemonId: string}}) {

    async function getPokemon() {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`);
        let data = await response.json();
        return data;
    }

    let pokemon = await getPokemon();
    console.log(pokemon);

    return (
        <div className="bg-zinc-100 min-h-screen flex flex-col items-center py-8">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-center text-4xl font-bold mb-4 text-gray-800">Pokemon Details</h1>
        <h2 className="text-center text-2xl font-semibold mb-4 text-gray-600">{pokemon.name}</h2>
        <div className="flex justify-center">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} className="h-48 w-48" />
        </div>
      </div>
    </div>
    )
}