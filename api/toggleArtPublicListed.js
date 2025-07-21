const { createConnection } = require("./helpers/connection");
const Art = require("./models/art.model");
const { createSecureResponse } = require("./helpers/security");
const AuthMiddleware = require("./helpers/authMiddleware");
const InputSanitizer = require("./helpers/sanitizer");
const { rateLimitMiddleware } = require("./helpers/rateLimiter");
const DatabaseSecurity = require("./helpers/dbSecurity");

// Validation schema
const TOGGLE_ART_SCHEMA = {
  _id: {
    type: 'objectId',
    required: true
  },
  isPublic: {
    type: 'boolean',
    required: true
  }
};

const toggleArtHandler = async (event) => {
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
      sanitizedData = InputSanitizer.sanitizeObject(requestBody, TOGGLE_ART_SCHEMA);
    } catch (error) {
      return createSecureResponse(400, { 
        message: `Input validation failed: ${error.message}` 
      });
    }

    await createConnection();

    // First, verify the art belongs to the authenticated user
    const artExists = await DatabaseSecurity.executeSafeQuery(
      () => Art.findOne({
        _id: sanitizedData._id,
        userID: event.user.userId
      }),
      'verify_art_ownership',
      { artId: sanitizedData._id, userID: event.user.userId }
    );

    if (!artExists) {
      return createSecureResponse(404, { 
        message: "Artwork not found or access denied" 
      });
    }

    // Update the art's public status with secure query
    const result = await DatabaseSecurity.executeSafeQuery(
      () => Art.findOneAndUpdate(
        {
          _id: sanitizedData._id,
          userID: event.user.userId // Double-check ownership
        },
        {
          public: sanitizedData.isPublic,
        },
        {
          new: true,
        }
      ),
      'toggle_art_public',
      { artId: sanitizedData._id, isPublic: sanitizedData.isPublic }
    );

    if (!result) {
      return createSecureResponse(500, { 
        message: "Failed to update artwork visibility" 
      });
    }

    return createSecureResponse(200, {
      message: `Artwork ${sanitizedData.isPublic ? 'made public' : 'made private'} successfully`,
      artwork: {
        id: result._id,
        public: result.public,
        favorites: result.favorites
      }
    });

  } catch (error) {
    console.error('Toggle art public error:', DatabaseSecurity.sanitizeDBError(error));
    return createSecureResponse(500, { 
      message: "Internal server error" 
    });
  }
};

exports.handler = rateLimitMiddleware('general')(
  (event, context) => AuthMiddleware.requireAuth(event, toggleArtHandler)
);