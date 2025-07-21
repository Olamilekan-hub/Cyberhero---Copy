const { createConnection } = require("./helpers/connection");
const Achievement = require("./models/achievement.model");
const Leaderboard = require("./models/leaderboard.model");
const { createSecureResponse } = require("./helpers/security");
const { rateLimitMiddleware } = require("./helpers/rateLimiter");

const syncLeaderboardHandler = async (event, context) => {
  try {
    await createConnection();

    // Get sorted by XP array
    await Achievement.createIndexes({ xp: 1 });
    const achievements = await Achievement.find().sort({ xp: -1 });

    // Add rankings to array objects for placement number
    const userRankings = addRanking(achievements);

    // Wipe leaderboard, and replace with new
    await Leaderboard.deleteMany();
    const result = await Leaderboard.insertMany(userRankings);

    return createSecureResponse(200, { 
      message: "Leaderboard synchronized successfully",
      count: result.length 
    });
  } catch (error) {
    console.error('Sync leaderboard error:', error);
    return createSecureResponse(500, {
      message: "Internal server error"
    });
  }
};

const addRanking = (arr) => {
  let rank = 1;
  let returnArr = [];
  arr.forEach((item) => {
    const newObj = {
      ...item._doc,
      rank,
    };
    returnArr.push(newObj);
    rank++;
  });
  return returnArr;
};

exports.handler = rateLimitMiddleware('heavy')(syncLeaderboardHandler);