import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import productReducer, { productsFetch } from './features/productSlice';
import cartReducer from './features/cartSlice';
import { productsApi } from './features/productsApi';
import categoryReducer, { categoriesFetch } from './features/categoriesSlice';

import authReducer, { loadUser } from './features/authSlice';
import searchReducer from './features/searchSlice';
import favoriteReducer from './features/favoriteSlice';
import rateReducer from './features/rateSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
    categories: categoryReducer,
    auth: authReducer,
    search: searchReducer,
    favorite: favoriteReducer,
    rate: rateReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  }
})


store.dispatch(productsFetch())
store.dispatch(categoriesFetch())
store.dispatch(loadUser())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

