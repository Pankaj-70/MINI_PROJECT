import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { item, quantity } = action.payload;
      // Check if the item already exists in the cart
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.img === item.img
      );

      if (existingItem) {
        // If it exists, update its quantity
        existingItem.quantity += quantity;
      } else {
        // Otherwise, add the item with the specified quantity
        state.cartItems.push({ ...item, quantity });
      }
    },
    buyNow: (state, action) => {
      const { item, quantity } = action.payload;
      state.cartItems.push({ ...item, quantity });
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      // Filter out the item with the matching id from cartItems
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.img !== itemId.img
      );
    },
  },
});

export const { addToCart, buyNow, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
