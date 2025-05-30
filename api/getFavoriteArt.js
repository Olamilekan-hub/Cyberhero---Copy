const { createConnection } = require("./helpers/connection");
const FavoriteArts = require("./models/favoriteArts.model");

exports.handler = async (event, context) => {
  try {
    const { userID } = event.queryStringParameters;
    if (!userID) throw new Error("No userID included in request");

    await createConnection();
    const favoriteArts = await FavoriteArts.findOne({
      userID,
    });
    if (!favoriteArts) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "FavoriteArt not found for that userID",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(favoriteArts.favorites),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
