import Link from "next/link";

interface Pokemon {
    id: number;
    name: string;
    image: string;
}

function capitalize(string : string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  

export default function PokemonTile({pokemon}: {pokemon: Pokemon}) {

    return(
        <div className="bg-zinc-300 m-10 p-10">
            <h1 className="text-center">
                {capitalize(pokemon.name)}
            </h1>
            <img src={pokemon.image} alt={pokemon.name}/>
            <Link href={`pokemons/${pokemon.id}`}><button>See details</button></Link>
        </div>
    )
}