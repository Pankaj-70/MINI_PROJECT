import { createSlice } from "@reduxjs/toolkit";
const authInitialState = {
  isAuthenticated: false,
};

const AuthenticateSlice = createSlice({
  name: "authenticate",
  initialState: authInitialState,
  reducers: {
    toggleAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { toggleAuth } = AuthenticateSlice.actions;
export default AuthenticateSlice.reducer;
