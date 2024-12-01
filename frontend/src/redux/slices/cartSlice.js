import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  loading: false,
  error: "",
  totalPrice: 0,
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
      const existingItem = state.cartItems.find(
        (food) => food.productId._id === item._id
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ ...item, quantity });
      }
    },
    removeFromCartSuccess: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId._id !== action.payload
      );
    },
    updateQuantitySuccess: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId._id === productId
      );

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
    setTotalPrice: (state, action) => {
      totalPrice += action.payload;
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
    // console.log(state.cartItems, "dh");
  } catch (error) {}
};

export const addToCart = (item, quantity, userId) => async (dispatch) => {
  try {
    const response = await axios.post(
      "/api/v1/cart/add",
      { item, quantity, userId },
      { withCredentials: true }
    );

    const payload = {
      productId: {
        _id: item.id,
        name: item.name,
        price: item.price,
        img: item.img,
        stock: item.stock,
        description: item.description,
        category: item.category,
        calorie: item.calorie,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        __v: item.__v,
      },
      quantity,
      totalPrice: item.price * quantity,
      _id: response.data.cart._id,
    };

    const updatedItem = { ...payload, id: response.data.cart._id };

    dispatch(addToCartSuccess({ item: updatedItem, quantity }));
  } catch (error) {
    // dispatch(setError(response.data.message));
  }
};

export const removeFromCart = (productId, userId) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/v1/cart/remove`, {
      data: { productId, userId },
    });
    dispatch(removeFromCartSuccess(productId));
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
      dispatch(
        updateQuantitySuccess({ productId, quantity: response.data.ret })
      );
    } catch (error) {
      dispatch(setError(error.response.data.message));
    }
  };
