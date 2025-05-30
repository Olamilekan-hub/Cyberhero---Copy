const { createAsyncThunk } = require("@reduxjs/toolkit");
const { GetRequest } = require("../../utils/fetchFunctions");

const fetchAllBackgroundImages = createAsyncThunk(
  "backgroundImages/fetchAll",
  async () => {
    const url = `/.netlify/functions/getAllBGImages`;
    const response = await GetRequest(url);
    return response;
  }
);

export { fetchAllBackgroundImages };
