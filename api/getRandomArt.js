const { createConnection } = require("./helpers/connection");
const Art = require("./models/art.model");

exports.handler = async (event, context) => {
  try {
    await createConnection();

    let arts = [];
    const results = Art.aggregate([
      { $match: { public: true } },
      { $sample: { size: 100 } },
    ]);
    for await (const item of results) {
      if (arts.includes(item)) return;
      arts.push(item);
    }
    return {
      statusCode: 200,
      body: JSON.stringify(arts),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
