const { createAsyncThunk } = require("@reduxjs/toolkit");
const { GetRequest, PostRequest } = require("../../utils/fetchFunctions");

const fetchProfile = createAsyncThunk(
  "progress/fetchProfile",
  async (userID) => {
    const url = `/.netlify/functions/getProfile?userID=${userID}`;
    const response = await GetRequest(url);
    // console.log(response);
    return response;
  }
);

const updateProfile = (body) => {
  return async () => {
    try {
      const url = `/.netlify/functions/updateProfile`;
      const response = await PostRequest(url, body);
      // console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  };
};


export { fetchProfile, updateProfile };
