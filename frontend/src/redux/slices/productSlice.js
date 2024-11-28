import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const adminInitialState = {
  isLoading: false,
  productList: [],
};

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get("/api/v1/product/fetch");
    return result?.data;
  }
);

const productSlice = createSlice({
  name: "adminProducts",
  initialState: adminInitialState,
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default productSlice.reducer;
