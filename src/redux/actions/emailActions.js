// src/redux/actions/emailActions.js
const { createAsyncThunk } = require("@reduxjs/toolkit");
const { PostRequest, GetRequest } = require("../../utils/fetchFunctions");

const updateEmailPreferences = createAsyncThunk(
  "email/updatePreferences",
  async (payload) => {
    const url = `/.netlify/functions/updateEmailPreferences`;
    const response = await PostRequest(url, payload);
    return response;
  }
);

const sendNewsletter = createAsyncThunk(
  "email/sendNewsletter",
  async (payload) => {
    const url = `/.netlify/functions/sendNewsletter`;
    const response = await PostRequest(url, payload);
    return response;
  }
);

const getEmailStats = createAsyncThunk(
  "email/getStats",
  async () => {
    const url = `/.netlify/functions/getEmailStats`;
    const response = await GetRequest(url);
    return response;
  }
);

export { updateEmailPreferences, sendNewsletter, getEmailStats };