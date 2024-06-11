import { get } from "http"
import { Metadata } from "next"

export const generateMetadata = ({params} : Props): Metadata => ({
    title: `${params.pokemonId}`,
    description: `Pokemon Details`,
    keywords: ['Pokemon', 'Details', params.pokemonId],
})

type Props = {
    params: { 
        pokemonId: string 
    }
}



export default async function PokemonDetails( {params}: {params: {pokemonId: string}}) {

    async function getPokemon() {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`);
        let data = await response.json();
        console.log(data)
        return data;
    }

    let pokemon = await getPokemon();

    return (
        <div>
            <h1>Pokemon Details</h1>
            <p>{params.pokemonId}</p>
            <p>{pokemon.name}</p>
            <img src={pokemon.sprites.front_default}></img>
        </div>
    )
}