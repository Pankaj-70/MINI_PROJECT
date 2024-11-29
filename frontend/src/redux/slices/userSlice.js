import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userId: null,
  name: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { userId, name, email } = action.payload;
      state.isLoggedIn = true;
      state.userId = userId;
      state.name = name;
      state.email = email;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      state.name = "";
      state.email = "";
      state.role = "";
    },
    updateUserInfo: (state, action) => {
      const { name, email } = action.payload;
      state.name = name || state.name;
      state.email = email || state.email;
    },
  },
});

export const { login, logout, updateUserInfo } = userSlice.actions;

export default userSlice.reducer;
