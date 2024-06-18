import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PageState = {
    number: number;
};

const initialState: PageState = {
    number: 1,
};

const page = createSlice({
    name: 'page',
    initialState,
    reducers: {
        changePage: (state, action: PayloadAction<number>) => {
            state.number = action.payload;
        },
        resetPage: (state) => {
            state.number = 1; 
        },
    },
});


    export const {changePage, resetPage} = page.actions;
    export default page.reducer;