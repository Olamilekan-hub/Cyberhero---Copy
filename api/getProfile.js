const { createConnection } = require("./helpers/connection");
const Profile = require("./models/profile.model");

exports.handler = async (event, context) => {
  try {
    const { userID } = event.queryStringParameters;
    if (!userID) throw new Error("No userID included in request");

    await createConnection();
    const profile = await Profile.findOne({
      userID,
    });
    if (!profile) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Profile not found for that userID",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        bio: profile.bio,
        avatarID: profile.avatarID,
        petID: profile.petID,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.toString()),
    };
  }
};
