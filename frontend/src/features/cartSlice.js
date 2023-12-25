import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalQty: 0,
  cartTotalAmount: 0
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingCartItem = state.cartItems.find((item) => item.id === action.payload.id);
      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        const tempProduct = { ...action.payload, quantity: 1 }
        state.cartItems.push(tempProduct);
      }

    }
  }

})



export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;