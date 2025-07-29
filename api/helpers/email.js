const sgMail = require("@sendgrid/mail");
const Token = require("../models/token.model");
const { createConnection } = require("./connection");
const envValidator = require("./envValidator");
const crypto = require("crypto");



const sendVerificationEmail = async (userID, userEmail) => {
  try {
    envValidator.validateRequired();

    const { SENDGRID_API_KEY, EMAIL_LINK_URL, LOCALHOST_EMAIL, SERVER_URL } = process.env;

    // Better API key validation
    if (!SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY environment variable is missing');
    }

    if (!SENDGRID_API_KEY.startsWith('SG.')) {
      throw new Error('Invalid SendGrid API key format');
    }

    if (!EMAIL_LINK_URL) {
      throw new Error('EMAIL_LINK_URL environment variable is missing');
    }

    if (!SERVER_URL) {
      throw new Error('SERVER_URL environment variable is missing');
    }

    // Create Token
    await createConnection();
    const tokenDoc = await Token.findOneAndUpdate(
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

    console.log("userEmail is", userEmail);

    // Set API key before creating message
    sgMail.setApiKey(SENDGRID_API_KEY);

    // Create the email message
    const msg = {
      to: LOCALHOST_EMAIL === "true" ? SERVER_URL : userEmail,
      from: {
        email: SERVER_URL,
        name: "Mission G.A.I.A."
      },
      subject: "Mission: G.A.I.A. Email Verification - Your Adventure Awaits! 🚀",
      text: `Welcome to Mission: G.A.I.A.! 

Are you ready to begin your adventure? 

To activate your account, please click the following link to verify your email address:
${EMAIL_LINK_URL}${tokenDoc.token}

This verification link will expire in 24 hours for your security.

If you didn't create an account with Mission: G.A.I.A., please ignore this email.

Welcome aboard!
The Mission: G.A.I.A. Team`,
      html: htmlTemplate, // Your existing HTML template
      tracking_settings: {
        click_tracking: {
          enable: false,
        },
      },
    };

    // Send the email
    const result = await sgMail.send(msg);
    console.log('Email sent successfully:', result[0].statusCode);
    return result;

  } catch (error) {
    // Enhanced error logging
    console.error('Email Error:', {
      message: error.message,
      code: error.code,
      response: error.response?.body || 'No response body'
    });

    // If it's a SendGrid authentication error, provide specific guidance
    if (error.code === 401 || error.message.includes('Unauthorized')) {
      throw new Error('Email service configuration error: Invalid API key. Please check SENDGRID_API_KEY in environment variables.');
    }

    // Sanitize other errors
    const sanitizedError = envValidator.getSanitizedError(error, 'Email service error');
    throw new Error(sanitizedError);
  }
};

module.exports = { sendVerificationEmail };