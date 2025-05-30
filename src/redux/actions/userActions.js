const { createAsyncThunk, createAction } = require("@reduxjs/toolkit");
const { PostRequest } = require("../../utils/fetchFunctions");

const registerUser = createAsyncThunk("user/registerUser", async (payload) => {
  const url = `/.netlify/functions/register`;
  const response = await PostRequest(url, payload);
  return response;
});

const loginUser = createAsyncThunk("user/loginUser", async (payload) => {
  const url = `/.netlify/functions/login`;
  const response = await PostRequest(url, payload);
  return response;
});

const resendVerificationEmail = createAsyncThunk(
  "user/resendVerificationEmail",
  async (payload) => {
    const url = "/.netlify/functions/resend";
    const response = await PostRequest(url, payload);
    // console.log(response);
    return response.email;
  }
);

const verifyEmailToken = createAsyncThunk(
  "user/verifyEmailToken",
  async (payload) => {
    const url = "/.netlify/functions/verify";
    const response = await PostRequest(url, payload);
    // console.log(response);
    return response;
  }
);

const updateUserName = (body) => {
  return async () => {
    try {
      const url = `/.netlify/functions/updateUserName`;
      const response = await PostRequest(url, body);
      // console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const getUser = createAsyncThunk("user/getUser", async (payload) => {
  const url = "/.netlify/functions/getUser";
  const response = await PostRequest(url, payload);
  return response;
})
const setUser = createAction("user/setUser");
const logoutUser = createAction("user/logoutUser");

export {
  registerUser,
  loginUser,
  resendVerificationEmail,
  verifyEmailToken,
  getUser,
  setUser,
  logoutUser,
  updateUserName
};
