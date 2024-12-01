import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    auth: authReducer,
    product: productReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
