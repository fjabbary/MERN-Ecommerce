import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
};

export const categoriesFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const res = await axios.get("http://localhost:5000/categories");
    return res?.data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(categoriesFetch.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(categoriesFetch.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.categories = action.payload;
    });
    builder.addCase(categoriesFetch.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export default categorySlice.reducer;
