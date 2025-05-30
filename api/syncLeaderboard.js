const { createConnection } = require("./helpers/connection");
const Achievement = require("./models/achievement.model");
const Leaderboard = require("./models/leaderboard.model");

exports.handler = async () => {
  try {
    await createConnection();

    // Get sorted by XP array
    await Achievement.createIndexes({ xp: 1 });
    const achievements = await Achievement.find().sort({ xp: -1 });
    console.log(achievements);

    // Add rankings to array objects for placement number
    const userRankings = addRanking(achievements);
    console.log(userRankings);

    // Wipe leaderboard, and replace with new
    await Leaderboard.deleteMany();
    const result = await Leaderboard.insertMany(userRankings);
    console.log("syncLeaderboard final result:", result);

    return {
      statusCode: 200,
      body: JSON.stringify({ result }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
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
    // console.log('newObj', newObj);
    returnArr.push(newObj);
    rank++;
  });
  return returnArr;
};
