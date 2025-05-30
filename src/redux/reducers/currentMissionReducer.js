import { createReducer } from "@reduxjs/toolkit";
import { setCurrentMission } from "../actions/currentMissionAction";
const initialState = {
  currentMission: null,
};

const missionReducer = createReducer(initialState, (builder) => {
  builder.addCase(setCurrentMission, (state, action) => {
    state.currentMission = action.payload;
  });
});

export default missionReducer;
