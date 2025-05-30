const { createConnection } = require("./helpers/connection");
const Achievement = require("./models/achievement.model");

exports.handler = async (event, context) => {
  try {
    await createConnection();
    const achievements = await Achievement.find({});
    return {
      statusCode: 200,
      body: JSON.stringify({ achievements }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
