const { createAsyncThunk } = require("@reduxjs/toolkit");
const { GetRequest, PostRequest } = require("../../utils/fetchFunctions");

const fetchAllProgress = createAsyncThunk(
  "progress/fetchProgress",
  async (userID) => {
    const url = `/.netlify/functions/getAllProgress?userID=${userID}`;
    const response = await GetRequest(url);
    return response.missionProgress;
  }
);

const updateProgress = (body) => {
  return async () => {
    try {
      const url = `/.netlify/functions/updateProgress`;
      const response = await PostRequest(url, body);
      // console.log(response);
      return response.result;
    } catch (error) {
      throw error;
    }
  };
};
export { fetchAllProgress, updateProgress };
