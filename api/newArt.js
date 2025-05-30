const { createConnection } = require("./helpers/connection");
const Art = require("./models/art.model");
const User = require("./models/user.model");

exports.handler = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);
    await createConnection();

    const user = await User.findById(requestBody.userID);
    // console.log(user);
    // Store art
    const art = await Art.create({
      userID: requestBody.userID,
      username: user?.username,
      content: requestBody.content,
      public: !!requestBody.public,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "Success" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
