import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    addToCartSuccess: (state, action) => {
      const { item, quantity } = action.payload;
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ ...item, quantity });
      }
    },
    removeFromCartSuccess: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    updateQuantitySuccess: (state, action) => {
      const { itemId, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === itemId);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCartItems,
  addToCartSuccess,
  removeFromCartSuccess,
  updateQuantitySuccess,
  setLoading,
  setError,
  clearError,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axios.get(`/api/v1/cart/getcart/${userId}`, {
      withCredentials: true,
    });
    dispatch(setCartItems(response.data.items));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const addToCart = (item, quantity, userId) => async (dispatch) => {
  try {
    const response = await axios.post(
      "/api/v1/cart/add",
      { item, quantity, userId },
      { withCredentials: true }
    );

    const updatedItem = { ...item, id: response.data.cart._id };
    dispatch(addToCartSuccess({ item: updatedItem, quantity }));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const removeFromCart = (itemId, userId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/cart/remove`, {
      data: { itemId, userId },
    });
    dispatch(removeFromCartSuccess(itemId));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const updateItemQuantity =
  (productId, quantity, userId) => async (dispatch) => {
    try {
      const response = await axios.patch("/api/v1/cart/update", {
        productId,
        quantity,
        userId,
      });
      console.log(response);
      dispatch(updateQuantitySuccess({ itemId, quantity: response.data.ret }));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
