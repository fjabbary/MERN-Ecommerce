import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from './api';

const initialState = {
  likes: null,
  dislikes: null
}

export const rateLike = createAsyncThunk(
  "rate/rateIncrease",
  async (data) => {
    const { _id, direction } = data

    const res = await axios.put(`${url}/rateProductLike/${_id}/${direction}`);

    return res?.data.likeCount;
  }
)

export const rateDislike = createAsyncThunk(
  "rate/rateDecrease",
  async (data) => {
    const { _id, direction } = data

    const res = await axios.put(`${url}/rateProductDislike/${_id}/${direction}`);
    return res?.data.dislikeCount;
  }
)


const rateSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {

    builder.addCase(rateLike.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.likes = action.payload;
    });

    builder.addCase(rateDislike.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.dislikes = action.payload;
    });

  },
})

export default rateSlice.reducer;