const { createConnection } = require("./helpers/connection");
const Leaderboard = require("./models/leaderboard.model");

exports.handler = async (event, context) => {
  try {
    await createConnection();

    const leaderboards = await Leaderboard.find(
      {},
      { username: 1, xp: 1, rank: 1 }
    ).limit(10);

    return {
      statusCode: 200,
      body: JSON.stringify({ leaderboards }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
