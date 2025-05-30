const sgMail = require("@sendgrid/mail");
const Token = require("../models/token.model");
const { createConnection } = require("./connection");
const crypto = require("crypto");

const sendVerificationEmail = async (userID, userEmail) => {
  try {
    const { SENDGRID_API_KEY, EMAIL_LINK_URL, LOCALHOST_EMAIL } = process.env;
    // Create Token
    await createConnection();
    const { token } = await Token.findOneAndUpdate(
      { userID },
      {
        userID,
        token: crypto.randomBytes(16).toString("hex"),
      },
      {
        upsert: true,
        setDefaultsOnInsert: true,
        omitUndefined: true,
        new: true,
      }
    );
    // console.log(token);
    console.log("userEmail is", userEmail);
    // Send email
    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
      to:
        LOCALHOST_EMAIL === "true"
          ? process.env.SERVER_URL
          : userEmail || process.env.SERVER_URL,
      // Change the from below according to SendGrid's valid domain
      from: process.env.SERVER_URL,
      subject: "Mission: G.A.I.A. Email Verification",
      text: `Are you ready to begin your adventure? Click here to verify your account: ${
        EMAIL_LINK_URL + token
      }`,
      html:
        "<p>Are you ready to begin your adventure?</p>" +
        "<br />" +
        `<a href="${
          EMAIL_LINK_URL + token
        }">Click here to verify your account</a>`,
    };
    console.log("sending email to", msg.to);

    return await sgMail.send(msg);
  } catch (error) {
    console.error("error occured", error);

    if (error.response) {
      console.error("error:", error.response.body);
    }
    throw error;
  }
};

module.exports = { sendVerificationEmail };
