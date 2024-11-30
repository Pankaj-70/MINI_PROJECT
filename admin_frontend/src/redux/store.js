import { configureStore } from "@reduxjs/toolkit";
import adminOrderSlice from "./order-slice";
import authenticateSlice from "./auth-slice";
const store = configureStore({
  reducer: {
    adminOrder: adminOrderSlice,
    authenticate: authenticateSlice,
  },
});

export default store;
