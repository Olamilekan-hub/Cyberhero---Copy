import { createReducer } from "@reduxjs/toolkit";
import {
  fetchLeaderboards,
  getLeaderboardPosition,
} from "../actions/leaderboardActions";

const initialState = {
  topTen: [],
  userRank: 0,
  loading: false,
  error: null,
};
const userReducer = createReducer(initialState, {
  [fetchLeaderboards.fulfilled]: (state, action) => {
    state.topTen = action.payload;
    state.loading = false;
    state.error = null;
  },
  [fetchLeaderboards.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [fetchLeaderboards.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error;
  },
  [getLeaderboardPosition.fulfilled]: (state, action) => {
    state.userRank = action.payload;
    state.loading = false;
    state.error = null;
  },
  [getLeaderboardPosition.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [getLeaderboardPosition.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error;
  },
});

export default userReducer;
