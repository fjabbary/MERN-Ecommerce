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
    },

    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      toast.error(`All items in the cart cleared!`, {
        position: "bottom-left"
      })
    },

    removeCartItem(state, action) {
      const { id, name } = action.payload;
      const foundIndex = state.cartItems.findIndex((item) => item.id === id);
      state.cartItems.splice(foundIndex, 1);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      toast.error(`${name} removed from the cart`, {
        position: "bottom-left"
      })
    },

    changeCartItemQuantity(state, action) {
      const { id, direction } = action.payload;
      const foundIndex = state.cartItems.findIndex((item) => item.id === id);

      if (direction === "inc") {
        state.cartItems[foundIndex].quantity += 1
      }
      if (direction === "dec") {
        state.cartItems[foundIndex].quantity -= 1
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    calcCartTotalQuantity(state, action) {
      state.cartTotalQty = state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },

    calcCartTotalamount(state, action) {
      state.cartTotalAmount = state.cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
    }

  }

})



export const { addToCart, toggleCartDropdown, closeCartDropdown, clearCart, removeCartItem, changeCartItemQuantity, calcCartTotalQuantity, calcCartTotalamount } = cartSlice.actions;
export default cartSlice.reducer;