import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonData {
  id: number;
  name: string;
  image: string;
  type: string;
  hp: number;
}

interface PokemonState {
  allPokemons: PokemonData[];
  filteredPokemons: PokemonData[];
  paginatedPokemons: PokemonData[];
}

const initialState: PokemonState = {
  allPokemons: [],
  filteredPokemons: [],
  paginatedPokemons: [],
};

export const fetchPokemons = () => async (dispatch: any) => {
  try {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
    if (!response.ok) {
      throw new Error('Failed to fetch pokemons');
    }
    let data = await response.json();

    const pokemonInfo = await Promise.all(
      data.results.map(async (pokemon: any) => {
        let detailsResponse = await fetch(pokemon.url);
        if (!detailsResponse.ok) {
          throw new Error('Failed to fetch pokemon details');
        }
        const details = await detailsResponse.json();
        return {
          id: details.id,
          name: details.name,
          image: details.sprites.front_default,
          type: details.types[0].type.name,
          hp: details.stats[0].base_stat,
        };
      })
    );

    dispatch(fetchPokemonsSuccess(pokemonInfo));
  } catch (error) {
    console.error('Error fetching pokemons:', error);
  }
};

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    fetchPokemonsSuccess: (state, action: PayloadAction<PokemonData[]>) => {
      state.allPokemons = action.payload;
      state.filteredPokemons = action.payload;
      state.paginatedPokemons = action.payload.slice(0, 21); 
    },
    filterPokemons: (state, action: PayloadAction<string[]>) => {
      const selectedTypes = action.payload;
      state.filteredPokemons = state.allPokemons.filter(pokemon =>
        selectedTypes.length === 0 || selectedTypes.includes(pokemon.type)
      );
      state.paginatedPokemons = state.filteredPokemons.slice(0, 21); 
    },
    sortPokemons: (state, action: PayloadAction<string>) => {
      const sortOrder = action.payload;
      state.filteredPokemons.sort((a, b) =>
        sortOrder === 'asc' ? a.hp - b.hp : b.hp - a.hp
      );
      state.paginatedPokemons = state.filteredPokemons.slice(0, 21);
    },
    setFilteredPokemonsByPage: (state, action: PayloadAction<{ page: number; limit: number }>) => {
      const { page, limit } = action.payload;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      state.paginatedPokemons = state.filteredPokemons.slice(startIndex, endIndex);
    },
    searchPokemons: (state, action: PayloadAction<string>) => {
      const searchQuery = action.payload;
      console.log('searchQuery',searchQuery);
      if (searchQuery === '') {
        state.filteredPokemons = state.allPokemons;
      }
      state.filteredPokemons = state.allPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().startsWith(searchQuery)
      );
      console.log('redux',state.filteredPokemons);
      
      state.paginatedPokemons = state.filteredPokemons.slice(0, 21);
    }
  },
});

export const { searchPokemons, fetchPokemonsSuccess, filterPokemons, sortPokemons, setFilteredPokemonsByPage } = pokemonSlice.actions;
export default pokemonSlice.reducer;