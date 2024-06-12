import { get } from "http"
import { Metadata } from "next"

export const generateMetadata = ({params} : Props): Metadata => ({
    title: `${params.pokemonId}`,
    description: `Pokemon Details`,
    keywords: ['Pokemon', 'Details', params.pokemonId],
})

interface Pokemon {
    id: number;
    name: string;
    image: string;
}



export default async function PokemonDetails( {params}: {params: {pokemonId: string}}) {

    async function getPokemon() {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`);
        let data = await response.json();
        return data;
    }

    let pokemon = await getPokemon();

    return (
        <div>
            <h1>Pokemon Details</h1>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default}></img>
        </div>
    )
}