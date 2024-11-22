import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuth: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
            state.error = null;
        },
        removeUser: (state, action) => {
            state.user = null;
            state.isAuth = false;
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
export const { saveUser, removeUser, setError, clearError } = userSlice.actions;

export default userSlice.reducer;
