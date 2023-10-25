import { createSlice } from "@reduxjs/toolkit";

export interface MiscSliceProps {
    loader: boolean,
    isDarkMode: boolean,
}
const initialState:MiscSliceProps = {
    loader: false,
    isDarkMode: false,
}


const miscSlice = createSlice({
    name: "misc",
    initialState: initialState,
    reducers: {
        toggleMode: (state:MiscSliceProps) => {
            state.isDarkMode=!state.isDarkMode
        },
        enableLoader: (state:MiscSliceProps ) => {
            state.loader=true
        },
        disableLoader: (state:MiscSliceProps ) => {
            state.loader=false
        },
    
    }
})

export const { toggleMode, enableLoader, disableLoader } = miscSlice.actions;

export default miscSlice.reducer;