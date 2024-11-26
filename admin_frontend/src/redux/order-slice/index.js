import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	isLoading: false,
	productList: [],
};

export const addNewProduct = createAsyncThunk(
	"/products/addnewproduct",
	async (formData) => {
		const result = await axios.post("/api/v1/product/add", formData, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log(`result=${result}`);

		return result?.data;
	}
);

export const fetchAllProducts = createAsyncThunk(
	"/products/fetchAllProducts",
	async () => {
		const result = await axios.get("/api/v1/product/fetch");
		console.log(`result=${result}`);
		return result?.data;
	}
);

export const deleteProduct = createAsyncThunk(
	"/products/deleteProduct",
	async (id) => {
		const result = await axios.delete(`/api/v1/product/delete/${id}`);

		return result?.data;
	}
);

const AdminProductsSlice = createSlice({
	name: "adminProducts",
	initialState,
	reducers: {},
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

export default AdminProductsSlice.reducer;
