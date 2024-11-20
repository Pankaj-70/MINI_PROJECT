import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userId: null, // userId will be stored when user logs in
  name: "", // user's name
  email: "", // user's email
  role: "", // user role (can be 'user', 'admin', etc.)
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { userId, name, email, role } = action.payload;
      state.isLoggedIn = true;
      state.userId = userId;
      state.name = name;
      state.email = email;
      state.role = role;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      state.name = "";
      state.email = "";
      state.role = "";
    },
    updateUserInfo: (state, action) => {
      const { name, email, role } = action.payload;
      state.name = name || state.name;
      state.email = email || state.email;
      state.role = role || state.role;
    },
  },
});

export const { login, logout, updateUserInfo } = userSlice.actions;

export default userSlice.reducer;
