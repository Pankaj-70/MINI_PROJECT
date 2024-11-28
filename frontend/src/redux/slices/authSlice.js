import { createSlice } from "@reduxjs/toolkit";
const authInitialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authenticate",
  initialState: authInitialState,
  reducers: {
    toggleAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { toggleAuth } = authSlice.actions;
export default authSlice.reducer;
