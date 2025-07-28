import { createReducer } from "@reduxjs/toolkit";
import { fetchProfile } from "../actions/profileActions";

const initialState = {
  data: {
    bio: "Mission:Gaia in training!",
    avatarID: undefined,
  },
  loading: false,
  error: null,
};

const userReducer = createReducer(initialState, {
  [fetchProfile.fulfilled]: (state, action) => {
    state.data = action.payload;
    state.loading = false;
    state.error = null;
  },
  [fetchProfile.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [fetchProfile.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error;
  },
});

export default userReducer;
