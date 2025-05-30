const { createAsyncThunk } = require("@reduxjs/toolkit");
const { GetRequest } = require("../../utils/fetchFunctions");

const fetchAllMissions = createAsyncThunk("missions/fetchAll", async () => {
  const url = `/.netlify/functions/getAllMissions`;
  const response = await GetRequest(url);
  return response.missions;
});


export { fetchAllMissions };
