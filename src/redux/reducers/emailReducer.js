// src/redux/reducers/emailReducer.js
import { createReducer } from "@reduxjs/toolkit";
import { updateEmailPreferences, sendNewsletter, getEmailStats } from "../actions/emailActions";

const initialState = {
  preferences: {
    isSubscribed: false,
    newFeatures: true,
    contentReleases: true,
    announcements: true,
    missionUpdates: true
  },
  stats: {
    totalSubscribers: 0,
    subscribedCount: 0,
    unsubscribedCount: 0
  },
  loading: false,
  error: null,
  message: null
};

const emailReducer = createReducer(initialState, {
  [updateEmailPreferences.fulfilled]: (state, action) => {
    state.loading = false;
    state.error = null;
    state.message = "Email preferences updated successfully";
  },
  [updateEmailPreferences.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
    state.message = null;
  },
  [updateEmailPreferences.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error.message;
    state.message = "Failed to update email preferences";
  },
  [sendNewsletter.fulfilled]: (state, action) => {
    state.loading = false;
    state.error = null;
    state.message = "Newsletter sent successfully";
  },
  [sendNewsletter.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
    state.message = null;
  },
  [sendNewsletter.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error.message;
    state.message = "Failed to send newsletter";
  },
  [getEmailStats.fulfilled]: (state, action) => {
    state.stats = action.payload;
    state.loading = false;
    state.error = null;
  },
  [getEmailStats.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [getEmailStats.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  }
});

export default emailReducer;