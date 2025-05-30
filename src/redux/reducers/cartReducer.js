import { createReducer } from "@reduxjs/toolkit";
import { setCart, clearCart } from "../actions/cartActions";

const initialState = {
  cart: [],
  loading: false,
  error: null,
};

const cartReducer = createReducer(initialState, (builder) => {
  // Sets cart equal to payload
  builder.addCase(setCart, (state, action) => {
    state.cart = action.payload;
  });
  // Clear cart
  builder.addCase(clearCart, (state) => {
    state.cart = [];
  });
});

export default cartReducer;
