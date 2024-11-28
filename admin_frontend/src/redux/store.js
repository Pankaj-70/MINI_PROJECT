import { configureStore } from "@reduxjs/toolkit";
import adminOrderSlice from "./order-slice";
import authenticateSlice from "./auth-slice";
const store = configureStore({
  reducer: {
    adminOrder: adminOrderSlice,
    autheticate: authenticateSlice,
  },
});

export default store;
