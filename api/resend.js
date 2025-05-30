const { createConnection } = require("./helpers/connection");
const { sendVerificationEmail } = require("./helpers/email");
const User = require("./models/user.model");

exports.handler = async (event, context) => {
  try {
    const requestBody = JSON.parse(event.body);
    const { username, email } = requestBody;

    // grab user
    await createConnection();
    const user = await User.findOne({
      username,
      email,
    });
    console.log("user found:", user);
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify("No user found"),
      };
    }

    // Send email
    await sendVerificationEmail(user._id, user.email);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "success",
        email: email,
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
