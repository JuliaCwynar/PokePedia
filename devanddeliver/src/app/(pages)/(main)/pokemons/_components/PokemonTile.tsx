import Link from "next/link";

interface Pokemon {
    id: number;
    name: string;
    image: string;
    type: string;
}

function capitalize(string : string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  

function getColor(type: string) {
    switch (type) {
        case 'normal':
          return 'bg-gray-200';
        case 'fire':
          return 'bg-red-200';
        case 'water':
          return 'bg-blue-200';
        case 'electric':
          return 'bg-yellow-200';
        case 'grass':
          return 'bg-green-200';
        case 'ice':
          return 'bg-cyan-200';
        case 'fighting':
          return 'bg-red-200';
        case 'poison':
          return 'bg-purple-200';
        case 'ground':
          return 'bg-yellow-200';
        case 'flying':
          return 'bg-indigo-200';
        case 'psychic':
          return 'bg-pink-200';
        case 'bug':
          return 'bg-green-200';
        case 'rock':
          return 'bg-yellow-100';
        case 'ghost':
          return 'bg-indigo-100';
        case 'dark':
          return 'bg-gray-200';
        case 'dragon':
          return 'bg-purple-200';
        case 'steel':
          return 'bg-gray-200';
        case 'fairy':
          return 'bg-pink-200';
        default:
            return 'bg-gray-200';
    }

}

export default function PokemonTile({pokemon}: {pokemon: Pokemon}) {

    console.log(pokemon)

    return(
        <div className={`${getColor(pokemon.type)} m-10 p-10 shadow-lg rounded-lg`}>
            <h1 className="text-center text-xl font-bold text-gray-800 mb-4">
                {capitalize(pokemon.name)}
            </h1>
            <img
                src={pokemon.image} 
                alt={pokemon.name}
                className="p-2 h-18 w-18 mx-auto rounded-lg">
            </img>
            <Link href={`pokemons/${pokemon.id}`}>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
                    See details
                </button>
            </Link>
        </div>
    )
}