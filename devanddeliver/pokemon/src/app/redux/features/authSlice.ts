import {createSlice, PayloadAction} from '@reduxjs/toolkit';


type initialState = {
    value: authState;
}

type authState = {
    isAuth: boolean;
    username: string | null;
    password: string | null;
}

const initialState = {
    value: {
        isAuth: false,
        username: null,
        password: null,
    } as authState
} as initialState

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{username: string, password: string}>) => {
            state.value = {
                isAuth: true,
                username: action.payload.username,
                password: action.payload.password,
            }
        },
        logout: () => {
            initialState
        },
        register : (state, action: PayloadAction<{username: string, password: string}>) => {
            state.value = {
                isAuth: true,
                username: action.payload.username,
                password: action.payload.password,
            }
        }
    }})


    export const {login, logout, register} = auth.actions;
    export default auth.reducer;