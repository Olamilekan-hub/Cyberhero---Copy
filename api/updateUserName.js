const { createConnection } = require("./helpers/connection");
const Profile = require("./models/user.model");

exports.handler = async (event, context) => {
  try {
    const requestBody = JSON.parse(event.body);
    await createConnection();
    // console.log(requestBody);
    const { token } = requestBody;

    let result = await Profile.findOneAndUpdate(
      {
        token,
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
