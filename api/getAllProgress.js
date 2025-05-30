const { createConnection } = require("./helpers/connection");
const Progress = require("./models/progress.model");

exports.handler = async (event, context) => {
  try {
    const { userID } = event.queryStringParameters;
    if (!userID) throw new Error("No userID included in request");

    await createConnection();
    const missionProgress = await Progress.find({
      userID,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ missionProgress }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
