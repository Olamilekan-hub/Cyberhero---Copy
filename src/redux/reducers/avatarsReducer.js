import { createReducer } from "@reduxjs/toolkit";
import { fetchAllAvatars } from "../actions/avatarsActions";

const initialState = {
  avatars: [],
  loading: false,
  error: null,
};
const avatarsReducer = createReducer(initialState, {
  [fetchAllAvatars.fulfilled]: (state, action) => {
    state.avatars = action.payload;
    state.loading = false;
    state.error = null;
  },
  [fetchAllAvatars.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [fetchAllAvatars.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error;
  },
});

export default avatarsReducer;
