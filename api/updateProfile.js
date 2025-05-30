const { createConnection } = require("./helpers/connection");
const Profile = require("./models/profile.model");

exports.handler = async (event, context) => {
  try {
    const requestBody = JSON.parse(event.body);
    await createConnection();
    // console.log(requestBody);
    const { userID } = requestBody;
    if (!userID) throw new Error("userID not included");

    let result = await Profile.findOneAndUpdate(
      {
        userID,
      },
      requestBody,
      {
        upsert: true,
        setDefaultsOnInsert: true,
        omitUndefined: true,
        new: true,
      }
    );
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.log("error", error);
    return {
      statusCode: 500,
      body: JSON.stringify(error.toString()),
    };
  }
};
