import { createSlice } from "@reduxjs/toolkit";

export interface StockSliceProps {
    gainers: any,
    losers: any,
    activelyTraded: any,
    searchResults:any
}
const initialState:StockSliceProps = {
    gainers: null,
    losers: null,
    searchResults: null,
    activelyTraded: null
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
        saveResults: (state, action) => {
            state.searchResults=action.payload
        },
        saveActivelyTraded: (state, action) => {
            state.activelyTraded=action.payload
        }
    },
})

export const { saveGainers, saveActivelyTraded, saveLosers, saveResults } = stockSlice.actions;

export default stockSlice.reducer;