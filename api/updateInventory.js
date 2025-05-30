const { createConnection } = require("./helpers/connection");
const Inventory = require("./models/inventory.model");

exports.handler = async (event, context) => {
  try {
    const requestBody = JSON.parse(event.body);
    await createConnection();
    // console.log(requestBody);
    const { userID, itemID } = requestBody;
    if (!userID) throw new Error("userID not included");
    if (!itemID) throw new Error("itemID not included");

    let inventoryResult = await Inventory.findOneAndUpdate(
      {
        userID,
      },
      { $addToSet: { inventory: itemID } },
      {
        upsert: true,
        omitUndefined: true,
        new: true,
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(inventoryResult),
    };
  } catch (error) {
    console.log("error", error);
    return {
      statusCode: 500,
      body: JSON.stringify(error.toString()),
    };
  }
};
