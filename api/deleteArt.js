const { createConnection } = require("./helpers/connection");
const Art = require("./models/art.model");
const { createSecureResponse } = require("./helpers/security");
const AuthMiddleware = require("./helpers/authMiddleware");
const InputSanitizer = require("./helpers/sanitizer");
const { rateLimitMiddleware } = require("./helpers/rateLimiter");
const DatabaseSecurity = require("./helpers/dbSecurity");

// Validation schema
const DELETE_ART_SCHEMA = {
  userID: {
    type: 'objectId',
    required: true
  },
  artID: {
    type: 'objectId', 
    required: true
  }
};

const deleteArtHandler = async (event) => {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return createSecureResponse(200, '');
    }

    // Parse and sanitize input
    let requestBody;
    try {
      requestBody = JSON.parse(event.body);
    } catch (error) {
      return createSecureResponse(400, { 
        message: "Invalid JSON format" 
      });
    }

    // Sanitize and validate input
    let sanitizedData;
    try {
      sanitizedData = InputSanitizer.sanitizeObject(requestBody, DELETE_ART_SCHEMA);
    } catch (error) {
      return createSecureResponse(400, { 
        message: `Input validation failed: ${error.message}` 
      });
    }

    // Verify user owns the resource
    if (sanitizedData.userID !== event.user.userId) {
      return createSecureResponse(403, { 
        message: "Access denied: You can only delete your own artwork" 
      });
    }

    await createConnection();

    // Use secure database query
    const result = await DatabaseSecurity.executeSafeQuery(
      () => Art.findOneAndDelete({
        _id: sanitizedData.artID,
        userID: sanitizedData.userID,
      }),
      'delete_art',
      { artID: sanitizedData.artID, userID: sanitizedData.userID }
    );

    if (!result) {
      return createSecureResponse(404, { 
        message: "Artwork not found or access denied" 
      });
    }

    return createSecureResponse(200, {
      message: "Artwork deleted successfully",
      artId: result._id
    });

  } catch (error) {
    console.error('Delete art error:', DatabaseSecurity.sanitizeDBError(error));
    return createSecureResponse(500, { 
      message: "Internal server error" 
    });
  }
};

exports.handler = rateLimitMiddleware('general')(
  (event, context) => AuthMiddleware.requireAuth(event, deleteArtHandler)
);