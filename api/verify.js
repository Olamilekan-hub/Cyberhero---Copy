const { createConnection } = require("./helpers/connection");
const User = require("./models/user.model");
const Token = require("./models/token.model");

exports.handler = async (event, context) => {
  try {
    const requestBody = JSON.parse(event.body);
    const { token } = requestBody;

    await createConnection();
    const tokenUser = await Token.findOne({
      token,
    });
    if (!tokenUser) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "No user found",
        }),
      };
    }

    const result = await User.findOneAndUpdate(
      {
        _id: tokenUser.userID,
      },
      { verified: true }
    );
    console.log("found user result:", result);
    if (!result) {
      return {
        statusCode: 404,
        body: JSON.stringify("Failure to validate"),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "success",
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
