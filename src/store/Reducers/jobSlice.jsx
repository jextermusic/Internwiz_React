import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    job: null,
    singlejob: null
};

export const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        saveJob: (state, action) => {
            state.job = action.payload;
            state.error = null;
        },
        saveSingleJob: (state, action) => {
            state.singlejob = action.payload;
            state.error = null;
        },
        removeJob: (state, action) => {
            state.job = null;
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
export const { saveJob, removeJob, saveSingleJob, setError, clearError } = jobSlice.actions;

export default jobSlice.reducer;
