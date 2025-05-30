const { createConnection } = require("./helpers/connection");
const User = require("./models/user.model");

exports.handler = async (event, context) => {
  try {
    const requestBody = JSON.parse(event.body);
    await createConnection();

    // Find user
    const user = await User.findOne({
      _id: requestBody,
    });
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "UserID does not exist" }),
      };
    }
    console.log("Frome DB", user.username)
    return {
      statusCode: 200,
      body: JSON.stringify({
        userID: user._id,
        username: user.username,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
