const { createConnection } = require("./helpers/connection");
const Art = require("./models/art.model");
const FavoriteArts = require("./models/favoriteArts.model");
const { createSecureResponse } = require("./helpers/security");
const AuthMiddleware = require("./helpers/authMiddleware");
const InputSanitizer = require("./helpers/sanitizer");
const { rateLimitMiddleware } = require("./helpers/rateLimiter");
const DatabaseSecurity = require("./helpers/dbSecurity");

// Validation schema
const FAVORITE_ART_SCHEMA = {
  userID: {
    type: 'objectId',
    required: true
  },
  artID: {
    type: 'objectId',
    required: true
  },
  addFavorite: {
    type: 'boolean',
    required: true
  }
};

const favoriteArtHandler = async (event) => {
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
      sanitizedData = InputSanitizer.sanitizeObject(requestBody, FAVORITE_ART_SCHEMA);
    } catch (error) {
      return createSecureResponse(400, { 
        message: `Input validation failed: ${error.message}` 
      });
    }

    // Verify user identity
    if (sanitizedData.userID !== event.user.userId) {
      return createSecureResponse(403, { 
        message: "Access denied: You can only modify your own favorites" 
      });
    }

    await createConnection();

    // Update the art's favorite count with secure query
    const originalArtResult = await DatabaseSecurity.executeSafeQuery(
      () => Art.findByIdAndUpdate(
        sanitizedData.artID,
        {
          $inc: { favorites: sanitizedData.addFavorite ? 1 : -1 },
        },
        {
          new: true,
        }
      ),
      'update_art_favorites',
      { artID: sanitizedData.artID, addFavorite: sanitizedData.addFavorite }
    );

    if (!originalArtResult) {
      return createSecureResponse(404, { 
        message: "Artwork not found" 
      });
    }

    const favoriteResult = await DatabaseSecurity.executeSafeQuery(
      () => FavoriteArts.findOneAndUpdate(
        {
          userID: sanitizedData.userID,
        },
        sanitizedData.addFavorite
          ? { $push: { favorites: sanitizedData.artID } }
          : { $pull: { favorites: sanitizedData.artID } },
        {
          upsert: true,
          omitUndefined: true,
          new: true,
        }
      ),
      'update_user_favorites',
      { userID: sanitizedData.userID, artID: sanitizedData.artID }
    );

    if (!favoriteResult) {
      return createSecureResponse(500, { 
        message: "Failed to update favorites" 
      });
    }

    return createSecureResponse(200, {
      message: sanitizedData.addFavorite ? "Added to favorites" : "Removed from favorites",
      favorites: favoriteResult.favorites,
      artFavoriteCount: originalArtResult.favorites
    });

  } catch (error) {
    console.error('Favorite art error:', DatabaseSecurity.sanitizeDBError(error));
    return createSecureResponse(500, { 
      message: "Internal server error" 
    });
  }
};

exports.handler = rateLimitMiddleware('general')(
  (event, context) => AuthMiddleware.requireAuth(event, favoriteArtHandler)
);