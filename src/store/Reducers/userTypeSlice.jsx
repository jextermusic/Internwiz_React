// userTypeSlice.js

import { createSlice } from '@reduxjs/toolkit';

const userTypeSlice = createSlice({
  name: 'userType',
  initialState: null,
  reducers: {
    setUserType: (state, action) => {
      return action.payload;
    },
    clearUserType: () => null,
  },
});

export const { setUserType, clearUserType } = userTypeSlice.actions;
export default userTypeSlice.reducer;