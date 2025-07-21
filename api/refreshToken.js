const { JWTManager } = require("./helpers/auth");
const { createSecureResponse } = require("./helpers/security");
const { rateLimitMiddleware } = require("./helpers/rateLimiter");

const refreshTokenHandler = async (event, context) => {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return createSecureResponse(200, '');
    }

    // Parse request body
    let requestBody;
    try {
      requestBody = JSON.parse(event.body);
    } catch (error) {
      return createSecureResponse(400, { 
        message: "Invalid JSON format" 
      });
    }

    const { refreshToken } = requestBody;

    if (!refreshToken) {
      return createSecureResponse(400, {
        message: "Refresh token is required"
      });
    }

    // Refresh the token pair
    const newTokens = await JWTManager.refreshTokenPair(refreshToken);

    return createSecureResponse(200, {
      message: "Tokens refreshed successfully",
      tokens: newTokens
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    
    // Return appropriate error based on the failure type
    if (error.message.includes('expired') || error.message.includes('invalid')) {
      return createSecureResponse(401, {
        message: "Invalid or expired refresh token",
        requiresLogin: true
      });
    }

    return createSecureResponse(500, {
      message: "Internal server error"
    });
  }
};

exports.handler = rateLimitMiddleware('token')(refreshTokenHandler);