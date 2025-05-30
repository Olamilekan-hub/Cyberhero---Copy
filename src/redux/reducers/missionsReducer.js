import { createReducer } from "@reduxjs/toolkit";
import { fetchAllMissions } from "../actions/missionsActions";

const initialState = {
  missions: [],
  loading: false,
  error: null,
};
const missionsReducer = createReducer(initialState, {
  [fetchAllMissions.fulfilled]: (state, action) => {
    state.missions = action.payload;
    state.loading = false;
    state.error = null;
  },
  [fetchAllMissions.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [fetchAllMissions.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error;
  },
});

export default missionsReducer;
