import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    isAuth: boolean;
    token: string | null;
    username: string | null;
};

const initialState: AuthState = {
    isAuth: false,
    token: null,
    username: null,
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string; username: string }>) => {
            state.isAuth = true;
            state.token = action.payload.token;
            state.username = action.payload.username;
            localStorage.setItem('isAuth', 'true');
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.isAuth = false;
            state.token = null;
            state.username = null;
            localStorage.removeItem('isAuth');
            localStorage.removeItem('token');
        },
    },
});


    export const {login, logout} = auth.actions;
    export default auth.reducer;