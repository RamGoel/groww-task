import { createSlice } from "@reduxjs/toolkit";

export interface MiscSliceProps {
    loader: boolean,
    isDarkMode: boolean,
    tab: string
}
const initialState:MiscSliceProps = {
    loader: false,
    isDarkMode: false,
    tab: "gainers"
}


const miscSlice = createSlice({
    name: "misc",
    initialState: initialState,
    reducers: {
        toggleMode: (state) => {
            state.isDarkMode=!state.isDarkMode
        },
        changeTab: (state, action) => {
            state.tab=action.payload
        },
        enableLoader: (state ) => {
            state.loader=true
        },
        disableLoader: (state ) => {
            state.loader=false
        },
    
    }
})

export const { toggleMode, enableLoader, disableLoader, changeTab } = miscSlice.actions;

export default miscSlice.reducer;