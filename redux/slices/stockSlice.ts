import { createSlice } from "@reduxjs/toolkit";

export interface StockSliceProps {
    gainers: any,
    losers: any,
}
const initialState:StockSliceProps = {
    gainers: null,
    losers: null,
}


interface actionType{
    payload:any
}
const stockSlice = createSlice({
    name: "explore",
    initialState: initialState,
    reducers: {
        saveGainers: (action:actionType, state:StockSliceProps) => {
            state.gainers=action.payload
        },
        saveLosers: (action:actionType, state:StockSliceProps) => {
            state.losers=action.payload
        },
    }
})

export const { saveGainers, saveLosers } = stockSlice.actions;

export default stockSlice.reducer;