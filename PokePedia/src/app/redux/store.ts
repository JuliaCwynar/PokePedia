//hold all states

import {configureStore} from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import pokemonReducer from './features/pokemonSlice'

export const store = configureStore({
    reducer: {
        authReducer,
        pokemons: pokemonReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector