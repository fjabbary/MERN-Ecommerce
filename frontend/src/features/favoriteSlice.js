import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from './api';
import { toast } from 'react-toastify';

const initialState = {
  favorites: [],
  status: null,
  error: null
}

export const addToFavorite = createAsyncThunk(
  "favorite/addToFavorite",
  async (data) => {
    toast.info(`Added to the favorite`, {
      position: "bottom-right"
    })
    const res = await axios.put(`${url}/addToFavorite`, data);
    return res?.data;
  }
)

export const getFavorites = createAsyncThunk(
  "favorite/getFavorites",
  async (userId) => {

    const res = await axios.post(`${url}/getFavorites`, { userId });
    console.log(res);
    console.log(userId);
    return res?.data?.favorites;
  }
)

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {

  },
  extraReducers: builder => {

    builder.addCase(getFavorites.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.favorites = action.payload;
    });


  }
})

export default favoriteSlice.reducer;