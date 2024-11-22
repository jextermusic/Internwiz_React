import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employe: null,
};

export const employeSlice = createSlice({
    name: "employe",
    initialState,
    reducers: {
        saveEmploye: (state, action) => {
            state.employe = action.payload;
            state.error = null;
        },
        removeInternships: (state, action) => {
            state.employe = null;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null; // Clear error message
        },
    },
});

// Action creators are generated for each case reducer function
export const { saveEmploye, removeEmploye, setError, clearError } = employeSlice.actions;

export default employeSlice.reducer;
