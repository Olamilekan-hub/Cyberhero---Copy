import { createReducer } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  resendVerificationEmail,
  verifyEmailToken,
  getUser,
  setUser,
  logoutUser,
} from "../actions/userActions";

const initialState = {
  data: {
    token: null,
    userID: null,
    username: null,
    email: null,
  },
  loading: false,
  error: null,
};

const userReducer = createReducer(initialState, {
  [registerUser.fulfilled]: (state, action) => {
    state.loading = false;
    state.error = null;
  },
  [registerUser.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [registerUser.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error;
  },
  [loginUser.fulfilled]: (state, action) => {
    state.data.email = action.payload.email;
    state.data.userID = action.payload.userID;
    state.data.username = action.payload.username;
    state.data.token = action.payload.token;
    state.loading = false;
    state.error = null;
    localStorage.setItem("user", {
      token: action.payload.token,
      userID: action.payload.userID,
      username: action.payload.username,
      email: action.payload.email,
    });
  },
  [loginUser.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [loginUser.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error;
  },
  [resendVerificationEmail.fulfilled]: (state, action) => {
    state.loading = false;
    state.error = null;
  },
  [resendVerificationEmail.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [resendVerificationEmail.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error;
  },
  [verifyEmailToken.fulfilled]: (state, action) => {
    state.loading = false;
    state.error = null;
  },
  [verifyEmailToken.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [verifyEmailToken.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error;
  },
  [setUser]: (state, action) => {
    state.data = action.payload;
  },
  [logoutUser]: (state, action) => {
    state = initialState;
  },
  [getUser.fulfilled]: (state, action) => {
    state.data.userID = action.payload.userID;
    state.data.username = action.payload.username;
    state.loading = false;
    state.error = null;
  },
  [getUser.pending]: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  [getUser.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.error;
  },
});

export default userReducer;
