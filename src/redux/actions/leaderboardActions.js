const { createAsyncThunk } = require("@reduxjs/toolkit");
const { GetRequest, PostRequest } = require("../../utils/fetchFunctions");

const fetchLeaderboards = createAsyncThunk(
  "leaderboards/fetchLeaderboards",
  async () => {
    const url = `/.netlify/functions/getLeaderboards`;
    const response = await GetRequest(url);
    // console.log(response);
    return response.leaderboards;
  }
);

const getLeaderboardPosition = createAsyncThunk(
  "leaderboards/getLeaderboardPosition",
  async (userID) => {
    const url = `/.netlify/functions/getLeaderboardPosition?userID=${userID}`;
    const response = await GetRequest(url);
    return response.userRank;
  }
);

const addLeaderBoard = createAsyncThunk(
  "leaderboards/addLeaderBoard",
  async (payload) => {
    const url = `/.netlify/functions/syncLeaderboards`;
    const response = await PostRequest(url, payload);
    return response;
  }
);

export { fetchLeaderboards, getLeaderboardPosition, addLeaderBoard };
