const { createAsyncThunk } = require("@reduxjs/toolkit");
const { GetRequest } = require("../../utils/fetchFunctions");

const fetchAllAvatars = createAsyncThunk("avatars/fetchAll", async () => {
  const url = `/.netlify/functions/getAllAvatars`;
  const response = await GetRequest(url);
  return response;
});

export { fetchAllAvatars };
