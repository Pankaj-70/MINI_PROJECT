import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const adminInitialState = {
  isLoading: false,
  productList: [],
  totalOrders: 0,
  totalUsers: 0,
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post("/api/v1/product/add", formData);
    productList.push(data);

    return result?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get("/api/v1/product/fetch");
    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (_id) => {
    const result = await axios.delete(`/api/v1/product/delete/${_id}`);
    return result?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState: adminInitialState,
  reducers: {
    setTotalOrders: (state, action) => {
      state.totalOrders = action.payload;
    },
    setTotalUsers: (state, action) => {
      state.totalUsers = action.payload;
    },
  },
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
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = state.productList.filter(
          (product) => product._id !== action.payload.id.id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { setTotalOrders, setTotalUsers } = AdminProductsSlice.actions;
export default AdminProductsSlice.reducer;
