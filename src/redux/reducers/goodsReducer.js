import { createReducer } from "@reduxjs/toolkit";
import { fetchAllGoods } from "../actions/goodsActions";

const initialState = {
  adoptables: [],
  currencies: [],
  loading: false,
  error: null,
};

const goodsReducer = createReducer(initialState, {
  [fetchAllGoods.fulfilled]: (state, action) => {
    state.adoptables = action.payload.adoptables;
    state.currencies = action.payload.currencies;
    state.loading = false;
    state.error = null;
  },
  [fetchAllGoods.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [fetchAllGoods.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error;
  },
});

export default goodsReducer;
