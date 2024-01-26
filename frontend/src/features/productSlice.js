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
    const res = await axios.get('https://mern-ecommerce-be.vercel.app/products');
    return res?.data;
  }
)

export const productFetch = createAsyncThunk(
  "products/productFetch",
  async (id) => {
    const res = await axios.get(`https://mern-ecommerce-be.vercel.app/products/${id}`);
    return res?.data;
  }
)

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selectedProduct = {}
    }
  },
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

export const { clearSelected } = productSlice.actions;
export default productSlice.reducer;
