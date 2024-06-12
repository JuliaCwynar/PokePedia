export default function Evolution({params}: {params: {pokemonId: string}}) {

    async function getEvolution() {
        let response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${params.pokemonId}`);
        let data = await response.json();
        return data;
    }

    let pokemon = await getEvolution();

    return (
        <div>
            <h1>Evolution</h1>
            <div>
                <h1>{pokemon.chain.species.name}</h1>
                <img src={pokemon.chain.species.url}></img>
            </div>
            <div>
                <h1>{pokemon.evolves_to.species.name}</h1>
                <img src={pokemon.evolves_to.species.url}></img>
            </div>
        </div>
    )
}