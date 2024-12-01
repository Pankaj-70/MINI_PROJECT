import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  isLoading: false,
};

const orderSlice = createSlice({
  initialState,
  name: "order",
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
