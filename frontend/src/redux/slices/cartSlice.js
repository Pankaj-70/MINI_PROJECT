import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // For making API calls

const initialState = {
  cartItems: [], // Cart items in the state
  loading: false, // Loading state for async operations
  error: null, // To store error messages
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to set cart items in the Redux state
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    // Action to add item to the cart
    addToCartSuccess: (state, action) => {
      const { item, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        // If the item already exists, increase its quantity
        existingItem.quantity += quantity;
      } else {
        // If not, add the item with the specified quantity
        state.cartItems.push({ ...item, quantity });
      }
    },
    // Action to remove item from the cart
    removeFromCartSuccess: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    // Action to update quantity of an item
    updateQuantitySuccess: (state, action) => {
      const { itemId, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === itemId);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    // Action to set loading state
    setLoading: (state) => {
      state.loading = true;
    },
    // Action to handle error
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Action to clear error message
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

// Async Thunks for interacting with the backend
// Fetch cart items from backend
export const getCart = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading()); // Set loading state to true while fetching data
    const response = await axios.get("/api/v1/cart/getcart", {
      withCredentials: true,
    });
    dispatch(setCartItems(response.data.cartItems)); // Dispatch the fetched cart items to store
  } catch (error) {
    dispatch(setError(error.message)); // Handle error if the request fails
  }
};

// Add item to cart (send to backend)
export const addToCart = (item, quantity, userId) => async (dispatch) => {
  try {
    const response = await axios.post(
      "/api/v1/cart/add",
      {
        item,
        quantity,
        userId,
      },
      {
        withCredentials: true,
      }
    );

    // Create a new item object with the updated ID
    const updatedItem = { ...item, id: response.data.cart._id };
    // Dispatch success action with the updated item
    dispatch(addToCartSuccess({ item: updatedItem, quantity }));
  } catch (error) {
    dispatch(setError(error.message)); // Handle error if the request fails
    console.error(error);
  }
};

// Remove item from cart (send to backend)
export const removeFromCart = (itemId, userId) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/v1/cart/remove`, {
      data: { itemId, userId },
    });
    dispatch(removeFromCartSuccess(itemId)); // Dispatch success action
  } catch (error) {
    dispatch(setError(error.message)); // Handle error if the request fails
  }
};

// Update item quantity in cart (send to backend)
export const updateItemQuantity =
  (itemId, quantity, userId) => async (dispatch) => {
    try {
      const response = await axios.put("/api/v1/cart/update", {
        itemId,
        quantity,
        userId,
      });
      dispatch(
        updateQuantitySuccess({ itemId, quantity: response.data.quantity })
      ); // Dispatch success action with updated quantity
    } catch (error) {
      dispatch(setError(error.message)); // Handle error if the request fails
    }
  };
