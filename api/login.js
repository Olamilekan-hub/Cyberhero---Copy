const { createConnection } = require("./helpers/connection");
const User = require("./models/user.model");
const bcrypt = require("bcrypt");
const { JWTManager } = require("./helpers/auth");
const { createSecureResponse } = require("./helpers/security");
const InputSanitizer = require("./helpers/sanitizer");
const { USER_LOGIN_SCHEMA } = require("./helpers/schemas");
const { rateLimitMiddleware } = require("./helpers/rateLimiter");
const DatabaseSecurity = require("./helpers/dbSecurity");

const loginHandler = async (event, context) => {
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
      sanitizedData = InputSanitizer.sanitizeObject(requestBody, USER_LOGIN_SCHEMA);
    } catch (error) {
      return createSecureResponse(400, { 
        message: `Input validation failed: ${error.message}` 
      });
    }

    await createConnection();

    // Use secure user lookup with password field
    const user = await DatabaseSecurity.executeSafeQuery(
      () => User.findByCredentials(sanitizedData.username, true),
      'user_login_lookup',
      { username: sanitizedData.username }
    );
    
    if (!user) {
      // Consistent timing to prevent user enumeration
      await bcrypt.compare('dummy_password', '$2b$10$dummy.hash.to.prevent.timing.attacks');
      return createSecureResponse(401, { 
        message: "Invalid credentials" 
      });
    }

    // Check passwords match
    const match = await bcrypt.compare(sanitizedData.password, user.password);
    if (!match) {
      return createSecureResponse(401, { 
        message: "Invalid credentials"
      });
    }

    // Check email is verified
    if (!user.verified) {
      return createSecureResponse(403, {
        message: "Account not verified",
        email: user.email,
        requiresVerification: true
      });
    }

    // Generate JWT token pair
    const tokenPayload = {
      userId: user._id,
      username: user.username,
      email: user.email,
      verified: user.verified
    };

    const tokens = JWTManager.createTokenPair(tokenPayload);
    
    // Store refresh token hash and update login time securely
    await DatabaseSecurity.executeSafeQuery(
      () => User.findOneAndUpdate(
        { _id: user._id },
        { 
          $set: { 
            lastLoginAt: new Date(),
            refreshTokenHash: require('crypto')
              .createHash('sha256')
              .update(tokens.refreshToken)
              .digest('hex')
          }
        },
        { new: true }
      ),
      'user_login_update',
      { userId: user._id }
    );
    
    return createSecureResponse(200, {
      message: "Login successful",
      user: user.toSafeObject(),
      tokens: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: tokens.expiresIn,
        tokenType: tokens.tokenType
      }
    });
  } catch (error) {
    console.error('Login error:', DatabaseSecurity.sanitizeDBError(error));
    return createSecureResponse(500, { 
      message: "Internal server error" 
    });
  }
};

exports.handler = rateLimitMiddleware('auth')(loginHandler);