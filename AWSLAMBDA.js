const https = require("https");

// TODO You need to create an AWS account and then paste this into a lambda function
// or use whatever platform you want to handle cron jobs (serverless.com works well too)
// This will trigger the leaderboard sync function so that leaderboards are updated every 10-15 minutes
// (Whatever you set the cron as)
// This function will cover prod, change prod to test in the baseURL for the test database
exports.handler = async (event) => {
  let dataString = "";
  const baseURL = "https://prod-cyberheroes.netlify.app/.netlify/functions";

  const response = await new Promise((resolve, reject) => {
    const req = https.get(`${baseURL}/syncLeaderboard`, function (res) {
      res.on("data", (chunk) => {
        // console.log('chunk', chunk);
        dataString += chunk;
      });
      res.on("end", () => {
        const data = JSON.stringify(JSON.parse(dataString), null, 4);
        // console.log('cron success', data);
        resolve({
          statusCode: 200,
          body: data,
        });
      });
    });

    req.on("error", (e) => {
      console.log("cron failure", e);
      reject({
        statusCode: 500,
        body: "Something went wrong!",
      });
    });
  });
  return response;
};
