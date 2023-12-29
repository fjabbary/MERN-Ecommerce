import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  selectedProduct: {},
  status: null,
  error: null
}

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const res = await axios.get('http://localhost:5000/products');
    return res?.data;
  }
)

export const productFetch = createAsyncThunk(
  "products/productFetch",
  async ({ category, id }) => {
    const res = await axios.get(`http://localhost:5000/products/${category}/${id}`);
    return res?.data;
  }
)

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productsFetch.pending, state => {
      state.status = 'pending';
    });
    builder.addCase(productsFetch.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.products = action.payload;
    });
    builder.addCase(productsFetch.rejected, (state, action) => {
      state.status = 'rejected';
    });
    builder.addCase(productFetch.fulfilled, (state, action) => {
      state.selectedProduct = action.payload;
    });
  },
})


export default productSlice.reducer;