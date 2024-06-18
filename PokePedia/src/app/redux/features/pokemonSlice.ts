import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { resetPage } from './pageSlice';

interface PokemonShort {
    id: number;
    name: string;
    type: string;
    hp: number;
}

interface PokemonData extends PokemonShort {
    image: string;
}

interface PokemonState {
    allPokemons: PokemonShort[];
    filteredPokemons: PokemonShort[];
    searchResults: PokemonShort[];
    paginatedPokemons: PokemonData[];
}

const initialState: PokemonState = {
    allPokemons: [],
    filteredPokemons: [],
    searchResults: [],
    paginatedPokemons: [],
};

export const fetchAllPokemonIds = () => async (dispatch: any) => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1302');
        if (!response.ok) {
            throw new Error('Failed to fetch Pokémon list');
        }
        const data = await response.json();

        const pokemonBasicInfo = data.results.map((pokemon: any) => ({
            id: parseInt(pokemon.url.split('/').slice(-2, -1)[0], 10),
            name: pokemon.name,
        }));

        const pokemonDetailsPromises = pokemonBasicInfo.map(async (pokemon: any) => {
            const detailResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
            if (!detailResponse.ok) {
                throw new Error(`Failed to fetch details for ${pokemon.name}`);
            }
            const detailData = await detailResponse.json();
            return {
                id: pokemon.id,
                name: pokemon.name,
                type: detailData.types.map((typeInfo: any) => typeInfo.type.name),
                hp: detailData.stats.find((stat: any) => stat.stat.name === 'hp').base_stat,
            };
        });

        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        dispatch(getPokemons(pokemonDetails));
    } catch (error) {
        console.error('Error fetching Pokémon list:', error);
    }
};

export const fetchPokemonDetails = (page: number, limit: number) => async (dispatch: any, getState: any) => {
    try {
        const { searchResults } = getState().pokemons;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedIds = searchResults.slice(startIndex, endIndex);

        const pokemonDetails = await Promise.all(
            paginatedIds.map(async (pokemon: PokemonShort) => {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch Pokémon details');
                }
                const details = await response.json();
                return {
                    id: details.id,
                    name: details.name,
                    image: details.sprites.front_default,
                    type: details.types[0].type.name,
                    hp: details.stats[0].base_stat,
                };
            })
        );

        dispatch(getPokemonDetails(pokemonDetails));
    } catch (error) {
        console.error('Error fetching Pokémon details:', error);
    }
};

const pokemonSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        getPokemons: (state, action: PayloadAction<PokemonShort[]>) => {
            state.allPokemons = action.payload;
            state.filteredPokemons = action.payload;
            state.searchResults = action.payload;
        },
        getPokemonDetails: (state, action: PayloadAction<PokemonData[]>) => {
            state.paginatedPokemons = action.payload;
        },
        filterPokemons: (state, action: PayloadAction<string[]>) => {
            const selectedTypes = action.payload;
            if (selectedTypes.length === 0) {
                state.filteredPokemons = state.allPokemons;
                state.searchResults = state.allPokemons;
            } else {
                state.filteredPokemons = state.allPokemons.filter(pokemon =>
                    selectedTypes.some(selectedType => pokemon.type.includes(selectedType))
                );
                state.searchResults = state.filteredPokemons;
            }
            resetPage();
        },
        sortPokemons: (state, action: PayloadAction<string>) => {
            const sortOrder = action.payload;
            state.filteredPokemons.sort((a, b) =>
                sortOrder === 'asc' ? a.hp - b.hp : b.hp - a.hp
            );
            state.searchResults = state.filteredPokemons;
        },
        searchPokemons: (state, action: PayloadAction<string>) => {
            const searchQuery = action.payload.toLowerCase();
            if (searchQuery.length === 0) {
                state.searchResults = state.filteredPokemons;
            } else {
                state.searchResults = state.filteredPokemons.filter(pokemon =>
                    pokemon.name.toLowerCase().startsWith(searchQuery)
                );
            }
        },
    },
});

export const {
    getPokemons,
    getPokemonDetails,
    filterPokemons,
    sortPokemons,
    searchPokemons,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;