const { createAsyncThunk } = require("@reduxjs/toolkit");
const { GetRequest } = require("../../utils/fetchFunctions");

const fetchAchievements = createAsyncThunk(
  "achievements/fetchAchievements",
  async () => {
    const url = `/.netlify/functions/getAchievements`;
    const response = await GetRequest(url);
    return response.achievements;
  }
);

export { fetchAchievements };
