import Link from "next/link";

interface Pokemon {
    id: number;
    name: string;
    image: string;
    type: string;
    hp: number;
}

function capitalize(string : string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getColor(type: string) {
    switch (type) {
      case 'normal':
        return 'bg-gray-200 hover:bg-gray-300';
    case 'fire':
        return 'bg-red-200 hover:bg-red-300';
    case 'water':
        return 'bg-blue-200 hover:bg-blue-300';
    case 'electric':
        return 'bg-yellow-200 hover:bg-yellow-300';
    case 'grass':
        return 'bg-green-200 hover:bg-green-300';
    case 'ice':
        return 'bg-cyan-200 hover:bg-cyan-300';
    case 'fighting':
        return 'bg-red-400 hover:bg-red-500';
    case 'poison':
        return 'bg-purple-200 hover:bg-purple-300';
    case 'ground':
        return 'bg-yellow-400 hover:bg-yellow-500';
    case 'flying':
        return 'bg-indigo-200 hover:bg-indigo-300';
    case 'psychic':
        return 'bg-pink-200 hover:bg-pink-300';
    case 'bug':
        return 'bg-green-400 hover:bg-green-500';
    case 'rock':
        return 'bg-yellow-600 hover:bg-yellow-700';
    case 'ghost':
        return 'bg-indigo-400 hover:bg-indigo-500';
    case 'dark':
        return 'bg-gray-400 hover:bg-gray-500';
    case 'dragon':
        return 'bg-purple-400 hover:bg-purple-500';
    case 'steel':
        return 'bg-gray-300 hover:bg-gray-400';
    case 'fairy':
        return 'bg-pink-400 hover:bg-pink-500';
    default:
        return 'bg-gray-100 hover:bg-gray-200';
}

}

export default function PokemonTile({pokemon}: {pokemon: Pokemon}) {

    console.log(pokemon)

    return(
      <Link href={`pokemons/${pokemon.id}`}>
        <div className={`${getColor(pokemon.type)} m-5 px-10 pt-5 shadow-lg rounded-lg transform transition-transform hover:bg-blend-darken hover:shadow-xl transition-all duration-300 ease-in-out`}>
            <h1 className="text-center text-xl font-bold text-gray-800">
                {capitalize(pokemon.name)}
            </h1>
            <h2 className="text-center text-lg text-gray-800">
              {capitalize(pokemon.type)}
            </h2>
            <h2 className="text-center text-lg text-gray-800">
              HP <b>{pokemon.hp}</b>
            </h2>
            <img
                src={pokemon.image} 
                alt={pokemon.name}
                className="p-2 h-48 w-48 mx-auto rounded-lg"
            />
          
        </div>
        </Link>
    )
}