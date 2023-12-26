import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  cartTotalQty: 0,
  cartTotalAmount: 0,
  isCartOpen: false
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingCartItem = state.cartItems.find((item) => item.id === action.payload.id);
      if (existingCartItem) {
        existingCartItem.quantity += 1;
        toast.info(`Increased quantity of ${action.payload.name}`, {
          position: "bottom-left"
        })
      } else {
        const tempProduct = { ...action.payload, quantity: 1 }
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added to the cart`, {
          position: "bottom-left"
        })
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    toggleCartDropdown(state, action) {
      state.isCartOpen = !state.isCartOpen;
    },

    closeCartDropdown(state, action) {
      state.isCartOpen = false;
    }



  }

})



export const { addToCart, toggleCartDropdown, closeCartDropdown } = cartSlice.actions;
export default cartSlice.reducer;