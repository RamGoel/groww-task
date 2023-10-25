import { createSlice } from "@reduxjs/toolkit";

export interface StockSliceProps {
    gainers: any,
    losers: any,
    searchResults:any
}
const initialState:StockSliceProps = {
    gainers: null,
    losers: null,
    searchResults:null,
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
        }
    },
})

export const { saveGainers, saveLosers, saveResults } = stockSlice.actions;

export default stockSlice.reducer;