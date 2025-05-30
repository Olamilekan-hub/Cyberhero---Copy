const { createConnection } = require("./helpers/connection");
const Inventory = require("./models/inventory.model");

exports.handler = async (event, context) => {
  try {
    const { userID } = event.queryStringParameters;
    if (!userID) throw new Error("No userID included in request");

    await createConnection();
    const inventory = await Inventory.findOne({
      userID,
    });
    if (!inventory) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Inventory not found for that userID",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(inventory),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error.toString()),
    };
  }
};
