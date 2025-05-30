import { createReducer } from "@reduxjs/toolkit";
import { setCurrentBG } from "../actions/currentBGAction";
const initialState = {
  currentBG: null,
};

const currentBGReducer = createReducer(initialState, (builder) => {
  builder.addCase(setCurrentBG, (state, action) => {
    state.currentBG = action.payload;
  });
});

export default currentBGReducer;
