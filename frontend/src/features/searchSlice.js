import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from './api';


const initialState = {
  results: [],
  status: null,
  error: null
}

export const searchProducts = createAsyncThunk(
  "products/productsSearch",
  async (query) => {
    const res = await axios.get(`${url}/search/${query}`);
    return res?.data;
  }
)

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(searchProducts.pending, state => {
      state.status = 'pending';
    });
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.results = action.payload;
    });
    builder.addCase(searchProducts.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  }
})


export default searchSlice.reducer;