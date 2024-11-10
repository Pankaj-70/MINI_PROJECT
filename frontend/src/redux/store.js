// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice"; // Import the cart reducer

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer, // Add the cart reducer
  },
});
