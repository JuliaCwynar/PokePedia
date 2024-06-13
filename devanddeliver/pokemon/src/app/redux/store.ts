//hold all states

import {configureStore} from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
    reducer: {
        authReducer,
        //reducer - function that takes an action and previous state of app and make changes to the state
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector