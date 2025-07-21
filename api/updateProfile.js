const { createConnection } = require("./helpers/connection");
const Profile = require("./models/profile.model");
const { createSecureResponse } = require("./helpers/security");
const AuthMiddleware = require("./helpers/authMiddleware");
const InputSanitizer = require("./helpers/sanitizer");
const { rateLimitMiddleware } = require("./helpers/rateLimiter");
const DatabaseSecurity = require("./helpers/dbSecurity");

// Validation schema
const UPDATE_PROFILE_SCHEMA = {
  userID: {
    type: 'objectId',
    required: true
  },
  bio: {
    type: 'string',
    required: false,
    options: {
      allowHTML: false,
      maxLength: 500
    }
  },
  avatarID: {
    type: 'string',
    required: false,
    options: {
      allowHTML: false,
      maxLength: 100
    }
  },
  petID: {
    type: 'string',
    required: false,
    options: {
      allowHTML: false,
      maxLength: 100
    }
  }
};

const updateProfileHandler = async (event) => {
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
      sanitizedData = InputSanitizer.sanitizeObject(requestBody, UPDATE_PROFILE_SCHEMA);
    } catch (error) {
      return createSecureResponse(400, { 
        message: `Input validation failed: ${error.message}` 
      });
    }

    // Verify user identity
    if (sanitizedData.userID !== event.user.userId) {
      return createSecureResponse(403, { 
        message: "Access denied: You can only update your own profile" 
      });
    }

    if (sanitizedData.bio) {
      const badWords = ['spam', 'scam']; 
      const hasBadWords = badWords.some(word => 
        sanitizedData.bio.toLowerCase().includes(word.toLowerCase())
      );
      if (hasBadWords) {
        return createSecureResponse(400, { 
          message: "Bio contains inappropriate content" 
        });
      }
    }

    await createConnection();

    const result = await DatabaseSecurity.executeSafeQuery(
      () => Profile.findOneAndUpdate(
        {
          userID: sanitizedData.userID,
        },
        sanitizedData,
        {
          upsert: true,
          setDefaultsOnInsert: true,
          omitUndefined: true,
          new: true,
        }
      ),
      'update_profile',
      { userID: sanitizedData.userID }
    );

    if (!result) {
      return createSecureResponse(500, { 
        message: "Failed to update profile" 
      });
    }

    return createSecureResponse(200, {
      message: "Profile updated successfully",
      profile: {
        bio: result.bio,
        avatarID: result.avatarID,
        petID: result.petID
      }
    });

  } catch (error) {
    console.error('Update profile error:', DatabaseSecurity.sanitizeDBError(error));
    return createSecureResponse(500, { 
      message: "Internal server error" 
    });
  }
};

exports.handler = rateLimitMiddleware('general')(
  (event, context) => AuthMiddleware.requireAuth(event, updateProfileHandler)
);