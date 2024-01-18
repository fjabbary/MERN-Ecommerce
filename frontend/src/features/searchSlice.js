import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from './api';


const initialState = {
  searchDropdownOpen: false,
  results: [],
  status: null,
  error: null
}

export const searchProducts = createAsyncThunk(
  "products/productsSearch",
  async (query) => {
    const res = await axios.get(`${url}/search/${query}`);
    return res?.data.searchResults;
  }
)

export const advancedSearchProducts = createAsyncThunk(
  "products/advancedSearchProducts",
  async (data) => {
    const res = await axios.post(`${url}/advancedSearch`, { data });
    return res?.data.results;
  }
)

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    toggleSearchDropdown(state, action) {
      state.searchDropdownOpen = !state.searchDropdownOpen;
    },
    closeSearchDropdown(state, action) {
      state.searchDropdownOpen = false;
    },
    sortSearchResult(state, action) {

      if (action.payload === 'decrement') {
        state.results.sort((a, b) => a.name > b.name ? -1 : null);
      } else if (action.payload === 'increment') {
        state.results.sort((a, b) => a.name < b.name ? -1 : null);
      } else if (action.payload === 'asc-price') {
        state.results.sort((a, b) => a.price < b.price ? -1 : null);
      } else if (action.payload === 'desc-price') {
        state.results.sort((a, b) => a.price > b.price ? -1 : null);
      }

    },

    clearSearchResult(state, action) {
      state.results = []
    }
  },

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

    builder.addCase(advancedSearchProducts.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.results = action.payload;
    });
    builder.addCase(advancedSearchProducts.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  }
})

export const { toggleSearchDropdown, closeSearchDropdown, sortSearchResult, clearSearchResult } = searchSlice.actions;
export default searchSlice.reducer;