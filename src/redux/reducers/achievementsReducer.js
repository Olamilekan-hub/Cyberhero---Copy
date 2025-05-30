import { createReducer } from "@reduxjs/toolkit";
import { fetchAchievements } from "../actions/achievementsActions";

const initialState = {
  achievement: 0,
  loading: false,
  error: null,
};
const achievementsReducer = createReducer(initialState, {
  [fetchAchievements.fulfilled]: (state, action) => {
    state.achievement = action.payload;
    state.loading = false;
    state.error = null;
  },
  [fetchAchievements.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [fetchAchievements.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error;
  },
});

export default achievementsReducer;
