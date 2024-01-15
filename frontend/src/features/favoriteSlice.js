import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from './api';
import { toast } from 'react-toastify';

const initialState = {
  favorites: [],
  // deletedFavoriteId: '',
  status: null,
  error: null
}

export const addToFavorite = createAsyncThunk(
  "favorite/addToFavorite",
  async (data) => {

    const res = await axios.put(`${url}/addToFavorite`, data);
    toast.info(res.data, {
      position: "bottom-right"
    })
    return res?.data;
  }
)

export const getFavorites = createAsyncThunk(
  "favorite/getFavorites",
  async (userId) => {
    const res = await axios.post(`${url}/getFavorites`, { userId });
    return res?.data?.favorites;
  }
)

export const removeFromFavorite = createAsyncThunk(
  "favorite/removeFromFavorite",
  async (data) => {
    const res = await axios.put(`${url}/deleteFavorite/${data.productId}`, data)
    console.log(res.data);
    return res.data
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

    builder.addCase(removeFromFavorite.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.favorites = state.favorites.filter(item => item._id !== action.payload);
    });
  }
})

export default favoriteSlice.reducer;