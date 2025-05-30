import { createReducer } from "@reduxjs/toolkit";
import { fetchAllBackgroundImages } from "../actions/backgroundImageActions";
const initialState = {
  assets: [],
  loading: false,
  error: null,
};
const backgroundImagesReducer = createReducer(initialState, {
  [fetchAllBackgroundImages.fulfilled]: (state, action) => {
    state.backgroundImages = action.payload;
    state.loading = false;
    state.error = null;
  },
  [fetchAllBackgroundImages.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [fetchAllBackgroundImages.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error;
  },
});

export default backgroundImagesReducer;
