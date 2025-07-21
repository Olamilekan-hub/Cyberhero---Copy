const { createConnection } = require("./helpers/connection");
const Art = require("./models/art.model");
const User = require("./models/user.model");
const { createSecureResponse } = require("./helpers/security");
const InputSanitizer = require("./helpers/sanitizer");
const { ART_CREATION_SCHEMA } = require("./helpers/schemas");

exports.handler = async (event) => {
  try {
    // Handle CORS preflight
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
      sanitizedData = InputSanitizer.sanitizeObject(requestBody, ART_CREATION_SCHEMA);
    } catch (error) {
      return createSecureResponse(400, { 
        message: `Input validation failed: ${error.message}` 
      });
    }

    await createConnection();

    const user = await User.findById(sanitizedData.userID);
    if (!user) {
      return createSecureResponse(404, { 
        message: "User not found" 
      });
    }

    // Store art
    const art = await Art.create({
      userID: sanitizedData.userID,
      username: user.username,
      content: sanitizedData.content,
      public: !!sanitizedData.public,
    });

    return createSecureResponse(200, { 
      message: "Success",
      artId: art._id 
    });
  } catch (error) {
    console.error('Art creation error:', error);
    return createSecureResponse(500, { 
      message: "Internal server error" 
    });
  }
};