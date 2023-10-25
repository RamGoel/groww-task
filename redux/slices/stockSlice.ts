import { createSlice } from "@reduxjs/toolkit";

export interface StockSliceProps {
    gainers: any,
    losers: any,
    tab1: string
}
const initialState:StockSliceProps = {
    gainers: null,
    losers: null,
    tab1:"Hello"
}



const stockSlice = createSlice({
    name: "stock",
    initialState,
    reducers: {
        saveGainers: (state, action) => {
            state.gainers=action.payload
        },
        saveLosers: (state, action) => {
            state.losers=action.payload
        },
    },
})

export const { saveGainers, saveLosers } = stockSlice.actions;

export default stockSlice.reducer;