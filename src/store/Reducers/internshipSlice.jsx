import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    internship: null,
    singleinternship: null,
};

export const internshipSlice = createSlice({
    name: "internship",
    initialState,
    reducers: {
        saveInternship: (state, action) => {
            state.internship = action.payload;
            state.error = null;
        },
        saveSingleInternship: (state, action) => {
            state.singleinternship = action.payload;
            state.error = null;
        },
        removeInternships: (state, action) => {
            state.user = null;
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
export const { saveInternship, saveSingleInternship, removeInternship, setError, clearError } = internshipSlice.actions;

export default internshipSlice.reducer;
