const { createAsyncThunk } = require("@reduxjs/toolkit");
const { GetRequest } = require("../../utils/fetchFunctions");

const fetchAllNews = createAsyncThunk("news/fetchAll", async () => {
  const url = `/.netlify/functions/getAllNews`;
  const response = await GetRequest(url);
  return response.news;
});

export { fetchAllNews };
