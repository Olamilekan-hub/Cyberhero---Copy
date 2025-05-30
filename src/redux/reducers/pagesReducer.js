import { createReducer } from "@reduxjs/toolkit";
import { fetchAllPages } from "../actions/pagesActions";

const initialState = {
  pages: [],
  loading: false,
  error: null,
};
const pagesReducer = createReducer(initialState, {
  [fetchAllPages.fulfilled]: (state, action) => {
    state.pages = action.payload;
    state.loading = false;
    state.error = null;
  },
  [fetchAllPages.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [fetchAllPages.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error;
  },
});

export default pagesReducer;
