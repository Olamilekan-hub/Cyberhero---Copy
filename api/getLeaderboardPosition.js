const { createConnection } = require("./helpers/connection");
const Leaderboard = require("./models/leaderboard.model");

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { userID } = event.queryStringParameters;
    if (!userID) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "No userID included in request" }),
      };
    }

    await createConnection();

    const userRank = await Leaderboard.findOne({
      userID,
    });
    if (!userRank) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "userID not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ userRank: userRank.rank || "N/A" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
