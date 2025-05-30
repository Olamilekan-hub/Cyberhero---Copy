const { createAsyncThunk } = require("@reduxjs/toolkit");
const { GetRequest } = require("../../utils/fetchFunctions");

const fetchAllPages = createAsyncThunk("pages/fetchPages", async () => {
  const url = `/.netlify/functions/getAllPages`;
  const response = await GetRequest(url);
  return response.pages;
});
export { fetchAllPages };
