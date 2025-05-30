import { createAction } from "@reduxjs/toolkit";

const setCart = createAction("cart/set");
const clearCart = createAction("cart/clear");

export { setCart, clearCart };
