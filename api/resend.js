const { createConnection } = require("./helpers/connection");
const { sendVerificationEmail } = require("./helpers/email");
const User = require("./models/user.model");
const { createSecureResponse } = require("./helpers/security");
const { rateLimitMiddleware } = require("./helpers/rateLimiter");

const resendHandler = async (event, context) => {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return createSecureResponse(200, '');
    }

    const requestBody = JSON.parse(event.body);
    const { username, email } = requestBody;

    if (!username || !email) {
      return createSecureResponse(400, {
        message: "Username and email are required"
      });
    }

    // grab user
    await createConnection();
    const user = await User.findOne({
      username,
      email,
    });

    if (!user) {
      return createSecureResponse(404, {
        message: "No user found with that username and email combination"
      });
    }

    // Check if user is already verified
    if (user.verified) {
      return createSecureResponse(400, {
        message: "User account is already verified"
      });
    }

    // Send email
    await sendVerificationEmail(user._id, user.email);
    
    return createSecureResponse(200, {
      message: "Verification email resent successfully",
      email: email,
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    return createSecureResponse(500, {
      message: "Internal server error"
    });
  }
};

exports.handler = rateLimitMiddleware('email')(resendHandler);