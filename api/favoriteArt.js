const { createConnection } = require("./helpers/connection");
const Art = require("./models/art.model");
const FavoriteArts = require("./models/favoriteArts.model");

exports.handler = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);
    await createConnection();

    // Check all vars needed are present
    const { userID, artID, addFavorite } = requestBody;
    if (!userID || !artID) {
      throw new Error("Invalid request body");
    }

    // update the art's favorite count. If addFavorite, add one, else subtract
    let originalArtResult = await Art.findByIdAndUpdate(
      artID,
      {
        $inc: { favorites: addFavorite ? 1 : -1 },
      },
      {
        new: true,
      }
    );
    if (!originalArtResult) {
      return {
        statusCode: 404,
        body: JSON.stringify({ msg: "No art listing found for that artID" }),
      };
    }

    // Add/Remove the art id to users favorite arts
    let favoriteResult = await FavoriteArts.findOneAndUpdate(
      {
        userID,
      },
      addFavorite
        ? { $push: { favorites: artID } }
        : { $pull: { favorites: artID } },
      {
        upsert: true,
        omitUndefined: true,
        new: true,
      }
    );
    if (!favoriteResult) throw new Error("Error modifying art favorites");

    return {
      statusCode: 200,
      body: JSON.stringify(favoriteResult),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.toString() }),
    };
  }
};
