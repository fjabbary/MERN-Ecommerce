import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
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
  },
})


export default productSlice.reducer;