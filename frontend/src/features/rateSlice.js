import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from './api';

const initialState = {
  likes: localStorage.getItem('likeRate') ? Number(localStorage.getItem('likeRate')) : 0,
  dislikes: localStorage.getItem('dislikeRate') ? Number(localStorage.getItem('dislikeRate')) : 0
}

export const rateLike = createAsyncThunk(
  "rate/rateIncrease",
  async (productId) => {

    const res = await axios.put(`${url}/rateProductLike/${productId}`);

    console.log(res.data.likeCount);
    return res?.data.likeCount;
  }
)

export const rateDislike = createAsyncThunk(
  "rate/rateDecrease",
  async (productId) => {

    const res = await axios.put(`${url}/rateProductDislike/${productId}`);
    console.log(res);
    return res?.data.dislikeCount;
  }
)


const rateSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(rateLike.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.likes += 1;
    });

    builder.addCase(rateDislike.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.dislikes += 1;
    });

  },
})

export default rateSlice.reducer;