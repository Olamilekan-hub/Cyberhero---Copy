const { createAsyncThunk } = require("@reduxjs/toolkit");
const { GetRequest } = require("../../utils/fetchFunctions");

const fetchAllGoods = createAsyncThunk("goods/fetchAll", async () => {
  const url = `/.netlify/functions/getAllDigitalGoods`;
  const response = await GetRequest(url);
//   console.log(response);
  return response;
});

export { fetchAllGoods };
