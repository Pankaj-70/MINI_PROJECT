import { configureStore } from "@reduxjs/toolkit";
import adminOrderSlice from "./order-slice";
const store = configureStore({
	reducer: {
		adminOrder: adminOrderSlice,
	},
});

export default store;
