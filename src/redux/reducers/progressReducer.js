import { createReducer } from "@reduxjs/toolkit";
import { fetchAllProgress } from "../actions/progressActions";

const initialState = {
  progress: [],
  loading: false,
  error: null,
};
const progressReducer = createReducer(initialState, {
  [fetchAllProgress.fulfilled]: (state, action) => {
    state.progress = action.payload;
    state.loading = false;
    state.error = null;
  },
  [fetchAllProgress.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [fetchAllProgress.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error;
  },
  // Not going to update state with fulfilled on this one,
  // going to refetch all progress and achievements
  // [updateProgress.fulfilled]: (state, action) => {
  //   // state.progress = action.payload;
  //   state.loading = false;
  //   state.error = null;
  // },
  // [updateProgress.pending]: (state, action) => {
  //   state.loading = true;
  //   state.error = null;
  // },
  // [updateProgress.rejected]: (state, action) => {
  //   state.loading = false;
  //   state.error = action.error;
  // },
});

export default progressReducer;
