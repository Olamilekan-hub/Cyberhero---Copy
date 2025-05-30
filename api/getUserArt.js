const { createConnection } = require("./helpers/connection");
const Art = require("./models/art.model");

exports.handler = async (event, context) => {
  try {
    const { userID } = event.queryStringParameters;
    if (!userID) throw new Error("No userID included in request");

    await createConnection();
    const art = await Art.find({
      userID,
    });
    // console.log(art);

    return {
      statusCode: 200,
      body: JSON.stringify(art),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
