const { createConnection } = require("./helpers/connection");
const User = require("./models/user.model");
const bcrypt = require("bcrypt");
const { createJWT } = require("./helpers/auth");

exports.handler = async (event, context) => {
  try {
    const requestBody = JSON.parse(event.body);
    await createConnection();

    // Find user
    const user = await User.findOne({
      username: requestBody.username,
    });
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Username does not exist" }),
      };
    }

    // Check passwords match
    const match = await bcrypt.compare(requestBody.password, user.password);
    if (!match) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid Password" }),
      };
    }

    // Check email is verified
    if (!user.verified) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Account not verified",
          email: user.email,
        }),
      };
    }

    // Generate JWT
    const token = createJWT({ username: user.username });
    await User.findByIdAndUpdate(user._id, { $set: { token } });
    return {
      statusCode: 200,
      body: JSON.stringify({
        token,
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
