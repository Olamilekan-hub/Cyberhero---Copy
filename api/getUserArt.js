const { createConnection } = require("./helpers/connection");
const Art = require("./models/art.model");
const { createSecureResponse } = require("./helpers/security");
const AuthMiddleware = require("./helpers/authMiddleware");

// Main handler with authentication
const getUserArtHandler = async (event) => {
  try {
    const { userID } = event.queryStringParameters || {};
    
    // If no userID provided, use authenticated user's ID
    const targetUserID = userID || event.user.userId;

    await createConnection();
    const art = await Art.find({ userID: targetUserID });

    return createSecureResponse(200, art);
  } catch (error) {
    console.error('Get user art error:', error);
    return createSecureResponse(500, {
      message: "Internal server error"
    });
  }
};

// Export with authentication middleware
exports.handler = async (event, context) => {
  return AuthMiddleware.requireAuth(event, getUserArtHandler);
};