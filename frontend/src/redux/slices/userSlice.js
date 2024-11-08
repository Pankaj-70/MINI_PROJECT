import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
