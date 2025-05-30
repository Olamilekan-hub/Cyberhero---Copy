const mailchimp = require("@mailchimp/mailchimp_marketing");

const { MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, MAILCHIMP_AUDIENCE_ID } =
  process.env;

if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER_PREFIX || !MAILCHIMP_AUDIENCE_ID) {
  throw new Error(
    "Mailchimp API key and server prefix must be set in environment variables"
  );
}

mailchimp.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_SERVER_PREFIX,
});

const addSubscriber = async (email) => {
  try {
    const response = await mailchimp.lists.addListMember(
      MAILCHIMP_AUDIENCE_ID,
      {
        email_address: email,
        status: "subscribed",
      }
    );
    return response;
  } catch (error) {
    console.error("Error adding subscriber:", error);
    throw error;
  }
};

module.exports = { addSubscriber };
