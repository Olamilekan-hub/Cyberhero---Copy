const { createConnection } = require("./helpers/connection");
const Art = require("./models/art.model");

exports.handler = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);
    await createConnection();

    // Check all vars needed are present
    const { userID, artID } = requestBody;
    if (!userID || !artID) {
      throw new Error("Invalid request body");
    }

    const result = await Art.findOneAndDelete({
      _id: artID,
      userID,
    });
    if (!result) {
      return {
        statusCode: 404,
        body: JSON.stringify({ msg: "No art found for given query" }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.toString() }),
    };
  }
};
