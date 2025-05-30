const { createConnection } = require("./helpers/connection");
const Art = require("./models/art.model");

exports.handler = async (event, context) => {
  try {
    const requestBody = JSON.parse(event.body);
    await createConnection();
    const { isPublic, _id } = requestBody;
    if (!_id) {
      throw new Error("Invalid request body");
    }
    let result = await Art.findOneAndUpdate(
      {
        _id,
      },
      {
        public: !!isPublic,
      },
      {
        new: true,
      }
    );
    if (!result) {
      return {
        statusCode: 404,
        body: JSON.stringify({ msg: "No art listing found for that _id" }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ result }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.toString() }),
    };
  }
};
