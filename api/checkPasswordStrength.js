const passwordPolicy = require("./helpers/passwordPolicy");
const { createSecureResponse } = require("./helpers/security");
const { rateLimitMiddleware } = require("./helpers/rateLimiter");

const passwordStrengthHandler = async (event, context) => {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return createSecureResponse(200, '');
    }

    let requestBody;
    try {
      requestBody = JSON.parse(event.body);
    } catch (error) {
      return createSecureResponse(400, { 
        message: "Invalid JSON format" 
      });
    }

    const { password, userInfo = {} } = requestBody;

    if (!password) {
      return createSecureResponse(400, {
        message: "Password is required"
      });
    }

    const validation = passwordPolicy.validatePassword(password, userInfo);
    const strengthIndicator = passwordPolicy.getStrengthIndicator(validation.score);

    return createSecureResponse(200, {
      isValid: validation.isValid,
      score: validation.score,
      strength: validation.strength,
      requirements: validation.requirements,
      feedback: validation.feedback,
      errors: validation.errors,
      indicator: strengthIndicator
    });

  } catch (error) {
    console.error('Password strength check error:', error);
    return createSecureResponse(500, {
      message: "Internal server error"
    });
  }
};

exports.handler = rateLimitMiddleware('password')(passwordStrengthHandler);