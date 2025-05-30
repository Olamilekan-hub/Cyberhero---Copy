import { createReducer } from "@reduxjs/toolkit";
import { fetchAllNews } from "../actions/newsActions";

const initialState = {
  news: [],
  loading: false,
  error: null,
};
const newsReducer = createReducer(initialState, {
  [fetchAllNews.fulfilled]: (state, action) => {
    state.news = action.payload;
    state.loading = false;
    state.error = null;
  },
  [fetchAllNews.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [fetchAllNews.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error;
  },
});

export default newsReducer;
